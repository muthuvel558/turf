import React from 'react';
import { Link } from 'react-router-dom';
import InnerPageHero from '../components/InnerPageHero';
import TurfDetails from '../components/TurfDetails';
import Amenities from '../components/Amenities';
import FAQ from '../components/FAQ';
import { IMAGES } from '../data/images';

export default function TurfPage() {
  return (
    <div>
      {/* Page Header / Hero Cover Banner */}
      <InnerPageHero
        breadcrumb="Home / Turf"
        eyebrow="THE PLAYING SURFACE"
        title="Built for Better Games."
        description="A professionally maintained synthetic turf built for football, box cricket and regular match-day play."
        backgroundImage={IMAGES.turfHero}
      />

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
