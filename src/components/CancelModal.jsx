import React from 'react';
import Modal from './Modal';
import { StoreManager } from '../data/store';

export default function CancelModal({ booking, onClose, onCancelSuccess }) {
  if (!booking) return null;

  const handleConfirmCancel = () => {
    const updatedBookings = StoreManager.updateBookingStatus(booking.id, 'CANCELLED');
    if (onCancelSuccess) {
      onCancelSuccess(updatedBookings);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={!!booking}
      onClose={onClose}
      title="CANCEL BOOKING"
      subtitle="Are you sure you want to cancel this reservation?"
      maxWidth="480px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Booking Summary Box */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '800', color: '#16A34A', fontSize: '15px' }}>{booking.id}</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', background: '#E2E8F0', padding: '2px 8px', borderRadius: '4px' }}>
              {booking.sportName}
            </span>
          </div>

          <div style={{ fontSize: '14px', color: '#101513', marginTop: '4px' }}>
            <div>Date: <strong>{booking.dateStr}</strong></div>
            <div>Time: <strong>{booking.startTime}</strong> ({booking.durationMins || 60} Mins)</div>
            <div style={{ marginTop: '4px', fontSize: '15px', fontWeight: '800', color: '#101513' }}>
              Amount Paid: <span style={{ color: '#16A34A' }}>₹{booking.amount}</span>
            </div>
          </div>
        </div>

        {/* Small Muted Policy Text */}
        <div style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.5', background: '#F1F5F9', padding: '10px 14px', borderRadius: '8px', borderLeft: '3px solid #64748B' }}>
          Cancellation policy may apply. Cancellations made 6+ hours in advance receive a full refund to original payment source.
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={onClose}
            style={{ borderRadius: '10px', padding: '10px 20px', fontSize: '14px' }}
          >
            Keep Booking
          </button>
          <button 
            type="button" 
            className="btn btn-destructive"
            onClick={handleConfirmCancel}
            style={{ borderRadius: '10px', padding: '10px 20px', fontSize: '14px' }}
          >
            Confirm Cancellation
          </button>
        </div>

      </div>
    </Modal>
  );
}
