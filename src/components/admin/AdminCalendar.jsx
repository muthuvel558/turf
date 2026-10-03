import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { StoreManager } from '../../data/store';
import { HOURLY_TIMES } from '../../data/slots';

export default function AdminCalendar() {
  const [selectedDateStr, setSelectedDateStr] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [targetSlotTime, setTargetSlotTime] = useState('');
  const [blockReason, setBlockReason] = useState('Routine Surface Maintenance');

  const bookings = StoreManager.getBookings();
  const blockedSlots = StoreManager.getBlockedSlots();

  // Next 7 days selector
  const daysList = Array.from({ length: 7 }).map((_, i) => {
    const d = addDays(new Date(), i);
    return {
      dateStr: format(d, 'yyyy-MM-dd'),
      label: format(d, 'EEE, dd MMM')
    };
  });

  const handleOpenBlockModal = (time) => {
    setTargetSlotTime(time);
    setShowBlockModal(true);
  };

  const handleConfirmBlock = (e) => {
    e.preventDefault();
    StoreManager.blockSlot({
      dateStr: selectedDateStr,
      startTime: targetSlotTime,
      endTime: targetSlotTime,
      reason: blockReason
    });
    setShowBlockModal(false);
    alert(`Slot (${targetSlotTime}) has been BLOCKED. Customers can no longer book this slot.`);
  };

  const handleUnblock = (blockId) => {
    StoreManager.unblockSlot(blockId);
    alert('Slot has been unblocked.');
  };

  return (
    <div>
      <div className="section-header" style={{ textAlign: 'left', margin: '0 0 24px 0', maxWidth: 'none' }}>
        <h2 className="section-title">Schedule & Slot Blocking</h2>
        <p className="lead">Manage slot availability and block time slots for maintenance or private events.</p>
      </div>

      {/* Date Bar */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '24px' }}>
        {daysList.map((day) => (
          <button
            key={day.dateStr}
            className={`btn ${selectedDateStr === day.dateStr ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedDateStr(day.dateStr)}
            style={{ fontSize: '13px', padding: '8px 14px' }}
          >
            {day.label}
          </button>
        ))}
      </div>

      {/* Slots Schedule Table */}
      <div className="admin-table-card">
        <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>
          Slots for {selectedDateStr}
        </h3>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Time Slot</th>
                <th>Status</th>
                <th>Details / Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {HOURLY_TIMES.map((time, idx) => {
                // Check if booked by customer
                const customerBooking = bookings.find(b => b.dateStr === selectedDateStr && b.startTime.includes(time.split(' - ')[0]) && b.status !== 'CANCELLED');
                // Check if blocked by admin
                const adminBlock = blockedSlots.find(b => b.dateStr === selectedDateStr && b.startTime.includes(time.split(' - ')[0]));

                let statusText = 'AVAILABLE';
                let badgeClass = 'status-tag upcoming';
                let details = 'Open for online booking';

                if (customerBooking) {
                  statusText = 'BOOKED';
                  badgeClass = 'status-tag completed';
                  details = `Booked by ${customerBooking.customerName} (${customerBooking.phone})`;
                } else if (adminBlock) {
                  statusText = 'BLOCKED';
                  badgeClass = 'status-tag blocked';
                  details = `Blocked: ${adminBlock.reason}`;
                }

                return (
                  <tr key={idx}>
                    <td><strong>{time}</strong></td>
                    <td><span className={badgeClass}>{statusText}</span></td>
                    <td>{details}</td>
                    <td>
                      {customerBooking ? (
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Customer Reserved</span>
                      ) : adminBlock ? (
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '4px 10px', fontSize: '12px' }}
                          onClick={() => handleUnblock(adminBlock.id)}
                        >
                          Unblock Slot
                        </button>
                      ) : (
                        <button 
                          className="btn btn-outline" 
                          style={{ padding: '4px 10px', fontSize: '12px' }}
                          onClick={() => handleOpenBlockModal(time)}
                        >
                          Block Slot
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Block Slot Modal */}
      {showBlockModal && (
        <div className="modal-overlay" onClick={() => setShowBlockModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '18px' }}>Block Slot ({targetSlotTime})</h3>
              <button className="menu-close-btn" onClick={() => setShowBlockModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleConfirmBlock} className="modal-body">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input type="text" value={selectedDateStr} disabled className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Reason for Blocking</label>
                <select 
                  value={blockReason} 
                  onChange={(e) => setBlockReason(e.target.value)}
                  className="form-select"
                >
                  <option value="Routine Surface Maintenance">Routine Surface Maintenance</option>
                  <option value="Private Tournament Reserve">Private Tournament Reserve</option>
                  <option value="Owner Offline Reservation">Owner Offline Reservation</option>
                  <option value="Floodlight Repair">Floodlight Repair</option>
                </select>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowBlockModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Confirm Block</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
