import React from 'react';

export default function Lightbox({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close Lightbox">&times;</button>
        <img src={image.src} alt={image.title} className="lightbox-img" />
        <div style={{ padding: '16px', background: '#FFFFFF', color: 'var(--text-primary)', fontWeight: '700' }}>
          {image.title} - <span style={{ fontWeight: 'normal', color: 'var(--text-secondary)' }}>{image.category}</span>
        </div>
      </div>
    </div>
  );
}
