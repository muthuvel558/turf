import React from 'react';
import { Link } from 'react-router-dom';
import InnerPageHero from '../components/InnerPageHero';
import Pricing from '../components/Pricing';
import { StoreManager } from '../data/store';
import { VENUE_INFO } from '../data/venue';
import { IMAGES } from '../data/images';

export default function PricingPage() {
  const pricing = StoreManager.getPricing();

  return (
    <div>
      {/* Page Header / Hero Cover Banner */}
      <InnerPageHero
        breadcrumb="Home / Pricing"
        eyebrow="TRANSPARENT RATES"
        title="Simple Pricing. No Surprises."
        description="Choose your playing time, check availability and book the slot that works for your game."
        backgroundImage={IMAGES.evening}
        stats={[
          { label: "Morning" },
          { label: "Regular" },
          { label: "Prime Evening" }
        ]}
      />

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

      {/* Cancellation & Reschedule Policy Box */}
      <section style={{ padding: '72px 0', backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: '36px' }}>
            <span className="section-eyebrow">POLICIES & SAFETY</span>
            <h2 className="section-title" style={{ fontSize: '36px', textTransform: 'uppercase' }}>
              CANCELLATION & RESCHEDULE POLICY
            </h2>
          </div>

          <div style={{ maxWidth: '720px', margin: '0 auto', background: '#FFFFFF', border: '1px solid var(--border-color)', padding: '32px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ marginBottom: '16px', fontSize: '15px' }}>
              <strong>Rescheduling Window:</strong> {VENUE_INFO.cancellationPolicy.rescheduleWindow}
            </div>
            <div style={{ marginBottom: '16px', fontSize: '15px' }}>
              <strong>Refund Rules:</strong> {VENUE_INFO.cancellationPolicy.refundPolicy}
            </div>
            <div style={{ fontSize: '15px' }}>
              <strong>Late Cancellations:</strong> {VENUE_INFO.cancellationPolicy.lateCancellation}
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
