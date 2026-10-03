export const PRICING_DATA = {
  currency: "₹",
  bookingFee: 30,
  slots: [
    {
      id: "morning",
      name: "Morning Slot",
      timeRange: "06:00 AM – 09:00 AM",
      price: 800,
      badge: "Cool Morning",
      description: "Best for early morning fitness matches & practice sessions."
    },
    {
      id: "regular",
      name: "Regular Day",
      timeRange: "09:00 AM – 05:00 PM",
      price: 1000,
      badge: "Best Value",
      description: "Standard daytime availability for casual games & tournaments."
    },
    {
      id: "evening",
      name: "Prime Evening",
      timeRange: "05:00 PM – 11:00 PM",
      price: 1200,
      badge: "Most Popular",
      description: "Floodlit prime time slots under high-lux LED lights."
    }
  ]
};

export function getSlotPrice(timeString) {
  if (!timeString) return 1000;
  
  // Extract hour
  const match = timeString.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 1000;

  let hour = parseInt(match[1], 10);
  const period = match[3].toUpperCase();

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  if (hour >= 6 && hour < 9) return PRICING_DATA.slots[0].price;
  if (hour >= 9 && hour < 17) return PRICING_DATA.slots[1].price;
  return PRICING_DATA.slots[2].price;
}
