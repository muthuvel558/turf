import React, { useState } from 'react';
import { StoreManager } from '../../data/store';

export default function AdminReviews() {
  const [reviews, setReviews] = useState(() => StoreManager.getReviews());

  const handleToggle = (id) => {
    const updated = StoreManager.toggleReviewApproval(id);
    setReviews(updated);
  };

  const handleDelete = (id) => {
    const updated = StoreManager.deleteReview(id);
    setReviews(updated);
  };

  return (
    <div>
      <div className="section-header" style={{ textAlign: 'left', margin: '0 0 24px 0', maxWidth: 'none' }}>
        <h2 className="section-title">Customer Reviews Moderation</h2>
        <p className="lead">Approve, hide, or delete customer reviews. Only approved reviews appear on the website.</p>
      </div>

      <div className="admin-table-card">
        {reviews.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>No customer reviews recorded.</div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Sport</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Public Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((r) => (
                  <tr key={r.id}>
                    <td><strong>{r.name}</strong></td>
                    <td>{r.sport}</td>
                    <td style={{ color: '#F59E0B' }}>{'★'.repeat(r.rating)}</td>
                    <td style={{ maxWidth: '300px' }}>"{r.comment}"</td>
                    <td>
                      <span className={`status-tag ${r.approved ? 'upcoming' : 'blocked'}`}>
                        {r.approved ? 'Approved' : 'Hidden'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                          className="btn btn-outline" 
                          style={{ padding: '2px 8px', fontSize: '12px' }}
                          onClick={() => handleToggle(r.id)}
                        >
                          {r.approved ? 'Hide' : 'Approve'}
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '2px 8px', fontSize: '12px', color: '#DC2626' }}
                          onClick={() => handleDelete(r.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
