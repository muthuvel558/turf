import React from 'react';
import { StoreManager } from '../data/store';
import { IMAGES } from '../data/images';

export default function Amenities() {
  const activeAmenities = StoreManager.getAmenities().filter(a => a.active);

  // Map each amenity to its corresponding visual gallery photo
  const amenityImages = [
    IMAGES.evening || "/images/turf-hero.jpg",
    IMAGES.facility || "/images/hero.png",
    IMAGES.dugout || "/images/hero.png",
    IMAGES.surface || "/images/hero.png",
    IMAGES.dugout || "/images/hero.png",
    IMAGES.goal || "/images/hero.png",
  ];

  const getIcon = (idx) => {
    switch (idx % 6) {
      case 0:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        );
      case 1:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
          </svg>
        );
      case 2:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        );
      case 3:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        );
      case 4:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13"/>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
        );
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
          </svg>
        );
    }
  };

  return (
    <section className="amenities-section" id="amenities">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">FACILITIES & COMFORT</span>
          <h2 className="section-title">Essential Arena Amenities</h2>
          <p className="lead">Designed to give players and teams a comfortable, pro-grade matchday experience.</p>
        </div>

        <div className="amenities-grid">
          {activeAmenities.map((item, idx) => (
            <div 
              key={item.id || idx} 
              className="amenity-item-box"
              style={{
                flexDirection: 'column',
                alignItems: 'stretch',
                padding: '0',
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Amenity Gallery Cover Image */}
              <div style={{ position: 'relative', width: '100%', height: '175px', overflow: 'hidden' }}>
                <img 
                  src={amenityImages[idx % amenityImages.length]} 
                  alt={item.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  loading="lazy"
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                  <div className="amenity-check-icon" style={{ boxShadow: 'var(--shadow-md)', background: 'rgba(255, 255, 255, 0.95)' }}>
                    {getIcon(idx)}
                  </div>
                </div>
              </div>

              {/* Amenity Content */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <h4 className="amenity-name" style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{item.name}</h4>
                <p className="amenity-desc" style={{ fontSize: '13.5px', lineHeight: '1.5', color: 'var(--text-secondary)', margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
