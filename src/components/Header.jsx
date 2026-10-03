import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Turf", to: "/turf" },
    { label: "Pricing", to: "/pricing" },
    { label: "Gallery", to: "/gallery" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* LEFT: Logo */}
        <Link to="/" className="header-logo">
          <div className="header-logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span className="header-logo-text">
            PrimeTurf <span>Arena</span>
          </span>
        </Link>

        {/* CENTER: Desktop Navigation Links with Active Styling */}
        <nav className="desktop-nav">
          {navLinks.map((link, idx) => (
            <NavLink 
              key={idx} 
              to={link.to} 
              end={link.to === '/'}
              className={({ isActive }) => 
                `desktop-nav-link ${isActive ? 'active-link' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT: Actions */}
        <div className="header-actions">
          <NavLink 
            to="/my-bookings" 
            className={({ isActive }) => 
              `nav-link-btn ${isActive ? 'active-link' : ''}`
            }
          >
            My Bookings
          </NavLink>

          <button 
            className="btn btn-primary btn-book-nav"
            onClick={() => navigate('/book')}
          >
            Book Now
          </button>

          {/* Mobile Menu Trigger */}
          <button 
            className="menu-toggle-btn mobile-only" 
            onClick={() => setIsMenuOpen(true)}
            aria-label="Toggle Navigation Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <MobileMenu 
          onClose={() => setIsMenuOpen(false)} 
        />
      )}
    </header>
  );
}
