import React from 'react';
import { Link } from 'react-router-dom';
import TurfDetails from '../components/TurfDetails';
import Amenities from '../components/Amenities';
import FAQ from '../components/FAQ';

export default function TurfPage() {
  return (
    <div>
      {/* Page Header */}
      <div style={{ backgroundColor: 'var(--bg-soft)', borderBottom: '1px solid var(--border-color)', padding: '40px 0' }}>
        <div className="container">
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link> / <span style={{ color: 'var(--dark-green)', fontWeight: '600' }}>Turf</span>
          </div>
          <h1 style={{ fontSize: '38px', marginBottom: '8px' }}>PrimeTurf Arena Specifications</h1>
          <p className="lead">Explore pitch dimensions, turf quality, player safety standards, and venue amenities.</p>
        </div>
      </div>

      {/* Turf Details & Pitch Specifications */}
      <TurfDetails />

      {/* All Amenities */}
      <Amenities />

      {/* Turf FAQ */}
      <FAQ />

      {/* Final Book CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-box">
            <h2 className="section-title">Ready to play on PrimeTurf?</h2>
            <p className="lead">Check live availability and book your slot now.</p>
            <Link to="/book" className="btn btn-primary">
              Book Your Slot &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
