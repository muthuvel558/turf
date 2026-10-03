import React, { useState } from 'react';
import { IMAGES } from '../data/images';
import Lightbox from './Lightbox';

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">ARENA TOUR</span>
          <h2 className="section-title">Facility Photo Gallery</h2>
          <p className="lead">Take a look around the turf, floodlights, seating, and entrance before you play.</p>
        </div>

        <div className="gallery-grid">
          {IMAGES.gallery.map((img, idx) => (
            <div 
              key={idx} 
              className="gallery-item"
              onClick={() => setActiveImage(img)}
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="gallery-img"
                loading="lazy"
              />
              <div className="gallery-caption">
                <span>{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeImage && (
        <Lightbox 
          image={activeImage} 
          onClose={() => setActiveImage(null)} 
        />
      )}
    </section>
  );
}
