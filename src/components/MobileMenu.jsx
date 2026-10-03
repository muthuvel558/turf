import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function MobileMenu({ onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Lock body scrolling when drawer is open
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    // Handle Escape key to close
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const links = [
    { label: "Home", to: "/" },
    { label: "Turf", to: "/turf" },
    { label: "Pricing", to: "/pricing" },
    { label: "Gallery", to: "/gallery" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "My Bookings", to: "/my-bookings" },
  ];

  return (
    <div className="menu-drawer-backdrop" onClick={onClose}>
      <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="menu-drawer-header">
          <span className="header-logo-text">
            PrimeTurf <span>Arena</span>
          </span>
          <button className="menu-close-btn" onClick={onClose} aria-label="Close menu">&times;</button>
        </div>

        <nav className="menu-drawer-links">
          {links.map((link, idx) => (
            <NavLink 
              key={idx} 
              to={link.to} 
              end={link.to === '/'}
              className={({ isActive }) => 
                `menu-drawer-item ${isActive ? 'active-drawer-item' : ''}`
              }
              onClick={onClose}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="menu-drawer-footer">
          <button 
            className="btn btn-primary btn-full-width"
            onClick={() => {
              onClose();
              navigate('/book');
            }}
          >
            BOOK NOW &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
