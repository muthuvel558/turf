import React from 'react';
import { StoreManager } from '../data/store';

export default function Reviews() {
  const approvedReviews = StoreManager.getReviews().filter(r => r.approved);

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">PLAYER FEEDBACK</span>
          <h2 className="section-title">What Players Say</h2>
          <p className="lead">Recent reviews from local football and cricket teams booking PrimeTurf Arena.</p>
        </div>

        {approvedReviews.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No public reviews available yet.
          </div>
        ) : (
          <div className="reviews-grid">
            {approvedReviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div>
                    <div className="review-author">{review.name}</div>
                    <div className="review-sport">{review.sport} • {review.date}</div>
                  </div>
                  <div className="review-stars">
                    {'★'.repeat(review.rating)}
                  </div>
                </div>
                <p className="review-text">"{review.comment}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
