import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import AdminCalendar from './AdminCalendar';
import AdminBookings from './AdminBookings';
import AdminPricing from './AdminPricing';
import AdminFacility from './AdminFacility';
import AdminAmenities from './AdminAmenities';
import AdminReviews from './AdminReviews';
import '../../styles/admin.css';

export default function AdminLayout({ onBackToWebsite }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'calendar', label: 'Calendar & Slots' },
    { id: 'bookings', label: 'Bookings Record' },
    { id: 'pricing', label: 'Pricing Manager' },
    { id: 'facility', label: 'Facility Details' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'reviews', label: 'Reviews Moderation' },
  ];

  return (
    <div className="admin-layout">
      {/* Admin Top Header */}
      <header className="admin-header">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', width: '100%' }}>
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

          <button className="btn btn-outline" style={{ marginLeft: 'auto' }} onClick={onBackToWebsite}>
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
