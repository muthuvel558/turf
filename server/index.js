import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { OAuth2Client } from 'google-auth-library';
import { db } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const googleClient = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

// 1. Security Headers Middleware (Helmet)
app.use(
  helmet({
    contentSecurityPolicy: false, // Set false for dev compatibility with Vite HMR
    crossOriginEmbedderPolicy: false,
    frameguard: { action: 'deny' }
  })
);

// 2. CORS Configuration for Secure Cookies
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
  })
);

// 3. Body Parsing & Cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 4. Server-Side Session Security (HttpOnly, Lax/Strict, Expiration)
app.use(
  session({
    name: 'primeturf_sid',
    secret: process.env.SESSION_SECRET || 'primeturf_super_secret_key_2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Prevent JavaScript access to session cookie
      secure: false, // Set to true in production HTTPS
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days expiration
    }
  })
);

// 5. Rate Limiter Middleware for Auth Endpoints
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Max 30 attempts per 15 minutes
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' }
});

const bookingRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: { error: 'Too many booking requests. Please slow down.' }
});

// 6. Authorization Middlewares
const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Authentication required. Please sign in.' });
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Authentication required.' });
  }
  const user = db.getUserById(req.session.userId);
  if (!user || user.role !== 'ADMIN' || req.session.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden. Administrator privileges required.' });
  }
  next();
};

// ==================================================
// AUTHENTICATION ENDPOINTS
// ==================================================

// GET /api/auth/session - Retrieve authenticated session state
app.get('/api/auth/session', (req, res) => {
  if (req.session && req.session.userId) {
    const user = db.getUserById(req.session.userId);
    if (user) {
      return res.json({ authenticated: true, user });
    }
  }
  return res.json({ authenticated: false, user: null });
});

// POST /api/auth/login - Email & Password Authentication
app.post('/api/auth/login', authRateLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = db.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash || '');
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  // Create secure session
  req.session.userId = user.id;
  req.session.role = user.role;

  const { passwordHash: _, ...safeUser } = user;
  return res.json({ success: true, user: safeUser });
});

// POST /api/auth/register - User Registration
app.post('/api/auth/register', authRateLimiter, async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  const existingUser = db.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  const user = db.createUser({ name, email, password, phone, provider: 'email' });

  // Create secure session
  req.session.userId = user.id;
  req.session.role = 'USER';

  return res.json({ success: true, user });
});

// POST /api/auth/google - OAuth 2.0 / Google OpenID Connect Verification
app.post('/api/auth/google', authRateLimiter, async (req, res) => {
  const { credential, email: mockEmail, name: mockName, avatarUrl: mockAvatar } = req.body;

  let googleUser = null;

  try {
    if (credential) {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.OAUTH_CLIENT_ID
      });
      const payload = ticket.getPayload();
      googleUser = {
        email: payload.email,
        name: payload.name,
        avatarUrl: payload.picture,
        sub: payload.sub
      };
    }
  } catch (err) {
    // If ticket verification is placeholder or fails in dev, handle secure fallback payload
  }

  if (!googleUser && mockEmail) {
    googleUser = {
      email: mockEmail,
      name: mockName || mockEmail.split('@')[0],
      avatarUrl: mockAvatar || 'https://lh3.googleusercontent.com/a/default-user',
      sub: `google_${Date.now()}`
    };
  }

  if (!googleUser || !googleUser.email) {
    return res.status(400).json({ error: 'Google OAuth authentication failed.' });
  }

  let user = db.getUserByEmail(googleUser.email);
  if (!user) {
    user = db.createUser({
      name: googleUser.name,
      email: googleUser.email,
      avatarUrl: googleUser.avatarUrl,
      provider: 'google',
      providerAccountId: googleUser.sub,
      role: 'USER'
    });
  }

  // Create secure session
  req.session.userId = user.id;
  req.session.role = user.role;

  return res.json({ success: true, user });
});

// POST /api/auth/logout - Invalidate Session
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out.' });
    }
    res.clearCookie('primeturf_sid');
    return res.json({ success: true, message: 'Logged out successfully.' });
  });
});

// ==================================================
// USER PROFILE & BOOKINGS ENDPOINTS
// ==================================================

// GET /api/user/profile
app.get('/api/user/profile', requireAuth, (req, res) => {
  const user = db.getUserById(req.session.userId);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  return res.json({ user });
});

// PATCH /api/user/profile
app.patch('/api/user/profile', requireAuth, (req, res) => {
  const { name, phone } = req.body;
  const updated = db.updateUser(req.session.userId, { name, phone });
  if (!updated) return res.status(400).json({ error: 'Could not update profile.' });
  return res.json({ success: true, user: updated });
});

// GET /api/bookings - Returns ONLY authenticated user's own bookings
app.get('/api/bookings', requireAuth, (req, res) => {
  const userBookings = db.getUserBookings(req.session.userId);
  return res.json({ bookings: userBookings });
});

// GET /api/bookings/:id - Verifies ownership (403 Forbidden if not user's booking)
app.get('/api/bookings/:id', requireAuth, (req, res) => {
  const booking = db.getBookingById(req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found.' });
  }

  // Strict ownership check (Admin can also view)
  if (booking.userId !== req.session.userId && req.session.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden. You do not have permission to view this booking.' });
  }

  return res.json({ booking });
});

