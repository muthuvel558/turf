export const VENUE_INFO = {
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
    { id: "football", name: "Football (5-a-side / 7-a-side)", icon: "football" },
    { id: "cricket", name: "Turf Cricket", icon: "cricket" }
  ],
  turfSpecs: [
    { title: "Sport Formats", value: "5-a-side & 7-a-side Football, Box Cricket" },
    { title: "Pitch Dimensions", value: "100 ft × 60 ft Enclosed Turf Arena" },
    { title: "Surface Quality", value: "50mm Mono-filament Synthetic Grass with Rubber Infill" },
    { title: "Lighting System", value: "High-Lux Anti-Glare LED Floodlights" },
    { title: "Perimeter", value: "Heavy-Duty Overhead & Side Safety Netting" },
    { title: "Slot Duration", value: "60-Minute Increments (Multi-slot booking supported)" }
  ],
  amenities: [
    { name: "Artificial Turf", desc: "50mm high-density synthetic turf with shock absorption." },
    { name: "LED Floodlights", desc: "Bright evenly distributed lighting for night matches." },
    { name: "Changing Room", desc: "Clean, ventilated player changing space." },
    { name: "Washroom", desc: "Hygienic restrooms cleaned regularly." },
    { name: "Parking Available", desc: "Dedicated parking area for bikes and cars." },
    { name: "Drinking Water", desc: "Filtered cold water refills on-site." },
    { name: "Safety Netting", desc: "Enclosed perimeter netting preventing ball loss." },
    { name: "First Aid Kit", desc: "Basic medical & ice-pack kit at reception." }
  ],
  rules: [
    "Appropriate sports shoes or turf boots required. Flat rubber studs allowed. Metal spikes strictly prohibited.",
    "Please report 10 minutes prior to your allocated slot start time.",
    "Food, chewing gum, and glass bottles are not allowed inside the turf playing area.",
    "Please respect slot end times so the next group can begin promptly."
  ],
  cancellationPolicy: {
    rescheduleWindow: "Up to 4 hours before slot start time",
    refundPolicy: "Full refund as wallet credit or 90% monetary refund if cancelled 6+ hours before start time.",
    lateCancellation: "Non-refundable if cancelled less than 4 hours before start time."
  }
};
