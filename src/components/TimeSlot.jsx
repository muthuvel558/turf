import React from 'react';

export default function TimeSlot({ slot, isSelected, onSelectSlot }) {
  const { time, totalPrice, priceType, status } = slot;
  const isAvailable = status === 'AVAILABLE';

  return (
    <button
      type="button"
      disabled={!isAvailable}
      onClick={() => isAvailable && onSelectSlot(slot)}
      className={`slot-card ${status.toLowerCase()} ${isSelected ? 'selected' : ''}`}
    >
      <div className="slot-time-row">
        {isSelected && <span className="slot-check-icon">✓</span>}
        <span className="slot-time">{time}</span>
      </div>
      
      <div className="slot-price-info">
        ₹{totalPrice.toLocaleString()} {priceType ? `· ${priceType}` : ''}
      </div>

      <span className="slot-status-tag">
        {isSelected ? 'SELECTED' : status}
      </span>
    </button>
  );
}
