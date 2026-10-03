import React from 'react';
import { format, addDays, isSameDay, isToday, isTomorrow } from 'date-fns';

export default function DateSelector({ selectedDate, onSelectDate }) {
  const dates = Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i));

  return (
    <div className="date-selector-wrapper">
      <div className="date-selector-grid">
        {dates.map((dateObj, i) => {
          const isSelected = isSameDay(dateObj, selectedDate);
          let badge = null;
          if (isToday(dateObj)) badge = "TODAY";
          else if (isTomorrow(dateObj)) badge = "TOMORROW";

          return (
            <button
              key={i}
              type="button"
              className={`date-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectDate(dateObj)}
            >
              {badge && <span className="date-badge">{badge}</span>}
              <span className="date-day">{format(dateObj, 'EEE')}</span>
              <span className="date-num">{format(dateObj, 'dd')}</span>
              <span className="date-month">{format(dateObj, 'MMM')}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
