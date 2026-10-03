import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal, { SuccessCheckmark } from './Modal';

export default function BookingConfirmationOverlay({ booking, onClose }) {
  const navigate = useNavigate();

  if (!booking) return null;

  return (
    <Modal
      isOpen={!!booking}
      onClose={onClose}
      title="BOOKING CONFIRMED"
      subtitle="Your turf slot has been successfully reserved"
      maxWidth="500px"
    >
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Animated Green Circle & Checkmark */}
        <div>
          <SuccessCheckmark />
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#101513', letterSpacing: '0.02em', margin: '4px 0 2px 0' }}>
            RESERVATION SUCCESSFUL
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B' }}>
            We look forward to seeing you at PrimeTurf Arena.
          </p>
        </div>

        {/* Transaction & Slot Summary Card */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', paddingBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#16A34A' }}>
              BOOKING ID
            </span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '800', color: '#101513' }}>
              {booking.id}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px', paddingTop: '4px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>Sport</div>
              <strong style={{ color: '#101513' }}>{booking.sportName || 'Football'}</strong>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>Date</div>
              <strong style={{ color: '#101513' }}>{booking.dateStr}</strong>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>Time Slot</div>
              <strong style={{ color: '#101513' }}>{booking.startTime}</strong>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>Duration</div>
              <strong style={{ color: '#101513' }}>{booking.durationMins || 60} Mins</strong>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
            <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>Amount Paid:</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '800', color: '#16A34A' }}>
              ₹{(booking.amount || booking.totalPrice || 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
          <button
            type="button"
            className="btn btn-outline"
            style={{ flex: 1, borderRadius: '10px', padding: '12px', fontSize: '14px' }}
            onClick={() => {
              if (onClose) onClose();
              navigate('/');
            }}
          >
            Done
          </button>

          <button
            type="button"
            className="btn btn-primary"
            style={{ flex: 1, borderRadius: '10px', padding: '12px', fontSize: '14px' }}
            onClick={() => {
              if (onClose) onClose();
              navigate('/my-bookings');
            }}
          >
            View My Bookings
          </button>
        </div>

      </div>
    </Modal>
  );
}
