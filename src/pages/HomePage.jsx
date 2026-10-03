import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SlotFinder from '../components/SlotFinder';
import { StoreManager } from '../data/store';
import { IMAGES } from '../data/images';

export default function HomePage() {
  const pricing = StoreManager.getPricing();
  const activeAmenities = StoreManager.getAmenities().filter(a => a.active);
  const galleryPreviews = IMAGES.gallery.slice(0, 6);
  const approvedReviews = StoreManager.getReviews().filter(r => r.approved);

  return (
    <div className="homepage-root">
      {/* 1. HERO */}
      <Hero />

      {/* 2. QUICK BOOKING (Compact Preview) */}
      <SlotFinder />

      {/* 3. BUILT FOR BETTER GAMES (Requirement 6) */}
      <section className="better-games-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">PLAYING EXPERIENCE</span>
            <h2 className="section-title">BUILT FOR BETTER GAMES</h2>
            <p className="lead">Everything about the arena is designed to make your game easier, safer and more enjoyable.</p>
          </div>

          <div className="better-games-grid">
            {/* Block 01 */}
            <div className="better-game-card">
              <div className="card-number-badge">01</div>
              <div className="card-image-wrapper">
                <img src={IMAGES.surface} alt="Quality Playing Surface" className="better-game-img" loading="lazy" />
              </div>
              <div className="card-content">
                <h3 className="card-heading">QUALITY PLAYING SURFACE</h3>
                <p className="card-body-text">
                  Consistent 50mm synthetic mono-filament grass with rubber infill designed for regular football and box-cricket sessions.
                </p>
              </div>
            </div>

            {/* Block 02 */}
            <div className="better-game-card">
              <div className="card-number-badge">02</div>
              <div className="card-image-wrapper">
                <img src={IMAGES.evening} alt="Play Under The Lights" className="better-game-img" loading="lazy" />
              </div>
              <div className="card-content">
                <h3 className="card-heading">PLAY UNDER THE LIGHTS</h3>
                <p className="card-body-text">
                  Bright, evenly distributed High-Lux LED floodlighting system for crystal-clear visibility during evening and night matches.
                </p>
              </div>
            </div>

            {/* Block 03 */}
            <div className="better-game-card">
              <div className="card-number-badge">03</div>
              <div className="card-image-wrapper">
                <img src={IMAGES.goal} alt="Space To Play Your Way" className="better-game-img" loading="lazy" />
              </div>
              <div className="card-content">
                <h3 className="card-heading">SPACE TO PLAY YOUR WAY</h3>
                <p className="card-body-text">
                  Fully enclosed arena with heavy-duty safety netting, suitable for 5-a-side, 7-a-side football, and competitive box cricket.
                </p>
              </div>
            </div>

            {/* Block 04 */}
            <div className="better-game-card">
              <div className="card-number-badge">04</div>
              <div className="card-image-wrapper">
                <img src={IMAGES.facility} alt="Ready For Every Session" className="better-game-img" loading="lazy" />
              </div>
              <div className="card-content">
                <h3 className="card-heading">READY FOR EVERY SESSION</h3>
                <p className="card-body-text">
                  Clean, brushed surface with maintained infill and prepared facilities before every team steps onto the pitch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ESSENTIAL ARENA AMENITIES (Requirement 8) */}
      <section className="amenities-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">FACILITIES & COMFORT</span>
            <h2 className="section-title">ESSENTIAL ARENA AMENITIES</h2>
            <p className="lead">Everything you need before, during and after the game.</p>
          </div>

          <div className="amenities-grid">
            {activeAmenities.slice(0, 6).map((item, idx) => (
              <div key={idx} className="amenity-item-box">
                <div className="amenity-check-icon">✓</div>
                <div>
                  <h4 className="amenity-name">{item.name}</h4>
                  <p className="amenity-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="section-cta-center">
            <Link to="/turf" className="btn btn-outline">
              View Pitch Specifications & Facilities &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TRANSPARENT RATES (Requirement 9) */}
      <section className="transparent-rates-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">TRANSPARENT RATES</span>
            <h2 className="section-title">Hourly Booking Rates</h2>
            <p className="lead">Know the price before you book. No hidden charges.</p>
          </div>

          <div className="pricing-grid">
            <div className="rate-card">
              <span className="rate-category">MORNING OFF-PEAK</span>
              <div className="rate-time">06:00 AM – 09:00 AM</div>
              <div className="rate-price">₹{pricing.morningPrice} <span className="per-hour">/ hour</span></div>
              <p className="rate-desc">Ideal for early morning practice and fitness sessions.</p>
              <Link to="/book" className="btn btn-outline btn-full-width">
                BOOK A SLOT &rarr;
              </Link>
            </div>

            <div className="rate-card featured">
              <span className="featured-pill">BEST VALUE</span>
              <span className="rate-category">REGULAR DAY</span>
              <div className="rate-time">09:00 AM – 05:00 PM</div>
              <div className="rate-price">₹{pricing.regularPrice} <span className="per-hour">/ hour</span></div>
              <p className="rate-desc">Standard daytime casual games, practice & tournaments.</p>
              <Link to="/book" className="btn btn-primary btn-full-width">
                BOOK A SLOT &rarr;
              </Link>
            </div>

            <div className="rate-card">
              <span className="rate-category">PRIME EVENING</span>
              <div className="rate-time">05:00 PM – 11:00 PM</div>
              <div className="rate-price">₹{pricing.eveningPrice} <span className="per-hour">/ hour</span></div>
              <p className="rate-desc">Floodlit prime night matches under high-lux LED lights.</p>
              <Link to="/book" className="btn btn-outline btn-full-width">
                BOOK A SLOT &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FACILITY PROOF (Requirement 10) */}
      <section className="facility-proof-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">VISUAL PROOF</span>
            <h2 className="section-title">FACILITY PROOF</h2>
            <p className="lead">See the pitch, facilities and playing environment before you book.</p>
          </div>

          <div className="facility-proof-grid">
            {galleryPreviews.map((img, idx) => (
              <div key={idx} className="proof-card">
                <img src={img.src} alt={img.title} className="proof-img" loading="lazy" />
                <div className="proof-overlay">
                  <span className="proof-category">{img.category}</span>
                  <span className="proof-title">{img.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="section-cta-center">
            <Link to="/gallery" className="btn btn-outline">
              View Photo Gallery &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 7. WHAT TEAMS SAY (Requirement 11) */}
      <section className="what-teams-say-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">PLAYER FEEDBACK</span>
            <h2 className="section-title">WHAT TEAMS SAY</h2>
            <p className="lead">Verified reviews from players who book at PrimeTurf Arena.</p>
          </div>

          <div className="testimonials-grid">
            {approvedReviews.map((review) => (
              <div key={review.id} className="testimonial-card">
                <div className="testimonial-stars">{'★'.repeat(review.rating)}</div>
                <p className="testimonial-quote">"{review.comment}"</p>
                <div className="testimonial-author">
                  <strong>— {review.name}</strong>, <span>{review.sport}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL BOOKING CTA (Requirement 12) */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-box text-center">
            <h2 className="section-title">READY FOR YOUR NEXT GAME?</h2>
            <p className="lead">Pick your sport, choose a time and reserve the pitch in a few simple steps.</p>
            <div className="cta-buttons-group">
              <Link to="/book" className="btn btn-primary">
                BOOK YOUR SLOT &rarr;
              </Link>
              <Link to="/turf" className="btn btn-outline">
                VIEW TURF DETAILS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
