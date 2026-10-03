import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  const { user, logout } = useAuth();
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

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Admin Top Header */}
      <header className="admin-header">
        <div className="container admin-header-content">
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Logged in as <strong>{user?.name || 'Administrator'}</strong>
            </span>
            <button className="btn btn-outline" onClick={() => navigate('/')}>
              Public Website
            </button>
            <button className="btn btn-secondary" style={{ color: '#DC2626' }} onClick={handleLogout}>
              Logout
            </button>
          </div>
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
