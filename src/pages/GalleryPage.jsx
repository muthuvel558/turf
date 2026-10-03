import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../data/images';
import Lightbox from '../components/Lightbox';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  const categories = ['ALL', 'Turf Field', 'Lighting', 'Surface', 'Pitch Detail', 'Access', 'Amenities'];

  const filteredImages = activeCategory === 'ALL'
    ? IMAGES.gallery
    : IMAGES.gallery.filter(img => img.category === activeCategory);

  return (
    <div>
      {/* Page Header / Hero Cover Banner */}
      <div 
        style={{ 
          position: 'relative',
          backgroundImage: `linear-gradient(180deg, rgba(11, 13, 12, 0.75) 0%, rgba(11, 13, 12, 0.90) 100%), url(${IMAGES.droneHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid var(--border-color)', 
          padding: '84px 0 76px 0',
          color: '#FFFFFF'
        }}
      >
        <div className="container relative-z">
          <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
            <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none' }}>Home</Link> / <span style={{ color: 'var(--brand-green)', fontWeight: '600' }}>Gallery</span>
          </div>
          <span className="section-eyebrow" style={{ backgroundColor: 'rgba(22, 163, 74, 0.25)', color: '#4ADE80', borderColor: 'rgba(74, 222, 128, 0.3)' }}>VISUAL PROOF</span>
          <h1 style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-0.02em', margin: '12px 0', textTransform: 'uppercase', color: '#FFFFFF' }}>
            FACILITY PHOTO GALLERY
          </h1>
          <p className="lead" style={{ maxWidth: '640px', fontSize: '18px', color: 'rgba(255, 255, 255, 0.85)' }}>
            High-resolution visual proof of our playing surface, evening LED lights, campus access, and player facilities.
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '32px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '13px', padding: '6px 14px', whiteSpace: 'nowrap' }}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredImages.map((img, idx) => (
              <div 
                key={idx} 
                className="gallery-item"
                onClick={() => setActiveLightboxImg(img)}
              >
                <img src={img.src} alt={img.title} className="gallery-img" />
                <div className="gallery-caption">
                  <span>{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxImg && (
        <Lightbox 
          image={activeLightboxImg} 
          onClose={() => setActiveLightboxImg(null)} 
        />
      )}

      {/* CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-box text-center">
            <span className="section-eyebrow" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>EXPERIENCE THE PITCH</span>
            <h2 className="section-title" style={{ fontSize: '36px', textTransform: 'uppercase', marginTop: '12px' }}>
              LIKE WHAT YOU SEE?
            </h2>
            <p className="lead">Book your slot and experience the pitch in person.</p>
            <Link to="/book" className="btn btn-primary" style={{ marginTop: '16px' }}>
              Book Your Slot &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
