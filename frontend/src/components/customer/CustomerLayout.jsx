import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CustomerSidebar } from './CustomerSidebar';
import { CustomerHeader } from './CustomerHeader';
import { useCustomer } from '../../context/CustomerContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const CustomerLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { toast } = useCustomer();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFDFB', display: 'flex' }}>
      {/* Sidebar */}
      <CustomerSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Wrapper */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
        className="main-layout-wrapper"
      >
        {/* Sticky Top Header */}
        <CustomerHeader onToggleMobile={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

        {/* Dynamic Page Content */}
        <main style={{ flex: 1, padding: '1.75rem', backgroundColor: '#FFFDFB' }}>
          <Outlet />
        </main>
      </div>

      {/* Toast Notification Banner */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 9999,
            backgroundColor: '#1A1A1A',
            color: '#FFFFFF',
            borderRadius: '14px',
            padding: '0.85rem 1.25rem',
            boxShadow: '0 10px 25px rgba(239, 106, 91, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            border: '1px solid #EF6A5B',
          }}
        >
          {toast.type === 'info' ? (
            <Info size={18} color="#3B82F6" />
          ) : toast.type === 'error' ? (
            <AlertCircle size={18} color="#EF6A5B" />
          ) : (
            <CheckCircle2 size={18} color="#EF6A5B" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      <style>{`
        @media (min-width: 1025px) {
          .main-layout-wrapper {
            margin-left: 260px !important;
          }
        }
      `}</style>
    </div>
  );
};
