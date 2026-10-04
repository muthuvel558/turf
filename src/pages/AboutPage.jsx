import React from 'react';
import { Link } from 'react-router-dom';
import { StoreManager } from '../data/store';
import { IMAGES } from '../data/images';

export default function AboutPage() {
  const facility = StoreManager.getFacility();

  return (
    <div>
      {/* Page Header / Hero Banner with Cover Background */}
      <div 
        style={{ 
          position: 'relative', 
          backgroundImage: `linear-gradient(180deg, rgba(11, 13, 12, 0.75) 0%, rgba(11, 13, 12, 0.90) 100%), url(${IMAGES.turfHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid var(--border-color)', 
          padding: '84px 0 76px 0',
          color: '#FFFFFF'
        }}
      >
        <div className="container relative-z">
          <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
            <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none' }}>Home</Link> / <span style={{ color: 'var(--brand-green)', fontWeight: '600' }}>About</span>
          </div>
          <span className="section-eyebrow" style={{ backgroundColor: 'rgba(22, 163, 74, 0.25)', color: '#4ADE80', borderColor: 'rgba(74, 222, 128, 0.3)' }}>ABOUT PRIMETURF ARENA</span>
          <h1 style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-0.02em', margin: '12px 0', textTransform: 'uppercase', color: '#FFFFFF' }}>
            BUILT FOR BETTER GAMES
          </h1>
          <p className="lead" style={{ maxWidth: '640px', fontSize: '18px', color: 'rgba(255, 255, 255, 0.85)' }}>
            The story behind PrimeTurf Arena and our unwavering commitment to local sports enthusiasts.
          </p>
        </div>
      </div>

      {/* About Content & Story */}
      <section style={{ padding: '72px 0', backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-header text-center" style={{ marginBottom: '36px' }}>
            <span className="section-eyebrow">OUR STORY</span>
            <h2 className="section-title" style={{ fontSize: '36px', textTransform: 'uppercase' }}>
              EXCELLENCE ON EVERY PITCH
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '17px', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
            <p>
              <strong>{facility.name}</strong> was created to solve a simple problem faced by local sports enthusiasts: finding a clean, well-lit, shock-absorbing synthetic turf ground that is easy to book without endless phone calls or venue double-booking conflicts.
            </p>
            <p>
              We installed premium 50mm mono-filament artificial grass filled with rubber granules to cushion landings and reduce strain on knees and ankles. Paired with anti-glare high-lux LED floodlights, players get optimum visibility during late-night matches.
            </p>
          </div>
        </div>
      </section>

      {/* Player Promise Section with Cover Image Backdrop */}
      <section 
        style={{ 
          position: 'relative',
          padding: '80px 0', 
          backgroundImage: `linear-gradient(180deg, rgba(247, 248, 246, 0.94) 0%, rgba(247, 248, 246, 0.97) 100%), url(${IMAGES.evening})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid var(--border-color)' 
        }}
      >
        <div className="container relative-z">
          <div className="section-header text-center" style={{ marginBottom: '44px' }}>
            <span className="section-eyebrow">OUR COMMITMENT</span>
            <h2 className="section-title" style={{ fontSize: '36px', textTransform: 'uppercase' }}>
              THE PLAYER PROMISE
            </h2>
            <p className="lead">What you can expect every single time you step onto our arena.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ color: 'var(--brand-green)', fontWeight: '800', fontSize: '13px', letterSpacing: '0.05em', marginBottom: '8px' }}>01. RELIABILITY</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>Zero Booking Conflict</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', margin: 0 }}>Real-time slot reservation ensures your booked slot is locked for your team only.</p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ color: 'var(--brand-green)', fontWeight: '800', fontSize: '13px', letterSpacing: '0.05em', marginBottom: '8px' }}>02. QUALITY</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>Well-Maintained Surface</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', margin: 0 }}>Regular turf brushing and infill leveling before evening prime hours.</p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ color: 'var(--brand-green)', fontWeight: '800', fontSize: '13px', letterSpacing: '0.05em', marginBottom: '8px' }}>03. HYGIENE</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>Hygienic Facilities</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', margin: 0 }}>Regularly cleaned washrooms, changing rooms, and cold drinking water refills.</p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ color: 'var(--brand-green)', fontWeight: '800', fontSize: '13px', letterSpacing: '0.05em', marginBottom: '8px' }}>04. TRANSPARENCY</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>Fair Policies</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', margin: 0 }}>Flexible rescheduling options up to 4 hours before your slot time.</p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-box text-center">
            <span className="section-eyebrow" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>JOIN THE MATCH</span>
            <h2 className="section-title" style={{ fontSize: '36px', textTransform: 'uppercase', marginTop: '12px' }}>
              READY TO PLAY ON PRIMETURF?
            </h2>
            <p className="lead">Experience the premium playing surface for yourself.</p>
            <Link to="/book" className="btn btn-primary" style={{ marginTop: '16px' }}>
              Book Your Slot &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
