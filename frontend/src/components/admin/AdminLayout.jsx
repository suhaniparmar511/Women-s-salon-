import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { useCustomer } from '../../context/CustomerContext';
import { Menu } from 'lucide-react';

export const AdminLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, toast } = useCustomer();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFDFB', display: 'flex' }}>
      <AdminSidebar mobileOpen={mobileSidebarOpen} onCloseMobile={() => setMobileSidebarOpen(false)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }} className="main-layout-wrapper">
        <header style={{ height: '72px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #F0E5E0', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setMobileSidebarOpen(true)} style={{ display: 'none', border: 'none', background: 'none', color: '#1A1A1A' }} className="mobile-header-btn">
              <Menu size={24} />
            </button>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A' }}>
                Executive Control Panel — {user?.name || 'Admin'} 👑
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#666666' }}>Full system administration, financials, staff, services & analytics.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FFF7F3', padding: '0.4rem 0.85rem', borderRadius: '9999px', border: '1px solid #F0E5E0' }}>
            <img src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'} alt={user?.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#EF6A5B' }}>Admin Mode</span>
          </div>
        </header>

        <main style={{ flex: 1, padding: '1.75rem', backgroundColor: '#FFFDFB' }}>
          <Outlet />
        </main>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999, backgroundColor: '#1A1A1A', color: '#FFFFFF', borderRadius: '12px', padding: '0.85rem 1.25rem', boxShadow: '0 10px 25px rgba(239, 106, 91, 0.2)', fontSize: '0.875rem', border: '1px solid #EF6A5B' }}>
          {toast.message}
        </div>
      )}

      <style>{`
        @media (min-width: 1025px) {
          .main-layout-wrapper { margin-left: 260px !important; }
        }
        @media (max-width: 1024px) {
          .mobile-header-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
};
