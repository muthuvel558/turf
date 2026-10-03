import React from 'react';
import { Link } from 'react-router-dom';
import TurfDetails from '../components/TurfDetails';
import Amenities from '../components/Amenities';
import FAQ from '../components/FAQ';
import { IMAGES } from '../data/images';

export default function TurfPage() {
  return (
    <div>
      {/* Page Header / Hero Cover Banner */}
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
            <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none' }}>Home</Link> / <span style={{ color: 'var(--brand-green)', fontWeight: '600' }}>Turf</span>
          </div>
          <span className="section-eyebrow" style={{ backgroundColor: 'rgba(22, 163, 74, 0.25)', color: '#4ADE80', borderColor: 'rgba(74, 222, 128, 0.3)' }}>PITCH & ARENA</span>
          <h1 style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-0.02em', margin: '12px 0', textTransform: 'uppercase', color: '#FFFFFF' }}>
            PRO-ENGINEERED ARENA PITCH
          </h1>
          <p className="lead" style={{ maxWidth: '640px', fontSize: '18px', color: 'rgba(255, 255, 255, 0.85)' }}>
            Discover pitch dimensions, 50mm mono-filament artificial grass, anti-glare floodlighting, and matchday amenities.
          </p>
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
          <div className="cta-box text-center">
            <span className="section-eyebrow" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>RESERVE PITCH</span>
            <h2 className="section-title" style={{ fontSize: '36px', textTransform: 'uppercase', marginTop: '12px' }}>
              READY TO PLAY ON PRIMETURF?
            </h2>
            <p className="lead">Check live availability and book your slot now.</p>
            <Link to="/book" className="btn btn-primary" style={{ marginTop: '16px' }}>
              Book Your Slot &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
