import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '15px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid var(--border-color)', borderTopColor: 'var(--brand-green)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          Checking session security...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)' }}>
        <div style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
          Verifying administrator permissions...
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '40px', maxWidth: '440px', width: '100%', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: '24px', fontWeight: '800' }}>
            !
          </div>
          <h2 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--text-primary)' }}>403 Access Denied</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
            Administrator authorization is required to access the Owner Console. Server-side role validation failed for this session.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a href="/" className="btn btn-outline">Back to Home</a>
            <a href="/admin/login" className="btn btn-primary">Admin Sign In</a>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
