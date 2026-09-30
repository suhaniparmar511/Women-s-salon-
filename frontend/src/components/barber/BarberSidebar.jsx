import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, Clock, DollarSign, User, LogOut, Scissors, Sparkles, X } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const BarberSidebar = ({ mobileOpen, onCloseMobile }) => {
  const navigate = useNavigate();
  const { user, setUser } = useCustomer();

  const links = [
    { name: 'Dashboard', path: '/barber/dashboard', icon: LayoutDashboard },
    { name: 'My Appointments', path: '/barber/appointments', icon: CalendarCheck },
    { name: 'Working Schedule', path: '/barber/schedule', icon: Clock },
    { name: 'Availability & Leaves', path: '/barber/availability', icon: Scissors },
    { name: 'Earnings & Wages', path: '/barber/earnings', icon: DollarSign },
    { name: 'My Profile', path: '/barber/profile', icon: User },
  ];

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <>
      {mobileOpen && <div onClick={onCloseMobile} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }} />}

      <aside
        style={{
          width: '260px',
          height: '100vh',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #F0E5E0',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
          transition: 'transform 0.3s ease-in-out',
        }}
        className={`sidebar-container ${mobileOpen ? 'mobile-open' : ''}`}
      >
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #F0E5E0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FFF7F3', color: '#EF6A5B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scissors size={20} />
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.1em', color: '#1A1A1A', lineHeight: 1 }}>
                BEAUTY PLUS
              </h1>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#EF6A5B', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginTop: '2px' }}>
                BARBER PORTAL
              </span>
            </div>
          </div>
          <button onClick={onCloseMobile} style={{ display: 'none', border: 'none', background: 'none', color: '#666666' }} className="mobile-close-btn">
            <X size={20} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '0.85rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#EF6A5B' : '#1A1A1A',
                  backgroundColor: isActive ? '#FFF7F3' : 'transparent',
                  textDecoration: 'none',
                  position: 'relative',
                })}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} color={isActive ? '#EF6A5B' : '#666666'} />
                    <span style={{ flex: 1 }}>{item.name}</span>
                    {isActive && <div style={{ position: 'absolute', right: '6px', width: '4px', height: '20px', borderRadius: '9999px', backgroundColor: '#EF6A5B' }} />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid #F0E5E0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '12px', backgroundColor: '#FFF7F3', marginBottom: '0.75rem' }}>
            <img src={user?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'} alt={user?.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A1A', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.name || 'Marcus Vance'}
              </p>
              <span style={{ fontSize: '0.7rem', color: '#EF6A5B', fontWeight: 600 }}>Barber / Stylist</span>
            </div>
          </div>
          <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.65rem', borderRadius: '10px', backgroundColor: '#FFFFFF', color: '#EF6A5B', border: '1px solid #F0E5E0', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
            <LogOut size={16} />
            <span>LOG OUT</span>
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 1024px) {
          .sidebar-container { transform: translateX(-100%); }
          .sidebar-container.mobile-open { transform: translateX(0); }
          .mobile-close-btn { display: block !important; }
        }
      `}</style>
    </>
  );
};
