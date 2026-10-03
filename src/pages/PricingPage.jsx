import React from 'react';
import { Link } from 'react-router-dom';
import Pricing from '../components/Pricing';
import { StoreManager } from '../data/store';

export default function PricingPage() {
  const pricing = StoreManager.getPricing();

  return (
    <div>
      {/* Page Header */}
      <div style={{ backgroundColor: 'var(--bg-soft)', borderBottom: '1px solid var(--border-color)', padding: '40px 0' }}>
        <div className="container">
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link> / <span style={{ color: 'var(--dark-green)', fontWeight: '600' }}>Pricing</span>
          </div>
          <h1 style={{ fontSize: '38px', marginBottom: '8px' }}>Simple, Clear Pricing</h1>
          <p className="lead">Transparent hourly slot rates dynamically configured for morning, day, and peak evening play.</p>
        </div>
      </div>

      {/* Main Pricing Cards */}
      <Pricing />

      {/* Pricing Breakdown & Duration Options */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <span className="section-eyebrow">PRICING POLICY</span>
            <h2 className="section-title">Fee Breakdown & Duration Options</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border-color)', padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Platform & Lighting Fee: ₹{pricing.bookingFee}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                A small convenience and lighting charge applied per reservation to cover anti-glare high-lux floodlight operation.
              </p>
            </div>

            <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border-color)', padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Flexible Duration Multipliers</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Book 60 minutes, 90 minutes (1.5 hrs), or 120 minutes (2 hrs). Price scales proportionally with no surge penalties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-box">
            <h2 className="section-title">Ready to reserve your slot?</h2>
            <p className="lead">Select your preferred date and time on our booking application.</p>
            <Link to="/book" className="btn btn-primary">
              Book Your Slot &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
