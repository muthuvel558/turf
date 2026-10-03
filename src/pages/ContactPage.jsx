import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Location from '../components/Location';
import { StoreManager } from '../data/store';
import { IMAGES } from '../data/images';

export default function ContactPage() {
  const facility = StoreManager.getFacility();
  const [formSent, setFormSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setContactForm({ name: '', phone: '', message: '' });
      alert('Thank you! Your message has been sent to reception.');
    }, 1000);
  };

  return (
    <div>
      {/* Page Header / Hero Cover Banner */}
      <div 
        style={{ 
          position: 'relative',
          backgroundImage: `linear-gradient(180deg, rgba(11, 13, 12, 0.75) 0%, rgba(11, 13, 12, 0.90) 100%), url(${IMAGES.facility})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid var(--border-color)', 
          padding: '84px 0 76px 0',
          color: '#FFFFFF'
        }}
      >
        <div className="container relative-z">
          <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
            <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none' }}>Home</Link> / <span style={{ color: 'var(--brand-green)', fontWeight: '600' }}>Contact</span>
          </div>
          <span className="section-eyebrow" style={{ backgroundColor: 'rgba(22, 163, 74, 0.25)', color: '#4ADE80', borderColor: 'rgba(74, 222, 128, 0.3)' }}>LOCATION & CONTACT</span>
          <h1 style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-0.02em', margin: '12px 0', textTransform: 'uppercase', color: '#FFFFFF' }}>
            FIND PRIMETURF ARENA
          </h1>
          <p className="lead" style={{ maxWidth: '640px', fontSize: '18px', color: 'rgba(255, 255, 255, 0.85)' }}>
            Get directions, view operating hours, or get in touch with our ground reception staff.
          </p>
        </div>
      </div>

      {/* Location Component */}
      <Location />

      {/* Contact Form & Parking Guide */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            
            {/* Contact Form */}
            <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border-color)', padding: '32px', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.name} 
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="form-input" 
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={contactForm.phone} 
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="form-input" 
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Inquiry</label>
                  <textarea 
                    rows={4}
                    value={contactForm.message} 
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="form-input" 
                    placeholder="Ask about bulk tournament bookings, coaching, or slot availability"
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={formSent}>
                  {formSent ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </div>

            {/* Parking & Access Guide */}
            <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border-color)', padding: '32px', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Getting Here & Parking Guide</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <div>
                  <strong>Landmark:</strong> Located 200m off Central Ring Flyover, right behind Arena Zone complex.
                </div>
                <div>
                  <strong>Car Parking:</strong> Dedicated ground parking for 15+ cars directly in front of reception.
                </div>
                <div>
                  <strong>Two-Wheeler Parking:</strong> Covered bike parking bay next to player changing rooms.
                </div>
                <div>
                  <strong>Ground Phone:</strong> {facility.phone}
                </div>
                <div>
                  <strong>WhatsApp Inquiry:</strong> {facility.whatsapp}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-box text-center">
            <span className="section-eyebrow" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>COME PLAY</span>
            <h2 className="section-title" style={{ fontSize: '36px', textTransform: 'uppercase', marginTop: '12px' }}>
              READY TO PLAY?
            </h2>
            <p className="lead">Check live availability and book your slot now.</p>
            <Link to="/book" className="btn btn-primary" style={{ marginTop: '16px' }}>
              Book Your Slot &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
