import bcrypt from 'bcryptjs';

// In-Memory Database Store with initial seed data
class DatabaseStore {
  constructor() {
    this.users = [
      {
        id: 'usr_admin_001',
        name: 'Arena Administrator',
        email: 'admin@primeturfarena.com',
        phone: '+91 98765 43210',
        avatarUrl: '',
        provider: 'email',
        providerAccountId: 'admin@primeturfarena.com',
        role: 'ADMIN',
        passwordHash: bcrypt.hashSync('admin123', 10),
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
        lastLoginAt: '2026-10-03T12:00:00.000Z'
      },
      {
        id: 'usr_player_001',
        name: 'Muthuvel V',
        email: 'muthuvel@example.com',
        phone: '+91 98765 00001',
        avatarUrl: 'https://lh3.googleusercontent.com/a/default-user',
        provider: 'google',
        providerAccountId: 'google_109283749281',
        role: 'USER',
        passwordHash: bcrypt.hashSync('user123', 10),
        createdAt: '2026-02-15T10:30:00.000Z',
        updatedAt: '2026-02-15T10:30:00.000Z',
        lastLoginAt: '2026-10-02T18:00:00.000Z'
      }
    ];

    this.bookings = [
      {
        id: 'PT-20261004-912',
        userId: 'usr_player_001',
        sportId: 'football',
        sportName: 'Football',
        durationMins: 60,
        dateStr: '2026-10-04',
        startTime: '05:00 PM – 06:00 PM',
        amount: 1200,
        customerName: 'Muthuvel V',
        phone: '+91 98765 00001',
        status: 'UPCOMING',
        createdAt: '2026-09-28T14:20:00.000Z'
      },
      {
        id: 'PT-20260925-104',
        userId: 'usr_player_001',
        sportId: 'cricket',
        sportName: 'Box Cricket',
        durationMins: 90,
        dateStr: '2026-09-25',
        startTime: '07:00 PM – 08:30 PM',
        amount: 1800,
        customerName: 'Muthuvel V',
        phone: '+91 98765 00001',
        status: 'COMPLETED',
        createdAt: '2026-09-20T11:00:00.000Z'
      }
    ];

    this.blockedSlots = [];
  }

  // User Operations
  getUserById(id) {
    const user = this.users.find(u => u.id === id);
    if (!user) return null;
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  getUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser({ name, email, phone, avatarUrl = '', provider = 'email', providerAccountId = '', role = 'USER', password = '' }) {
    const passwordHash = password ? bcrypt.hashSync(password, 10) : '';
    const newUser = {
      id: `usr_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name,
      email,
      phone: phone || '+91 98765 43210',
      avatarUrl,
      provider,
      providerAccountId: providerAccountId || email,
      role: 'USER', // Always enforce USER role for public registration
      passwordHash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    this.users.push(newUser);
    const { passwordHash: _, ...safeUser } = newUser;
    return safeUser;
  }

  updateUser(id, updates) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return null;

    // Prevent changing role or id via user profile update
    const { role, id: _id, passwordHash, ...allowedUpdates } = updates;

    this.users[idx] = {
      ...this.users[idx],
      ...allowedUpdates,
      updatedAt: new Date().toISOString()
    };

    const { passwordHash: _, ...safeUser } = this.users[idx];
    return safeUser;
  }

  // Booking Operations
  getUserBookings(userId) {
    return this.bookings.filter(b => b.userId === userId);
  }

  getBookingById(id) {
    return this.bookings.find(b => b.id === id);
  }

  getAllBookings() {
    return this.bookings;
  }

  createBooking({ userId, sportId, sportName, durationMins, dateStr, startTime, amount, customerName, phone }) {
    const newBooking = {
      id: `PT-${dateStr.replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      userId,
      sportId,
      sportName,
      durationMins,
      dateStr,
      startTime,
      amount,
      customerName,
      phone,
      status: 'UPCOMING',
      createdAt: new Date().toISOString()
    };

    this.bookings.unshift(newBooking);
    return newBooking;
  }

  updateBookingStatus(id, newStatus) {
    const booking = this.bookings.find(b => b.id === id);
    if (booking) {
      booking.status = newStatus;
    }
    return booking;
  }

  rescheduleBooking(id, newDateStr, newStartTime) {
    const booking = this.bookings.find(b => b.id === id);
    if (booking) {
      booking.dateStr = newDateStr;
      booking.startTime = newStartTime;
    }
    return booking;
  }

  // Blocked Slots
  getBlockedSlots() {
    return this.blockedSlots;
  }

  blockSlot({ dateStr, startTime, endTime, reason }) {
    const block = {
      id: `blk_${Date.now()}`,
      dateStr,
      startTime,
      endTime,
      reason,
      createdAt: new Date().toISOString()
    };
    this.blockedSlots.push(block);
    return block;
  }

  unblockSlot(id) {
    this.blockedSlots = this.blockedSlots.filter(b => b.id !== id);
    return true;
  }
}

export const db = new DatabaseStore();
