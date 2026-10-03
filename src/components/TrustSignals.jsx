import React from 'react';

export default function TrustSignals() {
  const items = [
    {
      title: "Quality Turf",
      desc: "50mm Mono-filament Synthetic Fiber",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    },
    {
      title: "Floodlit Evening Play",
      desc: "High-Lux Anti-Glare LED System",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      )
    },
    {
      title: "Easy Online Booking",
      desc: "Live Slot Reservation & Details",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      )
    },
    {
      title: "Parking Available",
      desc: "Dedicated On-Site Vehicle Space",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="22" height="18" rx="2" ry="2"/>
          <path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>
        </svg>
      )
    }
  ];

  return (
    <section className="trust-snapshot-section">
      <div className="container">
        <div className="snapshot-grid">
          {items.map((item, idx) => (
            <div key={idx} className="snapshot-item">
              <div className="snapshot-icon">{item.icon}</div>
              <div>
                <div className="snapshot-text">{item.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
