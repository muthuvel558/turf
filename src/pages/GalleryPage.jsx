import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InnerPageHero from '../components/InnerPageHero';
import { IMAGES } from '../data/images';
import Lightbox from '../components/Lightbox';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  const categories = ['ALL', 'Lighting', 'Surface', 'Pitch Detail', 'Access', 'Amenities'];

  const filteredImages = activeCategory === 'ALL'
    ? IMAGES.gallery
    : IMAGES.gallery.filter(img => img.category === activeCategory);

  return (
    <div>
      {/* Page Header / Hero Cover Banner */}
      <InnerPageHero
        breadcrumb="Home / Gallery"
        eyebrow="INSIDE PRIME TURF"
        title="See the Arena Before You Play."
        description="Explore the pitch, lighting, facilities and match-day environment at PrimeTurf Arena."
        backgroundImage={IMAGES.droneHero}
      />

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
