import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MobileMenu from './MobileMenu';
import AuthModal from './auth/AuthModal';

export default function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Turf', to: '/turf' },
    { label: 'About', to: '/about' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'P';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await logout();
    navigate('/');
  };

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

        {/* CENTER: Desktop Navigation Links */}
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
          {isAuthenticated && (
            <NavLink 
              to="/my-bookings" 
              className={({ isActive }) => 
                `desktop-nav-link ${isActive ? 'active-link' : ''}`
              }
            >
              My Bookings
            </NavLink>
          )}
        </nav>

        {/* RIGHT: Actions */}
        <div className="header-actions">
          {!isAuthenticated ? (
            <button 
              className="nav-link-btn"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
              onClick={() => setIsAuthModalOpen(true)}
            >
              Login
            </button>
          ) : (
            /* Compact Profile Dropdown */
            <div ref={dropdownRef} style={{ relative: 'position', position: 'relative' }}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                aria-label="User profile menu"
              >
                {user.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name} 
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--brand-green)' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-soft)',
                      border: '2px solid var(--brand-green)',
                      color: 'var(--dark-green)',
                      fontWeight: '800',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getInitials(user.name)}
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '240px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-md)',
                    zIndex: 1000,
                    padding: '8px 0',
                    animation: 'fadeIn 0.15s ease'
                  }}
                >
                  <div style={{ padding: '8px 16px 12px 16px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    style={{ display: 'block', padding: '10px 16px', fontSize: '14px', color: 'var(--text-primary)', textDecoration: 'none' }}
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/my-bookings"
                    onClick={() => setIsDropdownOpen(false)}
                    style={{ display: 'block', padding: '10px 16px', fontSize: '14px', color: 'var(--text-primary)', textDecoration: 'none' }}
                  >
                    My Bookings
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/owner"
                      onClick={() => setIsDropdownOpen(false)}
                      style={{ display: 'block', padding: '10px 16px', fontSize: '14px', color: 'var(--dark-green)', fontWeight: '700', textDecoration: 'none' }}
                    >
                      Owner Console
                    </Link>
                  )}

                  <div style={{ borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />

                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      fontSize: '14px',
                      color: '#DC2626',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

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
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
}
