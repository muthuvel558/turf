import React from 'react';
import { VENUE_INFO } from '../data/venue';
import { IMAGES } from '../data/images';

export default function TurfDetails() {
  return (
    <section className="turf-details-section" id="turf-details">
      <div className="container">
        
        <div className="section-header">
          <span className="section-eyebrow">PITCH SPECIFICATIONS</span>
          <h2 className="section-title">Turf Specifications</h2>
          <p className="lead">Everything you need to know about playing at PrimeTurf Arena.</p>
        </div>

        <div className="turf-details-grid">
          {VENUE_INFO.turfSpecs.map((spec, idx) => (
            <div key={idx} className="detail-card">
              <div className="detail-card-title">{spec.title}</div>
              <div className="detail-card-value">{spec.value}</div>
            </div>
          ))}
        </div>

        {/* Rules & Guidelines Container */}
        <div style={{ marginTop: '48px', padding: '28px', backgroundColor: 'var(--bg-soft)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--text-primary)' }}>Important Player Guidelines</h3>
          <ul style={{ listStyle: 'circle', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {VENUE_INFO.rules.map((rule, idx) => (
              <li key={idx} style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
