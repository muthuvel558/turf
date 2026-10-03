import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminCalendar from '../components/admin/AdminCalendar';
import AdminBookings from '../components/admin/AdminBookings';
import AdminPricing from '../components/admin/AdminPricing';
import AdminFacility from '../components/admin/AdminFacility';
import AdminAmenities from '../components/admin/AdminAmenities';
import AdminReviews from '../components/admin/AdminReviews';
import '../styles/admin.css';

export default function OwnerPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default true for easy prototype evaluation
  const [passcode, setPasscode] = useState('');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'calendar', label: 'Calendar & Slots' },
    { id: 'bookings', label: 'Bookings Record' },
    { id: 'pricing', label: 'Pricing Manager' },
    { id: 'facility', label: 'Facility Details' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'reviews', label: 'Reviews Moderation' },
  ];

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-soft)', padding: '20px' }}>
        <div style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '36px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Owner Login</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Enter owner passcode to access business management console.</p>
          <form onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <input type="password" placeholder="Passcode (any key)" value={passcode} onChange={(e) => setPasscode(e.target.value)} className="form-input" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login to Owner Console</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Admin Top Header */}
      <header className="admin-header">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="header-logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span className="header-logo-text" style={{ fontSize: '18px' }}>
              PrimeTurf <span>Owner Console</span>
            </span>
          </div>

          <button className="btn btn-outline" onClick={() => navigate('/')}>
            ← Back to Public Website
          </button>
        </div>
      </header>

      <div className="container" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
        {/* Navigation Tabs */}
        <div className="admin-nav-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`admin-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={setActiveTab} />}
        {activeTab === 'calendar' && <AdminCalendar />}
        {activeTab === 'bookings' && <AdminBookings />}
        {activeTab === 'pricing' && <AdminPricing />}
        {activeTab === 'facility' && <AdminFacility />}
        {activeTab === 'amenities' && <AdminAmenities />}
        {activeTab === 'reviews' && <AdminReviews />}
      </div>
    </div>
  );
}
