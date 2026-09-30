import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { NAV_LINKS } from '../data/salonData';
import { Button } from './common/Button';

export const Navbar = ({ onBookClick, onLogoutClick, user, isLoggedIn }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookAppointmentClick = () => {
    if (!isLoggedIn) {
      // User is not logged in: open Login Modal
      onBookClick();
    } else {
      // User is already logged in: open customer portal dashboard
      navigate('/customer/dashboard');
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: scrolled ? '#FFFFFF' : 'transparent',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          transition: 'all 0.3s ease-in-out',
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--soft-peach)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-accent)',
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 2 6.5 5 8" />
                <path d="M12 2c2.5 0 5 1.5 6.5 3.5C20 7.5 20.5 10 20 12.5c-.5 2.5-2 4.5-4 5.5" />
                <path d="M16 8c-1-1-2.5-1.5-4-1.5-3 0-5.5 2.5-5.5 5.5 0 1.5.5 3 1.5 4" />
                <circle cx="14.5" cy="11.5" r="1" fill="currentColor" />
              </svg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'var(--text-main)',
                  lineHeight: 1,
                }}
              >
                BEAUTY PLUS
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.25em',
                  color: 'var(--primary-accent)',
                  fontWeight: 600,
                  marginTop: '2px',
                  textTransform: 'uppercase',
                }}
              >
                — WOMEN'S SALON —
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.25rem',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-main)',
                  position: 'relative',
                  padding: '0.25rem 0',
                }}
                className="nav-link-hover"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Area: Book Appointment & User Profile (LOG IN text button removed as requested) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {isLoggedIn && (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.4rem 0.85rem 0.4rem 0.4rem',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--bg-section)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user?.name || 'User'}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {user?.name || 'Alex'}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '110%',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '0.75rem',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                      border: '1px solid var(--border-color)',
                      minWidth: '180px',
                      zIndex: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                    }}
                  >
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/customer/dashboard');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--text-main)',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <LayoutDashboard size={16} />
                      <span>My Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onLogoutClick();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#EF6A5B',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            <Button
              variant="primary"
              size="sm"
              icon={Calendar}
              onClick={handleBookAppointmentClick}
              className="desktop-nav-button"
            >
              {isLoggedIn ? 'MY PORTAL / BOOKING' : 'BOOK APPOINTMENT'}
            </Button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                padding: '0.5rem',
                color: 'var(--text-main)',
                border: 'none',
                cursor: 'pointer',
              }}
              className="mobile-toggle-btn"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderBottom: '1px solid var(--border-color)',
                overflow: 'hidden',
              }}
            >
              <div
                className="container"
                style={{
                  padding: '1.5rem 1.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-main)',
                      padding: '0.5rem 0',
                      borderBottom: '1px solid var(--bg-section)',
                    }}
                  >
                    {link.name}
                  </a>
                ))}

                <Button
                  variant="primary"
                  size="md"
                  icon={Calendar}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleBookAppointmentClick();
                  }}
                  style={{ width: '100%' }}
                >
                  {isLoggedIn ? 'MY PORTAL / BOOKING' : 'BOOK APPOINTMENT'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <style>{`
        @media (max-width: 991px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-nav-button {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: block !important;
          }
        }
        .nav-link-hover::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: var(--primary-accent);
          transition: width 0.3s ease;
        }
        .nav-link-hover:hover::after {
          width: 100%;
        }
        .nav-link-hover:hover {
          color: var(--primary-accent) !important;
        }
      `}</style>
    </>
  );
};
