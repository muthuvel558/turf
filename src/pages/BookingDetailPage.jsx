import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StoreManager } from '../data/store';
import RescheduleModal from '../components/RescheduleModal';
import CancelModal from '../components/CancelModal';

export default function BookingDetailPage() {
  const { id } = useParams();
  const [bookings, setBookings] = useState(() => StoreManager.getBookings());

  const [rescheduleBookingTarget, setRescheduleBookingTarget] = useState(null);
  const [cancelBookingTarget, setCancelBookingTarget] = useState(null);

  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Booking Not Found</h2>
        <p className="lead" style={{ marginBottom: '24px' }}>No booking record exists for ID: {id}</p>
        <Link to="/my-bookings" className="btn btn-primary">Go to My Bookings</Link>
      </div>
    );
  }

  const facility = StoreManager.getFacility();

  const handleRescheduleSuccess = (updatedBookings) => {
    setBookings(updatedBookings);
  };

  const handleCancelSuccess = (updatedBookings) => {
    setBookings(updatedBookings);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--bg-soft)', borderBottom: '1px solid var(--border-color)', padding: '32px 0' }}>
        <div className="container">
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>
            <Link to="/my-bookings" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>My Bookings</Link> / <span style={{ color: 'var(--dark-green)', fontWeight: '600' }}>{booking.id}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h1 style={{ fontSize: '32px' }}>{booking.id}</h1>
            <span className={`status-tag ${booking.status.toLowerCase()}`}>{booking.status}</span>
          </div>
        </div>
      </div>

      <section style={{ padding: '48px 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          
          <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <h3 style={{ fontSize: '18px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              Reservation Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '15px' }}>
              <div>Facility: <strong>{facility.name}</strong></div>
              <div>Sport: <strong>{booking.sportName}</strong></div>
              <div>Date: <strong>{booking.dateStr}</strong></div>
              <div>Time Slot: <strong>{booking.startTime}</strong></div>
              <div>Duration: <strong>{booking.durationMins || 60} Mins</strong></div>
              <div>Players: <strong>{booking.players || '5-v-5'}</strong></div>
            </div>

            <h3 style={{ fontSize: '18px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginTop: '12px' }}>
              Customer Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '15px' }}>
              <div>Name: <strong>{booking.customerName}</strong></div>
              <div>Phone: <strong>{booking.phone}</strong></div>
              {booking.email && <div>Email: <strong>{booking.email}</strong></div>}
              <div>Payment Status: <strong style={{ color: booking.status === 'CANCELLED' ? '#DC2626' : 'var(--dark-green)' }}>{booking.status === 'CANCELLED' ? 'Cancelled' : `Paid (₹${booking.amount})`}</strong></div>
            </div>

            <h3 style={{ fontSize: '18px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginTop: '12px' }}>
              Venue Location
            </h3>

            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              <div>{facility.address}, {facility.city}</div>
              <div>{facility.operatingHours}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link to="/contact" className="btn btn-outline">Contact Turf</Link>
                <Link to="/my-bookings" className="btn btn-primary">Back to My Bookings</Link>
              </div>

              {booking.status === 'UPCOMING' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-outline" onClick={() => setRescheduleBookingTarget(booking)}>Reschedule</button>
                  <button className="btn btn-secondary" style={{ color: '#DC2626' }} onClick={() => setCancelBookingTarget(booking)}>Cancel</button>
                </div>
              )}
            </div>

          </div>

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
