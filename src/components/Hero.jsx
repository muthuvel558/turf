import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../data/images';

export default function Hero() {
  useEffect(() => {
    const handleScroll = () => {
      const heroImg = document.querySelector('.hero-bg-img');
      if (heroImg && window.scrollY < 800) {
        heroImg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero-section" id="hero">
      {/* Real Artificial Turf Photograph Background */}
      <img 
        src={IMAGES.droneHero} 
        alt="Real Floodlit Artificial Football Turf Pitch at PrimeTurf Arena" 
        className="hero-bg-img"
      />

      <div className="container relative-z">
        <div className="hero-content-wrapper">
          {/* Headline, Brand Message & Trust Bar */}
          <div className="hero-left-col">
            <div className="hero-eyebrow">
              PRIME TURF ARENA · MAIN PITCH
            </div>

            <h1 className="hero-title">
              YOUR GAME.<br />
              <span className="hero-highlight-green">YOUR TIME.</span><br />
              YOUR TURF.
            </h1>

            <p className="hero-description">
              Check today's availability, choose your slot, and book the pitch instantly.
            </p>

            <div className="hero-actions">
              <Link to="/book" className="btn btn-primary btn-hero-cta">
                Book Your Slot &rarr;
              </Link>

              <Link to="/turf" className="hero-play-btn">
                <span className="play-icon-circle">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </span>
                <span>View Turf Details</span>
              </Link>
            </div>

            {/* Feature Highlights Bar (3 Items in a Row) */}
            <div className="hero-trust-bar">
              <div className="trust-item">
                <div className="trust-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div>
                  <div className="trust-item-title">Live availability</div>
                  <div className="trust-item-desc">Check real-time slots</div>
                </div>
              </div>

              <div className="trust-item">
                <div className="trust-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                  </svg>
                </div>
                <div>
                  <div className="trust-item-title">Floodlit pitch</div>
                  <div className="trust-item-desc">Play day or night</div>
                </div>
              </div>

              <div className="trust-item">
                <div className="trust-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                </div>
                <div>
                  <div className="trust-item-title">Instant confirmation</div>
                  <div className="trust-item-desc">Secure and easy booking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
