import React, { useState } from 'react';
import { StoreManager } from '../../data/store';

export default function AdminAmenities() {
  const [amenities, setAmenities] = useState(() => StoreManager.getAmenities());

  const handleToggle = (id) => {
    const updated = amenities.map(a => a.id === id ? { ...a, active: !a.active } : a);
    setAmenities(updated);
    StoreManager.updateAmenities(updated);
  };

  return (
    <div>
      <div className="section-header" style={{ textAlign: 'left', margin: '0 0 24px 0', maxWidth: 'none' }}>
        <h2 className="section-title">Amenities Management</h2>
        <p className="lead">Enable or disable facility amenities shown on the public website.</p>
      </div>

      <div className="admin-table-card" style={{ maxWidth: '640px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {amenities.map((item) => (
            <div 
              key={item.id} 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
            >
              <div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>{item.name}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.desc}</div>
              </div>

              <button
                className={`btn ${item.active ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '12px', padding: '6px 14px' }}
                onClick={() => handleToggle(item.id)}
              >
                {item.active ? 'Active' : 'Disabled'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
