import React, { useState } from 'react';
import { StoreManager } from '../../data/store';

export default function AdminFacility() {
  const [facility, setFacility] = useState(() => StoreManager.getFacility());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacility(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    StoreManager.updateFacility(facility);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div>
      <div className="section-header" style={{ textAlign: 'left', margin: '0 0 24px 0', maxWidth: 'none' }}>
        <h2 className="section-title">Facility Information</h2>
        <p className="lead">Manage business details, address, contact numbers, and operating hours.</p>
      </div>

      <div className="admin-table-card" style={{ maxWidth: '640px' }}>
        {savedSuccess && (
          <div style={{ background: 'var(--light-green)', color: 'var(--dark-green)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', fontWeight: '700', fontSize: '14px' }}>
            ✓ Facility details updated! The public website reflects these changes live.
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Facility Name</label>
            <input 
              type="text" 
              name="name" 
              value={facility.name} 
              onChange={handleChange}
              className="form-input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hero Tagline</label>
            <input 
              type="text" 
              name="tagline" 
              value={facility.tagline} 
              onChange={handleChange}
              className="form-input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Facility Description</label>
            <textarea 
              name="description" 
              value={facility.description} 
              onChange={handleChange}
              rows={3}
              className="form-input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Full Address</label>
            <input 
              type="text" 
              name="address" 
              value={facility.address} 
              onChange={handleChange}
              className="form-input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="text" 
              name="phone" 
              value={facility.phone} 
              onChange={handleChange}
              className="form-input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">WhatsApp Number</label>
            <input 
              type="text" 
              name="whatsapp" 
              value={facility.whatsapp} 
              onChange={handleChange}
              className="form-input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Operating Hours</label>
            <input 
              type="text" 
              name="operatingHours" 
              value={facility.operatingHours} 
              onChange={handleChange}
              className="form-input" 
            />
          </div>

          <div style={{ marginTop: '24px' }}>
            <button type="submit" className="btn btn-primary">Save Facility Details</button>
          </div>
        </form>
      </div>
    </div>
  );
}