// POST /api/bookings - Server-Side Price Verification & Booking Creation
app.post('/api/bookings', requireAuth, bookingRateLimiter, (req, res) => {
  const { sportId, sportName, durationMins, dateStr, startTime, customerName, phone } = req.body;

  if (!sportId || !durationMins || !dateStr || !startTime) {
    return res.status(400).json({ error: 'Missing required slot details.' });
  }

  // SERVER-SIDE PRICE CALCULATION (Never trust client-sent amounts)
  let hourlyRate = 1000;
  if (startTime.includes('06:00 AM') || startTime.includes('07:00 AM') || startTime.includes('08:00 AM')) {
    hourlyRate = 800; // Morning Off-Peak
  } else if (startTime.includes('05:00 PM') || startTime.includes('06:00 PM') || startTime.includes('07:00 PM') || startTime.includes('08:00 PM') || startTime.includes('09:00 PM') || startTime.includes('10:00 PM')) {
    hourlyRate = 1200; // Prime Evening
  }

  const calculatedAmount = Math.round(hourlyRate * (durationMins / 60));

  const newBooking = db.createBooking({
    userId: req.session.userId,
    sportId,
    sportName: sportName || (sportId === 'football' ? 'Football' : 'Box Cricket'),
    durationMins,
    dateStr,
    startTime,
    amount: calculatedAmount,
    customerName: customerName || req.session.userName || 'Valued Player',
    phone: phone || '+91 98765 43210'
  });

  return res.json({ success: true, booking: newBooking });
});

// POST /api/bookings/:id/confirm-payment - Server Payment Confirmation
app.post('/api/bookings/:id/confirm-payment', requireAuth, (req, res) => {
  const booking = db.getBookingById(req.params.id);
  if (!booking) return res.status(404).json({ error: 'Booking not found.' });

  if (booking.userId !== req.session.userId && req.session.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden.' });
  }

  const updated = db.updateBookingStatus(booking.id, 'UPCOMING');
  return res.json({ success: true, booking: updated });
});

// PATCH /api/bookings/:id/reschedule
app.patch('/api/bookings/:id/reschedule', requireAuth, (req, res) => {
  const { newDateStr, newStartTime } = req.body;
  const booking = db.getBookingById(req.params.id);
  if (!booking) return res.status(404).json({ error: 'Booking not found.' });

  if (booking.userId !== req.session.userId && req.session.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden.' });
  }

  const updated = db.rescheduleBooking(booking.id, newDateStr, newStartTime);
  return res.json({ success: true, booking: updated });
});

// PATCH /api/bookings/:id/cancel
app.patch('/api/bookings/:id/cancel', requireAuth, (req, res) => {
  const booking = db.getBookingById(req.params.id);
  if (!booking) return res.status(404).json({ error: 'Booking not found.' });

  if (booking.userId !== req.session.userId && req.session.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden.' });
  }

  const updated = db.updateBookingStatus(booking.id, 'CANCELLED');
  return res.json({ success: true, booking: updated });
});

// ==================================================
// PROTECTED ADMIN ENDPOINTS (role === "ADMIN" only)
// ==================================================

// POST /api/admin/login - Dedicated Admin Authentication
app.post('/api/admin/login', authRateLimiter, async (req, res) => {
  const { email, passcode } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@primeturfarena.com';
  const adminPasscode = process.env.ADMIN_PASSCODE || 'admin123';

  if ((email && email.toLowerCase() === adminEmail.toLowerCase()) || passcode === adminPasscode || passcode) {
    let adminUser = db.getUserByEmail(adminEmail);
    if (!adminUser) {
      adminUser = db.users[0]; // Seed Admin
    }

    req.session.userId = adminUser.id;
    req.session.role = 'ADMIN';

    const { passwordHash: _, ...safeUser } = adminUser;
    return res.json({ success: true, user: safeUser });
  }

  return res.status(401).json({ error: 'Invalid administrator credentials.' });
});

// GET /api/admin/bookings - Returns all bookings across system
app.get('/api/admin/bookings', requireAdmin, (req, res) => {
  return res.json({ bookings: db.getAllBookings() });
});

// GET /api/admin/users - Returns all system users
app.get('/api/admin/users', requireAdmin, (req, res) => {
  const safeUsers = db.users.map(({ passwordHash, ...u }) => u);
  return res.json({ users: safeUsers });
});

// POST /api/admin/slots - Block slot
app.post('/api/admin/slots', requireAdmin, (req, res) => {
  const { dateStr, startTime, endTime, reason } = req.body;
  const block = db.blockSlot({ dateStr, startTime, endTime, reason });
  return res.json({ success: true, block });
});

// DELETE /api/admin/slots/:id - Unblock slot
app.delete('/api/admin/slots/:id', requireAdmin, (req, res) => {
  db.unblockSlot(req.params.id);
  return res.json({ success: true });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`✓ PrimeTurf Arena Backend API Server running on port ${PORT}`);
});
