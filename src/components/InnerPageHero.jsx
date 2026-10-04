import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../data/images';

export default function InnerPageHero({
  breadcrumb,
  eyebrow,
  title,
  description,
  backgroundImage,
  stats = [],
  action,
  children
}) {
  const bg = backgroundImage || IMAGES.evening;

  // Format breadcrumb items if string (e.g., "Home / Pricing") or array
  let breadcrumbItems = [];
  if (typeof breadcrumb === 'string') {
    const parts = breadcrumb.split('/');
    if (parts.length === 2) {
      breadcrumbItems = [
        { label: parts[0].trim(), to: '/' },
        { label: parts[1].trim(), to: null }
      ];
    } else if (parts.length === 3) {
      breadcrumbItems = [
        { label: parts[0].trim(), to: '/' },
        { label: parts[1].trim(), to: parts[1].trim() === 'My Bookings' ? '/my-bookings' : null },
        { label: parts[2].trim(), to: null }
      ];
    } else {
      breadcrumbItems = [{ label: breadcrumb, to: null }];
    }
  } else if (Array.isArray(breadcrumb)) {
    breadcrumbItems = breadcrumb;
  }

  return (
    <div 
      className="inner-page-hero-root"
      style={{ 
        position: 'relative',
        backgroundImage: `linear-gradient(180deg, rgba(11, 13, 12, 0.78) 0%, rgba(11, 13, 12, 0.92) 100%), url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderBottom: '1px solid var(--border-color)', 
        color: '#FFFFFF'
      }}
    >
      <div className="container relative-z inner-hero-container">
        {/* Breadcrumb */}
        {breadcrumbItems.length > 0 && (
          <nav className="inner-hero-breadcrumb" aria-label="Breadcrumb">
            {breadcrumbItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="breadcrumb-separator"> / </span>}
                {item.to ? (
                  <Link to={item.to} className="breadcrumb-link">
                    {item.label}
                  </Link>
                ) : (
                  <span className="breadcrumb-current">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Eyebrow Label */}
        {eyebrow && (
          <span className="section-eyebrow inner-hero-eyebrow">
            {eyebrow}
          </span>
        )}

        {/* Page Title */}
        {title && (
          <h1 className="inner-hero-title">
            {title}
          </h1>
        )}

        {/* Supporting Description */}
        {description && (
          <p className="inner-hero-description">
            {description}
          </p>
        )}

        {/* Optional Stats / Action Pills */}
        {stats && stats.length > 0 && (
          <div className="inner-hero-stats-row">
            {stats.map((st, i) => (
              <div className="hero-stat-pill" key={i}>
                <span className="stat-label">{st.label}</span>
                {st.value && <span className="stat-value">{st.value}</span>}
              </div>
            ))}
          </div>
        )}

        {action}
        {children}
      </div>
    </div>
  );
}
