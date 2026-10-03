import { format } from 'date-fns';

const LOCAL_STORAGE_KEY = 'primeturf_store_v1';

const INITIAL_FACILITY = {
  name: "PrimeTurf Arena",
  tagline: "Your Game. Your Time. Your Turf.",
  description: "Book your football or cricket turf slot in a few simple steps. Check availability, choose your time, and get ready to play.",
  address: "Plot 42, Sports Enclave Road, Near Central Ring Flyover, Arena Zone",
  city: "City Center",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "bookings@primeturfarena.com",
  operatingHours: "06:00 AM – 11:00 PM Daily",
  sports: [
    { id: "football", name: "Football (5-a-side / 7-a-side)", active: true },
    { id: "cricket", name: "Box Cricket", active: true }
  ],
  turfSpecs: [
    { title: "Sport Formats", value: "5-a-side & 7-a-side Football, Box Cricket" },
    { title: "Pitch Dimensions", value: "100 ft × 60 ft Enclosed Turf Arena" },
    { title: "Surface Quality", value: "50mm Mono-filament Synthetic Grass with Rubber Infill" },
    { title: "Lighting System", value: "High-Lux Anti-Glare LED Floodlights" },
    { title: "Perimeter", value: "Heavy-Duty Overhead & Side Safety Netting" },
    { title: "Slot Duration", value: "60 / 90 / 120 Minutes" }
  ]
};

const INITIAL_PRICING = {
  morningPrice: 800,
  regularPrice: 1000,
  eveningPrice: 1200,
  bookingFee: 30,
  weekendMultiplier: 1.1
};

const INITIAL_AMENITIES = [
  { id: "turf", name: "Artificial Turf", desc: "50mm high-density synthetic turf with shock absorption.", active: true },
  { id: "lights", name: "LED Floodlights", desc: "Bright evenly distributed lighting for night matches.", active: true },
  { id: "changing", name: "Changing Room", desc: "Clean, ventilated player changing space.", active: true },
  { id: "washroom", name: "Washroom", desc: "Hygienic restrooms cleaned regularly.", active: true },
  { id: "parking", name: "Parking Available", desc: "Dedicated parking area for bikes and cars.", active: true },
  { id: "water", name: "Drinking Water", desc: "Filtered cold water refills on-site.", active: true },
  { id: "netting", name: "Safety Netting", desc: "Enclosed perimeter netting preventing ball loss.", active: true },
  { id: "firstaid", name: "First Aid Kit", desc: "Basic medical & ice-pack kit at reception.", active: true }
];

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Vikram R.",
    sport: "Football 7-a-side",
    rating: 5,
    date: "2 weeks ago",
    comment: "The LED floodlights are amazing. Play here every Tuesday evening with my office team. Turf grass quality is soft and easy on knees.",
    approved: true
  },
  {
    id: 2,
    name: "Arjun K.",
    sport: "Box Cricket",
    rating: 5,
    date: "1 month ago",
    comment: "Super smooth online slot booking. Show up 5 mins before, pitch is ready and floodlit. Clean washrooms as well.",
    approved: true
  },
  {
    id: 3,
    name: "Rahul S.",
    sport: "Football 5-a-side",
    rating: 4,
    date: "3 weeks ago",
    comment: "Great location with ample parking. Netting keeps the ball in play at all times. Highly recommend evening slots.",
    approved: true
  }
];

const INITIAL_BOOKINGS = [
  {
    id: "PT-20260928-101",
    sportId: "football",
    sportName: "Football (5-a-side / 7-a-side)",
    dateStr: format(new Date(), 'yyyy-MM-dd'),
    startTime: "07:00 PM",
    durationMins: 60,
    amount: 1230,
    customerName: "Vikram Sharma",
    phone: "9876543210",
    email: "vikram@example.com",
    players: "7-v-7",
    status: "UPCOMING",
    createdAt: new Date().toISOString()
  }
];

const INITIAL_BLOCKED_SLOTS = [
  {
    id: "block-001",
    dateStr: format(new Date(), 'yyyy-MM-dd'),
    startTime: "02:00 PM",
    endTime: "03:00 PM",
    reason: "Routine Surface Cleaning"
  }
];

