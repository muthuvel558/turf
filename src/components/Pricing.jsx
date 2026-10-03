import React from 'react';
import { StoreManager } from '../data/store';

export default function Pricing() {
  const pricing = StoreManager.getPricing();

  const plans = [
    { 
      id: "morning", 
      name: "Morning Slot", 
      timeRange: "06:00 AM – 09:00 AM", 
      price: pricing.morningPrice, 
      badge: "Cool Morning", 
      description: "Best for early morning fitness matches & practice sessions." 
    },
    { 
      id: "regular", 
      name: "Regular Day", 
      timeRange: "09:00 AM – 05:00 PM", 
      price: pricing.regularPrice, 
      badge: "Best Value", 
      description: "Standard daytime availability for casual games & tournaments." 
    },
    { 
      id: "evening", 
      name: "Prime Evening", 
      timeRange: "05:00 PM – 11:00 PM", 
      price: pricing.eveningPrice, 
      badge: "Most Popular", 
      description: "Floodlit prime time slots under high-lux LED lights." 
    }
  ];

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">TRANSPARENT PRICING</span>
          <h2 className="section-title">Hourly Booking Rates</h2>
          <p className="lead">Simple per-hour pricing. No hidden registration or facility charges.</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => {
            const isFeatured = plan.id === 'regular';
            return (
              <div 
                key={plan.id} 
                className={`pricing-card ${isFeatured ? 'featured' : ''}`}
              >
                {isFeatured && <span className="featured-badge">{plan.badge}</span>}
                <div className="pricing-title">{plan.name}</div>
                <div className="pricing-time">{plan.timeRange}</div>
                <div className="pricing-amount">
                  ₹{plan.price} <span>/ hour</span>
                </div>
                <div className="pricing-desc">{plan.description}</div>
                
                <a 
                  href="#slot-finder" 
                  className={`btn ${isFeatured ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%' }}
                >
                  Book This Slot &rarr;
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
