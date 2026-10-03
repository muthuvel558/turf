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
      {/* Page Header */}
      <div style={{ backgroundColor: 'var(--bg-soft)', borderBottom: '1px solid var(--border-color)', padding: '40px 0' }}>
        <div className="container">
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link> / <span style={{ color: 'var(--dark-green)', fontWeight: '600' }}>Gallery</span>
          </div>
          <h1 style={{ fontSize: '38px', marginBottom: '8px' }}>Take a Look Around</h1>
          <p className="lead">Visual proof of our playing surface, evening LED lights, entrance, and player facilities.</p>
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
          <div className="cta-box">
            <h2 className="section-title">Like what you see?</h2>
            <p className="lead">Book your slot and experience the pitch in person.</p>
            <Link to="/book" className="btn btn-primary">
              Book Your Slot &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
