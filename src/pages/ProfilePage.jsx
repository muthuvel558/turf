import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await updateProfile({ name, phone });
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Get initials for avatar fallback
  const getInitials = (fullName) => {
    if (!fullName) return 'P';
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return fullName.slice(0, 2).toUpperCase();
  };

  return (
    <div style={{ padding: '60px 0', backgroundColor: 'var(--bg-primary)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link> / <span style={{ color: 'var(--dark-green)', fontWeight: '600' }}>My Profile</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
          {/* Header Profile Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)' }}>
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--brand-green)' }}
              />
            ) : (
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-soft)',
                  border: '2px solid var(--brand-green)',
                  color: 'var(--dark-green)',
                  fontWeight: '800',
                  fontSize: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  letterSpacing: '0.05em'
                }}
              >
                {getInitials(user.name)}
              </div>
            )}

            <div>
              <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '4px', color: 'var(--text-primary)' }}>{user.name}</h1>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{user.email}</div>
              <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg-soft)', color: 'var(--brand-green)', border: '1px solid rgba(22,163,74,0.2)' }}>
                {user.role === 'ADMIN' ? 'ADMINISTRATOR' : 'VERIFIED PLAYER'}
              </span>
            </div>
          </div>

          {message && (
            <div style={{ padding: '10px 14px', backgroundColor: 'var(--light-green)', color: 'var(--dark-green)', borderRadius: 'var(--radius-md)', fontSize: '14px', marginBottom: '20px', fontWeight: '600' }}>
              {message}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Email Address (Managed via OAuth)</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="form-input"
                  style={{ backgroundColor: 'var(--bg-soft)', opacity: 0.7 }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" disabled={saving} className="btn btn-primary">
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Authentication Provider</span>
                <span style={{ fontSize: '14px', fontWeight: '700', textTransform: 'capitalize', color: 'var(--text-primary)' }}>{user.provider}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Contact Phone</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{user.phone || 'Not specified'}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Account Created</span>
                <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                  {user.createdAt ? format(new Date(user.createdAt), 'dd MMM yyyy') : 'Recently'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
                <Link to="/my-bookings" className="btn btn-secondary">
                  My Bookings
                </Link>
                {user.role === 'ADMIN' && (
                  <Link to="/owner" className="btn btn-secondary" style={{ color: 'var(--dark-green)' }}>
                    Owner Console
                  </Link>
                )}
                <button type="button" className="btn btn-secondary" style={{ color: '#DC2626', marginLeft: 'auto' }} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
