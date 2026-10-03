import React, { useState } from 'react';
import { StoreManager } from '../../data/store';

export default function AdminPricing() {
  const [pricing, setPricing] = useState(() => StoreManager.getPricing());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPricing(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    StoreManager.updatePricing(pricing);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div>
      <div className="section-header" style={{ textAlign: 'left', margin: '0 0 24px 0', maxWidth: 'none' }}>
        <h2 className="section-title">Pricing Configuration</h2>
        <p className="lead">Configure hourly slot rates and platform booking fees. One single source of truth.</p>
      </div>

      <div className="admin-table-card" style={{ maxWidth: '600px' }}>
        {savedSuccess && (
          <div style={{ background: 'var(--light-green)', color: 'var(--dark-green)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', fontWeight: '700', fontSize: '14px' }}>
            ✓ Pricing configuration saved! Customer slot finder now reflects these live rates.
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Morning Rate (06:00 AM – 09:00 AM)</label>
            <input 
              type="number" 
              name="morningPrice" 
              value={pricing.morningPrice}
              onChange={handleChange}
              className="form-input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Regular Daytime Rate (09:00 AM – 05:00 PM)</label>
            <input 
              type="number" 
              name="regularPrice" 
              value={pricing.regularPrice}
              onChange={handleChange}
              className="form-input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Prime Evening Floodlit Rate (05:00 PM – 11:00 PM)</label>
            <input 
              type="number" 
              name="eveningPrice" 
              value={pricing.eveningPrice}
              onChange={handleChange}
              className="form-input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Platform & Convenience Booking Fee (₹)</label>
            <input 
              type="number" 
              name="bookingFee" 
              value={pricing.bookingFee}
              onChange={handleChange}
              className="form-input" 
            />
          </div>

          <div style={{ marginTop: '24px' }}>
            <button type="submit" className="btn btn-primary">Save Pricing Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