function loadStore() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to load store from localStorage", err);
  }
  return {
    facility: INITIAL_FACILITY,
    pricing: INITIAL_PRICING,
    amenities: INITIAL_AMENITIES,
    reviews: INITIAL_REVIEWS,
    bookings: INITIAL_BOOKINGS,
    blockedSlots: INITIAL_BLOCKED_SLOTS,
  };
}

function saveStore(storeData) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storeData));
  } catch (err) {
    console.error("Failed to save store to localStorage", err);
  }
}

export class StoreManager {
  static getStore() {
    return loadStore();
  }

  static getFacility() {
    return loadStore().facility;
  }

  static updateFacility(newFacility) {
    const store = loadStore();
    store.facility = { ...store.facility, ...newFacility };
    saveStore(store);
    return store.facility;
  }

  static getPricing() {
    return loadStore().pricing;
  }

  static updatePricing(newPricing) {
    const store = loadStore();
    store.pricing = { ...store.pricing, ...newPricing };
    saveStore(store);
    return store.pricing;
  }

  static getAmenities() {
    return loadStore().amenities;
  }

  static updateAmenities(newAmenities) {
    const store = loadStore();
    store.amenities = newAmenities;
    saveStore(store);
    return store.amenities;
  }

  static getReviews() {
    return loadStore().reviews;
  }

  static addReview(review) {
    const store = loadStore();
    const newReview = { id: Date.now(), ...review, approved: false };
    store.reviews = [newReview, ...store.reviews];
    saveStore(store);
    return store.reviews;
  }

  static toggleReviewApproval(id) {
    const store = loadStore();
    store.reviews = store.reviews.map(r => r.id === id ? { ...r, approved: !r.approved } : r);
    saveStore(store);
    return store.reviews;
  }

  static deleteReview(id) {
    const store = loadStore();
    store.reviews = store.reviews.filter(r => r.id !== id);
    saveStore(store);
    return store.reviews;
  }

  static getBookings() {
    return loadStore().bookings;
  }

  static createBooking(bookingData) {
    const store = loadStore();
    const newBooking = {
      id: 'PT-' + format(new Date(), 'yyyyMMdd') + '-' + Math.floor(100 + Math.random() * 900),
      status: 'UPCOMING',
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    store.bookings = [newBooking, ...store.bookings];
    saveStore(store);
    return newBooking;
  }

  static updateBookingStatus(id, status) {
    const store = loadStore();
    store.bookings = store.bookings.map(b => b.id === id ? { ...b, status } : b);
    saveStore(store);
    return store.bookings;
  }

  static rescheduleBooking(id, newDateStr, newTime) {
    const store = loadStore();
    store.bookings = store.bookings.map(b => b.id === id ? { ...b, dateStr: newDateStr, startTime: newTime, status: 'UPCOMING' } : b);
    saveStore(store);
    return store.bookings;
  }

  static getBlockedSlots() {
    return loadStore().blockedSlots;
  }

  static blockSlot(blockData) {
    const store = loadStore();
    const newBlock = { id: 'block-' + Date.now(), ...blockData };
    store.blockedSlots = [newBlock, ...store.blockedSlots];
    saveStore(store);
    return store.blockedSlots;
  }

  static unblockSlot(id) {
    const store = loadStore();
    store.blockedSlots = store.blockedSlots.filter(b => b.id !== id);
    saveStore(store);
    return store.blockedSlots;
  }

  // Dynamic Price Calculation
  static calculatePrice(timeStr, durationMins = 60) {
    const pricing = loadStore().pricing;
    let baseRate = pricing.regularPrice;

    if (timeStr) {
      const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (match) {
        let hour = parseInt(match[1], 10);
        const period = match[3].toUpperCase();
        if (period === 'PM' && hour !== 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;

        if (hour >= 6 && hour < 9) baseRate = pricing.morningPrice;
        else if (hour >= 17 && hour <= 23) baseRate = pricing.eveningPrice;
      }
    }

    const durationFactor = durationMins / 60;
    const slotPrice = Math.round(baseRate * durationFactor);
    const bookingFee = pricing.bookingFee;
    const total = slotPrice + bookingFee;

    return {
      baseRate,
      slotPrice,
      bookingFee,
      total
    };
  }
}
