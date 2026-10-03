import React from 'react';
import { Link } from 'react-router-dom';
import { StoreManager } from '../data/store';

export default function Footer() {
  const facility = StoreManager.getFacility();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Column 1: Brand & Description */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              PrimeTurf <span>Arena</span>
            </Link>
            <p className="footer-desc">
              {facility.description}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <div className="footer-title">Quick Links</div>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/turf" className="footer-link">Turf</Link>
              <Link to="/pricing" className="footer-link">Pricing</Link>
              <Link to="/gallery" className="footer-link">Gallery</Link>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </div>

          {/* Column 3: Booking & Policies */}
          <div className="footer-col">
            <div className="footer-title">Booking</div>
            <div className="footer-links">
              <Link to="/book" className="footer-link">Find a Slot</Link>
              <Link to="/my-bookings" className="footer-link">My Bookings</Link>
              <Link to="/turf" className="footer-link">Booking Policy</Link>
              <Link to="/pricing" className="footer-link">Cancellation Policy</Link>
              <Link to="/turf" className="footer-link">FAQ</Link>
              <Link to="/owner" className="footer-link owner-link">Owner Login</Link>
            </div>
          </div>

          {/* Column 4: Contact & Venue */}
          <div className="footer-col">
            <div className="footer-title">Contact</div>
            <div className="footer-contact-list">
              <div>{facility.address}, {facility.city}</div>
              <div>{facility.phone}</div>
              <div>WhatsApp: {facility.whatsapp}</div>
              <div>{facility.email}</div>
              <div>{facility.operatingHours}</div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="copyright">© 2026 PrimeTurf Arena. All rights reserved.</div>
          <div className="legal-links">
            <Link to="/pricing" className="legal-link">Privacy</Link>
            <span>·</span>
            <Link to="/pricing" className="legal-link">Terms</Link>
            <span>·</span>
            <Link to="/pricing" className="legal-link">Cancellation Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
