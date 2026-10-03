import React, { useState } from 'react';
import { StoreManager } from '../../data/store';

export default function AdminBookings() {
  const [bookings, setBookings] = useState(() => StoreManager.getBookings());
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = statusFilter === 'ALL' 
    ? bookings 
    : bookings.filter(b => b.status === statusFilter);

  const handleUpdateStatus = (id, newStatus) => {
    const updated = StoreManager.updateBookingStatus(id, newStatus);
    setBookings(updated);
  };

  return (
    <div>
      <div className="section-header" style={{ textAlign: 'left', margin: '0 0 24px 0', maxWidth: 'none' }}>
        <h2 className="section-title">Booking Records</h2>
        <p className="lead">View, filter, update, or cancel customer slot reservations.</p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['ALL', 'UPCOMING', 'COMPLETED', 'CANCELLED'].map((filter) => (
          <button
            key={filter}
            className={`btn ${statusFilter === filter ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '13px', padding: '6px 14px' }}
            onClick={() => setStatusFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="admin-table-card">
        {filtered.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No bookings matching criteria.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Date & Time</th>
                <th>Sport</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td><strong>{b.id}</strong></td>
                  <td>{b.dateStr} <br/><span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{b.startTime}</span></td>
                  <td>{b.sportName}</td>
                  <td>{b.customerName}</td>
                  <td>{b.phone}</td>
                  <td>₹{b.amount}</td>
                  <td><span className={`status-tag ${b.status.toLowerCase()}`}>{b.status}</span></td>
                  <td>
                    {b.status === 'UPCOMING' && (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                          className="btn btn-outline" 
                          style={{ padding: '2px 8px', fontSize: '12px' }}
                          onClick={() => handleUpdateStatus(b.id, 'COMPLETED')}
                        >
                          Complete
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '2px 8px', fontSize: '12px', color: '#DC2626' }}
                          onClick={() => handleUpdateStatus(b.id, 'CANCELLED')}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
