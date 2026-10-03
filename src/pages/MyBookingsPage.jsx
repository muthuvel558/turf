import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreManager } from '../data/store';
import RescheduleModal from '../components/RescheduleModal';
import CancelModal from '../components/CancelModal';

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('UPCOMING');
  const [bookings, setBookings] = useState(() => StoreManager.getBookings());

  const [rescheduleBookingTarget, setRescheduleBookingTarget] = useState(null);
  const [cancelBookingTarget, setCancelBookingTarget] = useState(null);

  const filteredBookings = bookings.filter((b) => b.status === activeTab);

  const handleRescheduleSuccess = (updatedBookings) => {
    setBookings(updatedBookings);
  };

  const handleCancelSuccess = (updatedBookings) => {
    setBookings(updatedBookings);
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ backgroundColor: 'var(--bg-soft)', borderBottom: '1px solid var(--border-color)', padding: '40px 0' }}>
        <div className="container">
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link> / <span style={{ color: 'var(--dark-green)', fontWeight: '600' }}>My Bookings</span>
          </div>
          <h1 style={{ fontSize: '38px', marginBottom: '8px' }}>Your Bookings</h1>
          <p className="lead">Manage your slot reservations, view receipts, or request rescheduling.</p>
        </div>
      </div>

      <section style={{ padding: '48px 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          {/* Tabs */}
          <div className="my-bookings-tabs-nav">
            {[
              { id: 'UPCOMING', label: `Upcoming (${bookings.filter(b => b.status === 'UPCOMING').length})` },
              { id: 'COMPLETED', label: `Completed (${bookings.filter(b => b.status === 'COMPLETED').length})` },
              { id: 'CANCELLED', label: `Cancelled (${bookings.filter(b => b.status === 'CANCELLED').length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`my-bookings-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
              No {activeTab.toLowerCase()} bookings found.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredBookings.map((item) => (
                <div key={item.id} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '24px', background: 'var(--bg-primary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontWeight: '800', color: 'var(--brand-green)', fontSize: '16px' }}>{item.id}</span>
                    <span className={`status-tag ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px', marginBottom: '16px' }}>
                    <div>Sport: <strong>{item.sportName}</strong></div>
                    <div>Date: <strong>{item.dateStr}</strong></div>
                    <div>Slot: <strong>{item.startTime}</strong> ({item.durationMins || 60} mins)</div>
                    <div>Amount Paid: <strong>₹{item.amount}</strong></div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '6px 14px', fontSize: '13px' }}
                      onClick={() => navigate(`/booking/${item.id}`)}
                    >
                      View Details &rarr;
                    </button>

                    {item.status === 'UPCOMING' && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="btn btn-outline" 
                          style={{ padding: '6px 14px', fontSize: '13px' }}
                          onClick={() => setRescheduleBookingTarget(item)}
                        >
                          Reschedule
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '6px 14px', fontSize: '13px', color: '#DC2626' }}
                          onClick={() => setCancelBookingTarget(item)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Reschedule Modal Overlay */}
      {rescheduleBookingTarget && (
        <RescheduleModal
          booking={rescheduleBookingTarget}
          onClose={() => setRescheduleBookingTarget(null)}
          onRescheduleSuccess={handleRescheduleSuccess}
        />
      )}

      {/* Cancel Confirmation Modal Overlay */}
      {cancelBookingTarget && (
        <CancelModal
          booking={cancelBookingTarget}
          onClose={() => setCancelBookingTarget(null)}
          onCancelSuccess={handleCancelSuccess}
        />
      )}
    </div>
  );
}
