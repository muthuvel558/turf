import React from 'react';
import { format } from 'date-fns';
import { StoreManager } from '../../data/store';

export default function AdminDashboard({ onNavigateTab }) {
  const bookings = StoreManager.getBookings();
  const blockedSlots = StoreManager.getBlockedSlots();
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  // Calculate dynamic metrics LIVE from dataset
  const todayBookings = bookings.filter(b => b.dateStr === todayStr && b.status !== 'CANCELLED');
  const todayRevenue = todayBookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const totalConfirmed = bookings.filter(b => b.status === 'UPCOMING' || b.status === 'COMPLETED').length;
  const totalBlockedToday = blockedSlots.filter(b => b.dateStr === todayStr).length;

  // Total daily available slots = 12 slots/day
  const totalSlotsPerDay = 12;
  const utilizedSlotsToday = todayBookings.length + totalBlockedToday;
  const utilizationRate = Math.min(100, Math.round((utilizedSlotsToday / totalSlotsPerDay) * 100));

  return (
    <div>
      <div className="section-header" style={{ textAlign: 'left', margin: '0 0 24px 0', maxWidth: 'none' }}>
        <h2 className="section-title">Owner Dashboard</h2>
        <p className="lead">Real-time performance metrics dynamically calculated from current booking data.</p>
      </div>

      {/* Dynamic Metrics Cards */}
      <div className="admin-metrics-grid">
        <div className="metric-card">
          <span className="metric-label">Today's Bookings</span>
          <div className="metric-value">{todayBookings.length}</div>
          <span className="metric-subtext">{format(new Date(), 'dd MMM yyyy')}</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">Today's Revenue</span>
          <div className="metric-value">₹{todayRevenue.toLocaleString()}</div>
          <span className="metric-subtext">Calculated from today's slots</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">Pitch Utilization</span>
          <div className="metric-value">{utilizationRate}%</div>
          <span className="metric-subtext">{utilizedSlotsToday} of {totalSlotsPerDay} slots occupied</span>
        </div>

        <div className="metric-card">
          <span className="metric-label">Total Confirmed</span>
          <div className="metric-value">{totalConfirmed}</div>
          <span className="metric-subtext">Active & completed bookings</span>
        </div>
      </div>

      {/* Today's Schedule Table */}
      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h3 style={{ fontSize: '18px', color: 'var(--text-primary)' }}>Today's Booking Schedule</h3>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Live customer reservations</span>
          </div>
          <button 
            className="btn btn-secondary"
            onClick={() => onNavigateTab('calendar')}
          >
            View Calendar &rarr;
          </button>
        </div>

        {todayBookings.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No bookings recorded for today yet.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Time Slot</th>
                <th>Sport</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {todayBookings.map((b) => (
                <tr key={b.id}>
                  <td><strong>{b.id}</strong></td>
                  <td>{b.startTime}</td>
                  <td>{b.sportName}</td>
                  <td>{b.customerName}</td>
                  <td>{b.phone}</td>
                  <td>₹{b.amount}</td>
                  <td><span className={`status-tag ${b.status.toLowerCase()}`}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
