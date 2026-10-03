import React, { useState } from 'react';
import { StoreManager } from '../data/store';
import Modal from './Modal';
import RescheduleModal from './RescheduleModal';
import CancelModal from './CancelModal';

export default function MyBookings({ onClose }) {
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
    <>
      <Modal
        isOpen={true}
        onClose={onClose}
        title="My Bookings"
        subtitle="Manage your slot reservations at PrimeTurf Arena"
        maxWidth="680px"
      >
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
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No {activeTab.toLowerCase()} bookings found.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredBookings.map((item) => (
              <div key={item.id} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '20px', background: 'var(--bg-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontWeight: '800', color: 'var(--brand-green)', fontSize: '15px' }}>{item.id}</span>
                  <span className={`status-tag ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px', marginBottom: '12px' }}>
                  <div>Sport: <strong>{item.sportName}</strong></div>
                  <div>Date: <strong>{item.dateStr}</strong></div>
                  <div>Slot: <strong>{item.startTime}</strong> ({item.durationMins || 60} mins)</div>
                  <div>Amount Paid: <strong>₹{item.amount}</strong></div>
                </div>

                {item.status === 'UPCOMING' && (
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Free reschedule 4 hrs prior to slot.</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn btn-outline" 
                        style={{ padding: '4px 10px', fontSize: '12px' }}
                        onClick={() => setRescheduleBookingTarget(item)}
                      >
                        Reschedule
                      </button>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '4px 10px', fontSize: '12px', color: '#DC2626' }}
                        onClick={() => setCancelBookingTarget(item)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Modal>

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
    </>
  );
}
