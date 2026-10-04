// Dynamic Slot Windows & Pricing Category Utilities

export function timeToMins(timeStr) {
  if (!timeStr) return 0;
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

export function minsToTimeStr(mins) {
  let h = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  const hh = h < 10 ? `0${h}` : `${h}`;
  const mm = m < 10 ? `0${m}` : `${m}`;
  return `${hh}:${mm} ${period}`;
}

export const PRICING_PERIODS = {
  all: {
    id: 'all',
    name: 'All Hours',
    timeRange: '06:00 AM – 11:00 PM',
    startMins: 0,
    endMins: 1440,
    ratePerHour: 1000
  },
  morning: {
    id: 'morning',
    name: 'Morning Slot',
    timeRange: '06:00 AM – 09:00 AM',
    startMins: 360,
    endMins: 540,
    ratePerHour: 800
  },
  regular: {
    id: 'regular',
    name: 'Regular Day',
    timeRange: '09:00 AM – 05:00 PM',
    startMins: 540,
    endMins: 1020,
    ratePerHour: 1000
  },
  evening: {
    id: 'evening',
    name: 'Prime Evening',
    timeRange: '05:00 PM – 11:00 PM',
    startMins: 1020,
    endMins: 1380,
    ratePerHour: 1200
  }
};

export function getPriceCategoryForMins(startMins) {
  // Morning Off-Peak: 06:00 AM - 09:00 AM
  if (startMins >= 360 && startMins < 540) {
    return { ratePerHour: 800, priceType: 'OFF-PEAK' };
  }
  // Regular Day: 09:00 AM - 05:00 PM
  if (startMins >= 540 && startMins < 1020) {
    return { ratePerHour: 1000, priceType: 'REGULAR' };
  }
  // Peak Evening: 05:00 PM - 11:00 PM
  return { ratePerHour: 1200, priceType: 'PEAK' };
}

export const SLOT_WINDOWS = {
  60: [
    { start: 360, end: 420 },   // 06:00 AM - 07:00 AM
    { start: 420, end: 480 },   // 07:00 AM - 08:00 AM
    { start: 480, end: 540 },   // 08:00 AM - 09:00 AM
    { start: 540, end: 600 },   // 09:00 AM - 10:00 AM
    { start: 600, end: 660 },   // 10:00 AM - 11:00 AM
    { start: 960, end: 1020 },  // 04:00 PM - 05:00 PM
    { start: 1020, end: 1080 }, // 05:00 PM - 06:00 PM
    { start: 1080, end: 1140 }, // 06:00 PM - 07:00 PM
    { start: 1140, end: 1200 }, // 07:00 PM - 08:00 PM
    { start: 1200, end: 1260 }, // 08:00 PM - 09:00 PM
    { start: 1260, end: 1320 }, // 09:00 PM - 10:00 PM
    { start: 1320, end: 1380 }, // 10:00 PM - 11:00 PM
  ],
  90: [
    { start: 360, end: 450 },   // 06:00 AM - 07:30 AM
    { start: 450, end: 540 },   // 07:30 AM - 09:00 AM
    { start: 540, end: 630 },   // 09:00 AM - 10:30 AM
    { start: 960, end: 1050 },  // 04:00 PM - 05:30 PM
    { start: 1050, end: 1140 }, // 05:30 PM - 07:00 PM
    { start: 1140, end: 1230 }, // 07:00 PM - 08:30 PM
    { start: 1230, end: 1320 }, // 08:30 PM - 10:00 PM
  ],
  120: [
    { start: 360, end: 480 },   // 06:00 AM - 08:00 AM
    { start: 480, end: 600 },   // 08:00 AM - 10:00 AM
    { start: 960, end: 1080 },  // 04:00 PM - 06:00 PM
    { start: 1080, end: 1200 }, // 06:00 PM - 08:00 PM
    { start: 1200, end: 1320 }, // 08:00 PM - 10:00 PM
  ]
};

export const HOURLY_TIMES = SLOT_WINDOWS[60].map(w => `${minsToTimeStr(w.start)} - ${minsToTimeStr(w.end)}`);

export function generateDynamicSlots(dateStr, durationMins = 60, bookings = [], blockedSlots = [], pricingPeriod = 'all') {
  let windows = SLOT_WINDOWS[durationMins] || SLOT_WINDOWS[60];

  if (pricingPeriod && PRICING_PERIODS[pricingPeriod] && pricingPeriod !== 'all') {
    const { startMins, endMins } = PRICING_PERIODS[pricingPeriod];
    windows = windows.filter(w => w.start >= startMins && w.start < endMins);
  }

  return windows.map((w) => {
    const startTimeStr = minsToTimeStr(w.start);
    const endTimeStr = minsToTimeStr(w.end);
    const displayTime = `${startTimeStr} – ${endTimeStr}`;
    const { ratePerHour, priceType } = getPriceCategoryForMins(w.start);
    const totalPrice = Math.round(ratePerHour * (durationMins / 60));

    // Check overlap with existing customer bookings
    const isBooked = bookings.some(b => {
      if (b.dateStr !== dateStr || b.status === 'CANCELLED') return false;
      const bStart = timeToMins(b.startTime.split(' – ')[0] || b.startTime.split(' - ')[0]);
      const bDuration = b.durationMins || 60;
      const bEnd = bStart + bDuration;
      return (w.start < bEnd && w.end > bStart);
    });

    // Check overlap with blocked slots
    const isBlocked = blockedSlots.some(b => {
      if (b.dateStr !== dateStr) return false;
      const bStart = timeToMins(b.startTime.split(' – ')[0] || b.startTime.split(' - ')[0]);
      const bEnd = b.endTime ? timeToMins(b.endTime) : bStart + 60;
      return (w.start < bEnd && w.end > bStart);
    });

    let status = 'AVAILABLE';
    if (isBooked) status = 'BOOKED';
    else if (isBlocked) status = 'BLOCKED';

    return {
      id: `slot-${dateStr}-${w.start}-${w.end}`,
      startTime: startTimeStr,
      endTime: endTimeStr,
      time: displayTime,
      durationMins,
      ratePerHour,
      priceType,
      totalPrice,
      status
    };
  });
}
