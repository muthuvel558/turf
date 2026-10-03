import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MobileMenu({ onClose, onOpenAuth }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

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
  ];

  const handleLogout = async () => {
    onClose();
    await logout();
    navigate('/');
  };

  return (
    <div className="menu-drawer-backdrop" onClick={onClose}>
      <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="menu-drawer-header">
          <span className="header-logo-text">
            PrimeTurf <span>Arena</span>
          </span>
          <button className="menu-close-btn" onClick={onClose} aria-label="Close menu">&times;</button>
        </div>

        {isAuthenticated && user && (
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-soft)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--dark-green)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px' }}>
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '14px' }}>{user.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{user.email}</div>
            </div>
          </div>
        )}

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

          {isAuthenticated ? (
            <>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => 
                  `menu-drawer-item ${isActive ? 'active-drawer-item' : ''}`
                }
                onClick={onClose}
              >
                My Profile
              </NavLink>

              <NavLink 
                to="/my-bookings" 
                className={({ isActive }) => 
                  `menu-drawer-item ${isActive ? 'active-drawer-item' : ''}`
                }
                onClick={onClose}
              >
                My Bookings
              </NavLink>
            </>
          ) : (
            <button
              type="button"
              className="menu-drawer-item"
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand-green)', fontWeight: '700' }}
              onClick={() => {
                onClose();
                if (onOpenAuth) onOpenAuth();
              }}
            >
              Login / Sign Up
            </button>
          )}
        </nav>

        <div className="menu-drawer-footer" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            className="btn btn-primary btn-full-width"
            onClick={() => {
              onClose();
              navigate('/book');
            }}
          >
            BOOK NOW &rarr;
          </button>

          {isAuthenticated && (
            <button
              type="button"
              className="btn btn-secondary btn-full-width"
              style={{ color: '#DC2626' }}
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
