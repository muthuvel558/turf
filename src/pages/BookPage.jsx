import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import DateSelector from '../components/DateSelector';
import TimeSlot from '../components/TimeSlot';
import BookingConfirmationOverlay from '../components/BookingConfirmationOverlay';
import { generateDynamicSlots } from '../data/slots';
import { StoreManager } from '../data/store';
import { IMAGES } from '../data/images';

export default function BookPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const facility = StoreManager.getFacility();
  const activeSports = facility.sports.filter(s => s.active);

  // Initial state passed from homepage/nav or defaults
  const initialState = location.state || {};

  const [selectedSport, setSelectedSport] = useState(initialState.sport || activeSports[0]?.id || 'football');
  
  const [selectedDate, setSelectedDate] = useState(() => {
    if (initialState.date) {
      return typeof initialState.date === 'string' ? parseISO(initialState.date) : new Date(initialState.date);
    }
    return new Date();
  });

  const [selectedDuration, setSelectedDuration] = useState(initialState.durationMins || 60);
  const [selectedSlot, setSelectedSlot] = useState(initialState.slot || null);

  // Customer Details Form State & Validation
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const dateFormatted = format(selectedDate, 'dd MMM yyyy');

  // Load live store bookings and blocked slots
  const bookings = StoreManager.getBookings();
  const blockedSlots = StoreManager.getBlockedSlots();

  // Generate dynamic slots based on duration & live bookings
  const slots = useMemo(() => {
    return generateDynamicSlots(selectedDateStr, selectedDuration, bookings, blockedSlots);
  }, [selectedDateStr, selectedDuration, bookings, blockedSlots]);

  // Keep selected slot in sync if date/duration changes
  useEffect(() => {
    if (selectedSlot) {
      const match = slots.find(s => s.startTime === selectedSlot.startTime && s.status === 'AVAILABLE');
      if (match) {
        setSelectedSlot(match);
      } else {
        setSelectedSlot(null);
      }
    }
  }, [selectedDateStr, selectedDuration]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setErrors(prev => ({ ...prev, slot: null }));
  };

  const handleDurationChange = (mins) => {
    setSelectedDuration(mins);
    setSelectedSlot(null);
    setErrors(prev => ({ ...prev, slot: null }));
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setErrors(prev => ({ ...prev, slot: null }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleConfirmBooking = () => {
    const newErrors = {};
    if (!selectedSlot) newErrors.slot = 'Please select an available time slot to confirm your booking.';
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!/^[0-9]{10}$/.test(formData.phone.trim())) newErrors.phone = 'Please enter a valid 10-digit mobile number.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newBooking = StoreManager.createBooking({
        sportId: selectedSport,
        sportName: selectedSport === 'football' ? 'Football (5-a-side / 7-a-side)' : 'Box Cricket',
        dateStr: selectedDateStr,
        startTime: selectedSlot.time,
        durationMins: selectedDuration,
        amount: selectedSlot.totalPrice,
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        players: '5-v-5',
      });

      setConfirmedBooking(newBooking);
    }, 1000);
  };

  return (
    <div className="booking-page-root">
      {/* Page Header / Hero Cover Banner */}
      <div 
        style={{ 
          position: 'relative',
          backgroundImage: `linear-gradient(180deg, rgba(11, 13, 12, 0.75) 0%, rgba(11, 13, 12, 0.90) 100%), url(${IMAGES.turfHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid var(--border-color)', 
          padding: '64px 0 56px 0',
          color: '#FFFFFF'
        }}
      >
        <div className="container relative-z">
          <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
            <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none' }}>Home</Link> / <span style={{ color: 'var(--brand-green)', fontWeight: '600' }}>Book</span>
          </div>
          <span className="section-eyebrow" style={{ backgroundColor: 'rgba(22, 163, 74, 0.25)', color: '#4ADE80', borderColor: 'rgba(74, 222, 128, 0.3)' }}>INSTANT RESERVATION</span>
          <h1 style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-0.02em', margin: '12px 0', textTransform: 'uppercase', color: '#FFFFFF' }}>
            BOOK YOUR SLOT
          </h1>
          <p className="lead" style={{ maxWidth: '640px', fontSize: '17px', color: 'rgba(255, 255, 255, 0.85)' }}>
            Select your game mode, choose your date, pick a time slot and confirm your reservation on one continuous page.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 0 64px 0' }}>

        {/* Single-Page Continuous Workspace */}
        <div className="booking-workspace-grid">
          
          {/* LEFT COLUMN: Main Selection & Details (65%) */}
          <div className="booking-left-surface">
            
            {/* 01. SPORT */}
            <div className="booking-form-row">
              <label className="field-section-label">01. SPORT</label>
              <div className="sport-segmented-control">
                <button
                  type="button"
                  className={`sport-btn ${selectedSport === 'football' ? 'active' : ''}`}
                  onClick={() => { setSelectedSport('football'); setSelectedSlot(null); }}
                >
                  Football
                </button>
                <button
                  type="button"
                  className={`sport-btn ${selectedSport === 'cricket' ? 'active' : ''}`}
                  onClick={() => { setSelectedSport('cricket'); setSelectedSlot(null); }}
                >
                  Box Cricket
                </button>
              </div>
            </div>

            <div className="booking-divider" />

            {/* 02. DURATION */}
            <div className="booking-form-row">
              <div className="row-header">
                <label className="field-section-label">02. DURATION</label>
                <span className="field-hint-text">Windows update automatically</span>
              </div>
              <div className="duration-segmented-control">
                {[60, 90, 120].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    className={`duration-btn ${selectedDuration === mins ? 'active' : ''}`}
                    onClick={() => handleDurationChange(mins)}
                  >
                    {mins} mins
                  </button>
                ))}
              </div>
            </div>

            <div className="booking-divider" />

            {/* 03. DATE */}
            <div className="booking-form-row">
              <label className="field-section-label">03. DATE</label>
              <DateSelector 
                selectedDate={selectedDate} 
                onSelectDate={handleDateChange} 
              />
            </div>

            <div className="booking-divider" />

            {/* 04. AVAILABLE TIME SLOTS */}
            <div className="booking-form-row">
              <div className="slots-header-row">
                <label className="field-section-label">04. AVAILABLE TIME SLOTS</label>
                <span className="live-badge">Real-time slots</span>
              </div>

              <div className="time-slots-grid">
                {slots.map((slot) => (
                  <TimeSlot
                    key={slot.id}
                    slot={slot}
                    isSelected={selectedSlot?.id === slot.id}
                    onSelectSlot={handleSlotSelect}
                  />
                ))}
              </div>

              {errors.slot && (
                <div className="inline-validation-error">
                  {errors.slot}
                </div>
              )}
            </div>

            {/* MOBILE ONLY INLINE SUMMARY */}
            <div className="mobile-only-summary-section">
              <div className="booking-divider" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px', fontWeight: '700' }}>
                <span>Total Amount:</span>
                <span style={{ color: 'var(--brand-green)', fontSize: '18px' }}>
                  {selectedSlot ? `₹${selectedSlot.totalPrice.toLocaleString()}` : '—'}
                </span>
              </div>
            </div>

            <div className="booking-divider" />

            {/* 05. CUSTOMER DETAILS */}
            <div className="booking-form-row">
              <label className="field-section-label">05. CUSTOMER DETAILS</label>
              
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name" 
                  className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                />
                {errors.fullName && <span className="field-error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number" 
                  className={`form-input ${errors.phone ? 'has-error' : ''}`}
                />
                {errors.phone && <span className="field-error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address (Optional)</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="For instant booking receipt & notification" 
                  className="form-input"
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Booking Summary Panel (35% on Desktop) */}
          <div className="booking-right-surface">
            <div className="summary-panel">
              <h3 className="summary-panel-title">YOUR BOOKING</h3>
              
              <div className="summary-facility-meta">
                <div className="facility-name">{facility.name}</div>
                <div className="facility-pitch">Main Pitch</div>
              </div>

              <div className="summary-details-list">
                <div className="summary-detail-row">
                  <span className="detail-label">Sport</span>
                  <span className="detail-value">{selectedSport === 'football' ? 'Football' : 'Box Cricket'}</span>
                </div>
                <div className="summary-detail-row">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">{dateFormatted}</span>
                </div>
                <div className="summary-detail-row">
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">{selectedDuration} mins</span>
                </div>
                <div className="summary-detail-row">
                  <span className="detail-label">Time</span>
                  <span className={`detail-value ${selectedSlot ? 'selected-slot-highlight' : 'muted-text'}`}>
                    {selectedSlot ? selectedSlot.time : 'Not selected'}
                  </span>
                </div>
              </div>

              <div className="summary-divider" />

              <div className="summary-price-row">
                <span className="price-label">Price</span>
                <span className="price-amount">
                  {selectedSlot ? `₹${selectedSlot.totalPrice.toLocaleString()}` : '—'}
                </span>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-full-width"
                disabled={isProcessing}
                onClick={handleConfirmBooking}
              >
                {isProcessing ? 'Confirming...' : 'CONFIRM BOOKING →'}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* BOOKING CONFIRMATION OVERLAY WINDOW */}
      {confirmedBooking && (
        <BookingConfirmationOverlay
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
        />
      )}
    </div>
  );
}
