import React, { useState, useMemo } from 'react';
import Modal from './Modal';
import { StoreManager } from '../data/store';
import { generateDynamicSlots } from '../data/slots';

export default function RescheduleModal({ booking, onClose, onRescheduleSuccess }) {
  const [newDateStr, setNewDateStr] = useState(booking.dateStr);
  const [selectedSlotTime, setSelectedSlotTime] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch store data for slots calculation
  const bookings = StoreManager.getBookings();
  const blockedSlots = StoreManager.getBlockedSlots();

  // Generate available slots dynamically for the chosen date
  const availableSlots = useMemo(() => {
    const duration = booking.durationMins || 60;
    const allSlots = generateDynamicSlots(newDateStr, duration, bookings, blockedSlots);
    return allSlots.filter(s => s.status === 'AVAILABLE');
  }, [newDateStr, booking.durationMins, bookings, blockedSlots]);

  const handleDateChange = (e) => {
    setNewDateStr(e.target.value);
    setSelectedSlotTime('');
    setErrorMsg('');
  };

  const handleSlotSelect = (time) => {
    const slotObj = availableSlots.find(s => s.time === time);
    if (!slotObj) {
      setErrorMsg('That slot is no longer available.');
      setSelectedSlotTime('');
    } else {
      setErrorMsg('');
      setSelectedSlotTime(time);
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!newDateStr) {
      setErrorMsg('Please select a new date.');
      return;
    }
    if (!selectedSlotTime) {
      setErrorMsg('Please select an available time slot.');
      return;
    }

    // Verify slot is still available
    const slotObj = availableSlots.find(s => s.time === selectedSlotTime);
    if (!slotObj) {
      setErrorMsg('That slot is no longer available.');
      return;
    }

    const updatedBookings = StoreManager.rescheduleBooking(booking.id, newDateStr, selectedSlotTime);
    if (onRescheduleSuccess) {
      onRescheduleSuccess(updatedBookings);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={!!booking}
      onClose={onClose}
      title="RESCHEDULE BOOKING"
      subtitle={booking.id}
      maxWidth="500px"
    >
      <form onSubmit={handleConfirm} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {/* Current Booking Summary Box */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', padding: '14px 16px', borderRadius: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748B', marginBottom: '4px' }}>
            Current Booking
          </div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#101513' }}>
            {booking.startTime}
          </div>
          <div style={{ fontSize: '13px', color: '#434845', marginTop: '2px' }}>
            {booking.dateStr} • {booking.sportName}
          </div>
        </div>

        {/* New Date Selector */}
        <div className="form-group">
          <label className="form-label" style={{ fontWeight: '700', fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            New Date
          </label>
          <input 
            type="date" 
            value={newDateStr} 
            onChange={handleDateChange} 
            className="form-input" 
            style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1' }}
          />
        </div>

        {/* New Time Slot Selector */}
        <div className="form-group">
          <label className="form-label" style={{ fontWeight: '700', fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            New Time Slot
          </label>
          
          {availableSlots.length === 0 ? (
            <div style={{ padding: '12px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: '10px', fontSize: '13px', fontWeight: '600' }}>
              No available slots for this date.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', maxHeight: '180px', overflowY: 'auto', padding: '2px' }}>
              {availableSlots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => handleSlotSelect(slot.time)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: selectedSlotTime === slot.time ? '2px solid #16A34A' : '1px solid #E2E8F0',
                    background: selectedSlotTime === slot.time ? 'rgba(22, 163, 74, 0.08)' : '#FFFFFF',
                    color: selectedSlotTime === slot.time ? '#101513' : '#475569',
                    fontWeight: selectedSlotTime === slot.time ? '800' : '600',
                    fontSize: '13px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Error / Warning Message */}
        {errorMsg && (
          <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: '10px', fontSize: '13px', fontWeight: '600' }}>
            {errorMsg}
          </div>
        )}

        {/* Modal Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={onClose}
            style={{ borderRadius: '10px', padding: '10px 20px', fontSize: '14px' }}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!selectedSlotTime || !!errorMsg}
            style={{ 
              borderRadius: '10px', 
              padding: '10px 20px', 
              fontSize: '14px',
              opacity: (!selectedSlotTime || !!errorMsg) ? 0.5 : 1,
              cursor: (!selectedSlotTime || !!errorMsg) ? 'not-allowed' : 'pointer'
            }}
          >
            Confirm Reschedule
          </button>
        </div>
      </form>
    </Modal>
  );
}
