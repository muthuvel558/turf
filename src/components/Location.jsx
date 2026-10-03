import React from 'react';
import { StoreManager } from '../data/store';

export default function Location() {
  const facility = StoreManager.getFacility();

  return (
    <section className="location-section" id="location">
      <div className="container">
        <div className="location-grid">
          
          {/* Info Details */}
          <div className="location-info">
            <div>
              <span className="section-eyebrow">LOCATION & DIRECTIONS</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>Where To Find Us</h2>
              <p className="lead" style={{ textAlign: 'left', marginBottom: '24px' }}>
                Conveniently located with easy access and free parking.
              </p>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>Address</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{facility.address}, {facility.city}</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 16 14"/>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>Operating Hours</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{facility.operatingHours}</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>Phone / WhatsApp</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{facility.phone}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(facility.address)}`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary"
              >
                Get Directions &rarr;
              </a>
              <a 
                href={`https://wa.me/${facility.whatsapp.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Map Graphic / Interactive Container */}
          <div className="map-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EAECE8', padding: '24px', textAlign: 'center' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--brand-green)" strokeWidth="2" style={{ marginBottom: '12px' }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{facility.name} Ground Map</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', maxWidth: '320px' }}>
              {facility.address}, {facility.city}
            </p>
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(facility.address)}`} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-outline"
            >
              Open in Google Maps
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
