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

          {/* Column 2: Contact & Venue */}
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
            <span>·</span>
            <Link to="/owner" className="legal-link" style={{ color: 'var(--brand-green)', fontWeight: '700' }}>Owner Console</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
