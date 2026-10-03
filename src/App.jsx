import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Styles
import './styles/global.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/booking.css';
import './styles/sections.css';
import './styles/footer.css';
import './styles/modal.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Dedicated Pages
import HomePage from './pages/HomePage';
import TurfPage from './pages/TurfPage';
import PricingPage from './pages/PricingPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookPage from './pages/BookPage';
import MyBookingsPage from './pages/MyBookingsPage';
import BookingDetailPage from './pages/BookingDetailPage';
import OwnerPage from './pages/OwnerPage';

// Scroll to Top Helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Owner Console (Dedicated Layout) */}
        <Route path="/owner/*" element={<OwnerPage />} />

        {/* Public Website & Booking Pages (Shared Header + Footer) */}
        <Route
          path="*"
          element={
            <div className="app-root">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/turf" element={<TurfPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/book" element={<BookPage />} />
                  <Route path="/my-bookings" element={<MyBookingsPage />} />
                  <Route path="/booking/:id" element={<BookingDetailPage />} />
                  <Route path="/booking-success/:id" element={<BookingDetailPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
