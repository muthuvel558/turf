import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreManager } from '../data/store';
import { IMAGES } from '../data/images';
import RescheduleModal from '../components/RescheduleModal';
import CancelModal from '../components/CancelModal';

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('UPCOMING');
  const [bookings, setBookings] = useState(() => StoreManager.getBookings());
  const [copiedId, setCopiedId] = useState(null);

  const [rescheduleBookingTarget, setRescheduleBookingTarget] = useState(null);
  const [cancelBookingTarget, setCancelBookingTarget] = useState(null);

  const upcomingCount = bookings.filter(b => b.status === 'UPCOMING').length;
  const completedCount = bookings.filter(b => b.status === 'COMPLETED').length;
  const cancelledCount = bookings.filter(b => b.status === 'CANCELLED').length;

  const filteredBookings = bookings.filter((b) => b.status === activeTab);

  const handleRescheduleSuccess = (updatedBookings) => {
    setBookings(updatedBookings);
  };

  const handleCancelSuccess = (updatedBookings) => {
    setBookings(updatedBookings);
  };

  const parseDateParts = (dateStr) => {
    if (!dateStr) return { day: '--', month: '---', year: '----' };
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthIdx = parseInt(parts[1], 10) - 1;
        const day = parts[2];
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const month = monthNames[monthIdx] || parts[1];
        return { day, month, year };
      }
    } catch (e) {}
    return { day: dateStr, month: '', year: '' };
  };

  return (
    <div>
      {/* Page Header / Hero Cover Banner */}
      <div 
        style={{ 
          position: 'relative',
          backgroundImage: `linear-gradient(180deg, rgba(11, 13, 12, 0.78) 0%, rgba(11, 13, 12, 0.92) 100%), url(${IMAGES.evening})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid var(--border-color)', 
          padding: '48px 0 40px 0',
          color: '#FFFFFF'
        }}
      >
        <div className="container relative-z" style={{ maxWidth: '1100px' }}>
          <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
            <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none' }}>Home</Link> / <span style={{ color: 'var(--brand-green)', fontWeight: '600' }}>My Bookings</span>
          </div>

          <span className="section-eyebrow" style={{ backgroundColor: 'rgba(22, 163, 74, 0.25)', color: '#4ADE80', borderColor: 'rgba(74, 222, 128, 0.3)', marginBottom: '8px' }}>
            MY BOOKINGS
          </span>

          <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.02em', margin: '8px 0 6px 0', color: '#FFFFFF', textTransform: 'none' }}>
            Your reserved games, all in one place.
          </h1>

          <p style={{ maxWidth: '600px', fontSize: '15px', color: 'rgba(255, 255, 255, 0.85)', margin: '0 0 24px 0', lineHeight: '1.5' }}>
            View upcoming games, manage reservations, and access your booking details.
          </p>

          {/* Hero Counter Pills */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div className="hero-stat-pill">
              <span className="stat-label">Upcoming</span>
              <span className="stat-value">{String(upcomingCount).padStart(2, '0')}</span>
            </div>
            <div className="hero-stat-pill">
              <span className="stat-label">Completed</span>
              <span className="stat-value">{String(completedCount).padStart(2, '0')}</span>
            </div>
            <div className="hero-stat-pill">
              <span className="stat-label">Cancelled</span>
              <span className="stat-value">{String(cancelledCount).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Workspace */}
      <section style={{ padding: '36px 0 60px 0', backgroundColor: 'var(--bg-primary)', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          
          {/* Tabs Bar */}
          <div className="my-bookings-tabs-wrapper">
            <div className="my-bookings-tabs-nav">
              {[
                { id: 'UPCOMING', count: upcomingCount, label: `Upcoming (${upcomingCount})` },
                { id: 'COMPLETED', count: completedCount, label: `Completed (${completedCount})` },
                { id: 'CANCELLED', count: cancelledCount, label: `Cancelled (${cancelledCount})` },
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
          </div>

          {/* Summary Header above Cards */}
          <div className="bookings-summary-header">
            <div>
              <h2 className="bookings-summary-title">YOUR BOOKINGS</h2>
              <span className="bookings-summary-count">
                {filteredBookings.length} {activeTab.toLowerCase()} {filteredBookings.length === 1 ? 'reservation' : 'reservations'}
              </span>
            </div>
            <button 
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', fontSize: '13px' }}
              onClick={() => navigate('/book')}
            >
              Book Another Slot &rarr;
            </button>
          </div>

          {/* Bookings List / Empty State */}
          {filteredBookings.length === 0 ? (
            <div className="empty-bookings-card">
              <div className="empty-icon-circle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="empty-title">
                {activeTab === 'UPCOMING' && 'NO UPCOMING GAMES'}
                {activeTab === 'COMPLETED' && 'NO COMPLETED BOOKINGS'}
                {activeTab === 'CANCELLED' && 'NO CANCELLED BOOKINGS'}
              </h3>
              <p className="empty-subtitle">
                {activeTab === 'UPCOMING' && "You don't have any upcoming turf reservations."}
                {activeTab === 'COMPLETED' && "You don't have any completed turf reservations."}
                {activeTab === 'CANCELLED' && "No cancelled reservations on record."}
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/book')}>
                Book a Slot &rarr;
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {filteredBookings.map((item) => {
                const dateParts = parseDateParts(item.dateStr);

                return (
                  <div key={item.id} className="booking-card-item">
                    {/* Top Bar: Status & Booking ID */}
                    <div className="booking-card-topbar">
                      <div className={`status-badge-pill ${item.status.toLowerCase()}`}>
                        <span className="status-dot">●</span>
                        <span className="status-text">{item.status}</span>
                      </div>

                      <div className="booking-id-block">
                        <span className="id-label">BOOKING ID</span>
                        <span className="id-value">{item.id}</span>
                        <button 
                          type="button"
                          className="copy-id-btn"
                          title="Copy Booking ID"
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(item.id);
                            }
                            setCopiedId(item.id);
                            setTimeout(() => setCopiedId(null), 2000);
                          }}
                        >
                          {copiedId === item.id ? (
                            <span style={{ fontSize: '11px', color: 'var(--brand-green)', fontWeight: '700' }}>Copied!</span>
                          ) : (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Card Body Grid */}
                    <div className="booking-card-grid">
                      <div className="date-visual-box">
                        <span className="date-box-num">{dateParts.day}</span>
                        <span className="date-box-month">{dateParts.month}</span>
                        <span className="date-box-year">{dateParts.year}</span>
                      </div>

                      <div className="card-details-grid">
                        <div className="info-cell">
                          <span className="cell-label">SPORT</span>
                          <span className="cell-value-primary">{item.sportName || 'Football'}</span>
                          {item.players && <span className="cell-value-sub">{item.players}</span>}
                        </div>

                        <div className="info-cell">
                          <span className="cell-label">TIME</span>
                          <span className="cell-value-primary">{item.startTime}</span>
                          <span className="cell-value-sub">{item.durationMins || 60} mins</span>
                        </div>

                        <div className="info-cell">
                          <span className="cell-label">DURATION</span>
                          <span className="cell-value-primary">{item.durationMins || 60} mins</span>
                        </div>

                        <div className="info-cell">
                          <span className="cell-label">PAYMENT</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                            <span className="cell-value-price">₹{item.amount}</span>
                            <span className="paid-tag">PAID</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="booking-card-actions">
                      <button 
                        className="btn btn-primary btn-view-details" 
                        onClick={() => navigate(`/booking/${item.id}`)}
                      >
                        View Booking Details &rarr;
                      </button>

                      {item.status === 'UPCOMING' && (
                        <div className="card-action-group">
                          <button 
                            className="btn btn-outline btn-reschedule" 
                            onClick={() => setRescheduleBookingTarget(item)}
                          >
                            Reschedule
                          </button>
                          <button 
                            className="btn btn-cancel-action" 
                            onClick={() => setCancelBookingTarget(item)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Bottom CTA Banner */}
              <div className="book-another-banner">
                <div>
                  <h3 className="banner-title">Ready for another game?</h3>
                  <p className="banner-sub">Reserve your next slot at PrimeTurf Arena in seconds.</p>
                </div>
                <button className="btn btn-outline" onClick={() => navigate('/book')}>
                  Book Another Slot &rarr;
                </button>
              </div>
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

