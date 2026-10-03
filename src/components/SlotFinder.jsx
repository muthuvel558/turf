import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import DateSelector from './DateSelector';
import TimeSlot from './TimeSlot';
import { generateDynamicSlots } from '../data/slots';
import { StoreManager } from '../data/store';

export default function SlotFinder() {
  const navigate = useNavigate();
  const facility = StoreManager.getFacility();
  const activeSports = facility.sports.filter(s => s.active);

  const [selectedSport, setSelectedSport] = useState(activeSports[0]?.id || 'football');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDuration, setSelectedDuration] = useState(60); // 60, 90, 120
  const [selectedSlot, setSelectedSlot] = useState(null);

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const dateFormatted = format(selectedDate, 'EEE, dd MMM');

  // Fetch live store data
  const bookings = StoreManager.getBookings();
  const blockedSlots = StoreManager.getBlockedSlots();

  // Generate dynamic slots based on selected duration and live store bookings
  const allSlots = useMemo(() => {
    return generateDynamicSlots(selectedDateStr, selectedDuration, bookings, blockedSlots);
  }, [selectedDateStr, selectedDuration, bookings, blockedSlots]);

  // Preview 8 slots for compact homepage view
  const previewSlots = useMemo(() => {
    return allSlots.slice(0, 8);
  }, [allSlots]);

  // Find next available slot shortcut
  const nextAvailableSlot = useMemo(() => {
    return allSlots.find(s => s.status === 'AVAILABLE');
  }, [allSlots]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleDurationChange = (mins) => {
    setSelectedDuration(mins);
    setSelectedSlot(null);
  };

  const handleProceedToBook = (slotToUse = selectedSlot) => {
    if (!slotToUse) return;
    navigate('/book', {
      state: {
        sport: selectedSport,
        date: selectedDateStr,
        durationMins: selectedDuration,
        slot: slotToUse
      }
    });
  };

  return (
    <section className="slot-finder-section" id="slot-finder">
      <div className="container">
        
        {/* Booking Section Header */}
        <div className="booking-header text-center">
          <span className="section-eyebrow">LIVE AVAILABILITY</span>
          <h2 className="booking-title">BOOK YOUR GAME</h2>
          <p className="booking-subtitle">Choose your sport, date and preferred time.</p>
        </div>

        {/* 2-Column Split Booking Surface: Left 65% | Right 35% */}
        <div className="booking-workspace-grid">
          
          {/* LEFT COLUMN: Selection Flow (65%) */}
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
                <span className="live-badge">Real-time</span>
              </div>

              <div className="time-slots-grid">
                {previewSlots.map((slot) => (
                  <TimeSlot
                    key={slot.id}
                    slot={slot}
                    isSelected={selectedSlot?.id === slot.id}
                    onSelectSlot={setSelectedSlot}
                  />
                ))}
              </div>

              {/* Next Available Shortcut Banner */}
              {nextAvailableSlot && !selectedSlot && (
                <div className="next-available-banner">
                  <div className="next-available-info">
                    <span className="next-tag">NEXT AVAILABLE</span>
                    <span className="next-slot-text">{nextAvailableSlot.time} · ₹{nextAvailableSlot.totalPrice}</span>
                  </div>
                  <button 
                    type="button" 
                    className="btn-next-book"
                    onClick={() => { setSelectedSlot(nextAvailableSlot); }}
                  >
                    SELECT THIS SLOT
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Booking Summary Panel (35%) */}
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
                  <span className="detail-label">Selected Slot</span>
                  <span className={`detail-value ${selectedSlot ? 'selected-slot-highlight' : 'muted-text'}`}>
                    {selectedSlot ? selectedSlot.time : 'Not selected'}
                  </span>
                </div>
              </div>

              <div className="summary-divider" />

              <div className="summary-price-row">
                <span className="price-label">Estimated Price</span>
                <span className="price-amount">
                  {selectedSlot ? `₹${selectedSlot.totalPrice.toLocaleString()}` : '—'}
                </span>
              </div>

              <button
                type="button"
                className={`btn btn-primary btn-full-width ${!selectedSlot ? 'disabled-cta' : ''}`}
                disabled={!selectedSlot}
                onClick={() => handleProceedToBook()}
              >
                {selectedSlot ? 'CONTINUE TO BOOKING →' : 'SELECT A SLOT'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
