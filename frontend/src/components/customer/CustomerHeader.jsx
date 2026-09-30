import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, ShoppingBag, Menu, Check, User, CalendarCheck, Package, LogOut } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const CustomerHeader = ({ onToggleMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, cart, notifications, markNotificationAsRead, markAllNotificationsAsRead, setUser } = useCustomer();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getGreetingTitle = () => {
    switch (location.pathname) {
      case '/customer/services':
        return 'Explore Salon Services';
      case '/customer/booking':
        return 'Book Appointment Session';
      case '/customer/appointments':
        return 'My Appointments & Schedule';
      case '/customer/shop':
        return 'Grooming Essentials Store';
      case '/customer/cart':
        return 'Shopping Cart';
      case '/customer/checkout':
        return 'Checkout & Payment';
      case '/customer/orders':
        return 'My Orders History';
      case '/customer/favorites':
        return 'Saved Favorites';
      case '/customer/profile':
        return 'My Profile & Settings';
      default:
        return `Good Day, ${user?.name?.split(' ')[0] || 'Alex'} 👋`;
    }
  };

  const getGreetingSub = () => {
    if (location.pathname === '/customer/dashboard') {
      return 'Welcome to Beauty Plus Salon Management.';
    }
    return 'Manage your salon bookings, grooming products & preferences.';
  };

  return (
    <header
      style={{
        height: '72px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #F0E5E0',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Left Greeting / Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleMobile}
          style={{
            display: 'none',
            border: 'none',
            background: 'none',
            color: '#1A1A1A',
            cursor: 'pointer',
          }}
          className="mobile-header-btn"
        >
          <Menu size={24} />
        </button>

        <div>
          <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2 }}>
            {getGreetingTitle()}
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#666666', marginTop: '2px' }} className="desktop-sub">
            {getGreetingSub()}
          </p>
        </div>
      </div>

      {/* Right Action Items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Cart Icon with Quantity Badge */}
        <button
          onClick={() => navigate('/customer/cart')}
          style={{
            position: 'relative',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#FFF7F3',
            color: '#EF6A5B',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="View Cart"
        >
          <ShoppingBag size={20} />
          {cartQuantity > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                backgroundColor: '#EF6A5B',
                color: '#FFFFFF',
                fontSize: '0.65rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #FFFFFF',
              }}
            >
              {cartQuantity}
            </span>
          )}
        </button>

        {/* Notifications Icon with Unread Badge */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#FFF7F3',
              color: '#EF6A5B',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#EF6A5B',
                }}
              />
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          {notifOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '115%',
                width: '320px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 15px 35px rgba(239, 106, 91, 0.12)',
                border: '1px solid #F0E5E0',
                padding: '1rem',
                zIndex: 100,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1A1A1A' }}>Notifications</h4>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    style={{ fontSize: '0.75rem', color: '#EF6A5B', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '240px', overflowY: 'auto' }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationAsRead(n.id)}
                    style={{
                      padding: '0.65rem',
                      borderRadius: '8px',
                      backgroundColor: n.read ? '#FFFFFF' : '#FFF7F3',
                      border: '1px solid #F0E5E0',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A' }}>{n.title}</span>
                      <span style={{ fontSize: '0.7rem', color: '#666666' }}>{n.time}</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#666666', lineHeight: 1.3 }}>{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={user?.name}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #FFF7F3',
              }}
            />
          </button>

          {profileOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '115%',
                width: '190px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 15px 35px rgba(239, 106, 91, 0.12)',
                border: '1px solid #F0E5E0',
                padding: '0.5rem',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
            >
              <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #F0E5E0' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A1A' }}>{user?.name || 'Alex'}</p>
                <span style={{ fontSize: '0.7rem', color: '#EF6A5B', fontWeight: 600 }}>{user?.role || 'Customer'}</span>
              </div>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate('/customer/profile');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: '#1A1A1A',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <User size={16} color="#666666" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate('/customer/appointments');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: '#1A1A1A',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <CalendarCheck size={16} color="#666666" />
                <span>Appointments</span>
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate('/customer/orders');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: '#1A1A1A',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <Package size={16} color="#666666" />
                <span>Orders</span>
              </button>

              <div style={{ height: '1px', backgroundColor: '#F0E5E0', margin: '0.25rem 0' }} />

              <button
                onClick={() => {
                  setProfileOpen(false);
                  setUser(null);
                  navigate('/');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#EF6A5B',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <LogOut size={16} color="#EF6A5B" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mobile-header-btn {
            display: block !important;
          }
        }
        @media (max-width: 640px) {
          .desktop-sub {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
