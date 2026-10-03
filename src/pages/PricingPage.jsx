import React from 'react';
import { Link } from 'react-router-dom';
import Pricing from '../components/Pricing';
import { StoreManager } from '../data/store';
import { IMAGES } from '../data/images';

export default function PricingPage() {
  const pricing = StoreManager.getPricing();

  return (
    <div>
      {/* Page Header / Hero Cover Banner */}
      <div 
        style={{ 
          position: 'relative',
          backgroundImage: `linear-gradient(180deg, rgba(11, 13, 12, 0.75) 0%, rgba(11, 13, 12, 0.90) 100%), url(${IMAGES.evening})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid var(--border-color)', 
          padding: '84px 0 76px 0',
          color: '#FFFFFF'
        }}
      >
        <div className="container relative-z">
          <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
            <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none' }}>Home</Link> / <span style={{ color: 'var(--brand-green)', fontWeight: '600' }}>Pricing</span>
          </div>
          <span className="section-eyebrow" style={{ backgroundColor: 'rgba(22, 163, 74, 0.25)', color: '#4ADE80', borderColor: 'rgba(74, 222, 128, 0.3)' }}>SIMPLE PRICING</span>
          <h1 style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-0.02em', margin: '12px 0', textTransform: 'uppercase', color: '#FFFFFF' }}>
            TRANSPARENT HOURLY RATES
          </h1>
          <p className="lead" style={{ maxWidth: '640px', fontSize: '18px', color: 'rgba(255, 255, 255, 0.85)' }}>
            Transparent hourly slot rates dynamically configured for morning, day, and prime evening floodlit play.
          </p>
        </div>
      </div>

      {/* Main Pricing Cards */}
      <Pricing />

      {/* Pricing Breakdown & Duration Options */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header text-center">
            <span className="section-eyebrow">PRICING POLICY</span>
            <h2 className="section-title" style={{ fontSize: '32px', textTransform: 'uppercase' }}>FEE BREAKDOWN & DURATION OPTIONS</h2>
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
          <div className="cta-box text-center">
            <span className="section-eyebrow" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>BOOK YOUR TIME</span>
            <h2 className="section-title" style={{ fontSize: '36px', textTransform: 'uppercase', marginTop: '12px' }}>
              READY TO RESERVE YOUR SLOT?
            </h2>
            <p className="lead">Select your preferred date and time on our booking application.</p>
            <Link to="/book" className="btn btn-primary" style={{ marginTop: '16px' }}>
              Book Your Slot &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
