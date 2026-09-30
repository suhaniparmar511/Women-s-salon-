import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Scissors,
  ShoppingBag,
  Heart,
  Clock,
  User,
  Sparkles,
  CheckCircle2,
  CalendarCheck,
  Star,
  Users,
  DollarSign,
  TrendingUp,
  Package,
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user, appointments, services, products, favorites, addToCart } = useCustomer();

  const upcomingAppointments = appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Pending');
  const nextAppt = upcomingAppointments[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* TOP HERO / WELCOME CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(135deg, #FFF7F3 0%, #FFFFFF 100%)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          border: '1px solid #F0E5E0',
          boxShadow: '0 10px 30px rgba(239, 106, 91, 0.06)',
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 106, 91, 0.04)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ gridColumn: 'span 12', zIndex: 2 }} className="hero-welcome-left">
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#EF6A5B',
              marginBottom: '0.5rem',
              display: 'block',
            }}
          >
            BEAUTY PLUS GROOMING PORTAL
          </span>
          <h1
            style={{
              fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.15,
              marginBottom: '0.75rem',
            }}
          >
            Welcome back, {user?.name?.split(' ')[0] || 'Alex'} 👋
          </h1>
          <p style={{ fontSize: '1rem', color: '#666666', maxWidth: '520px', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            "Looking sharp starts here." Reserve your luxury session with master stylists and explore premium grooming essentials.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              onClick={() => navigate('/customer/booking')}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '9999px',
                backgroundColor: '#EF6A5B',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(239, 106, 91, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <CalendarDays size={16} />
              <span>BOOK APPOINTMENT</span>
            </button>

            <button
              onClick={() => navigate('/customer/services')}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#EF6A5B',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                border: '1.5px solid #EF6A5B',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Scissors size={16} />
              <span>EXPLORE SERVICES</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* DASHBOARD QUICK STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        {[
          { label: 'Upcoming', count: `${upcomingAppointments.length} Sessions`, icon: CalendarDays },
          { label: 'Completed', count: '12 Services', icon: CheckCircle2 },
          { label: 'Orders', count: '5 Purchases', icon: ShoppingBag },
          { label: 'Favorites', count: `${favorites.services.length + favorites.products.length} Items`, icon: Heart },
        ].map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                border: '1px solid #F0E5E0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#FFF7F3',
                  color: '#EF6A5B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <StatIcon size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {stat.label}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1A1A1A', marginTop: '2px' }}>
                  {stat.count}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MAIN TWO-COLUMN GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.75rem' }}>
        {/* LEFT COLUMN: Next Appointment & Quick Booking */}
        <div style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="dash-main-col">
          {/* NEXT APPOINTMENT CARD */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.75rem',
              border: '1.5px solid #FFF7F3',
              boxShadow: '0 10px 30px rgba(239, 106, 91, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CalendarCheck size={20} color="#EF6A5B" />
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A' }}>
                  Your Next Appointment
                </h3>
              </div>

              {nextAppt && (
                <span
                  style={{
                    backgroundColor: nextAppt.status === 'Confirmed' ? '#E6F4EA' : '#FEF3C7',
                    color: nextAppt.status === 'Confirmed' ? '#137333' : '#D97706',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                  }}
                >
                  {nextAppt.status}
                </span>
              )}
            </div>

            {nextAppt ? (
              <div>
                {/* Countdown alert */}
                <div
                  style={{
                    backgroundColor: '#FFF7F3',
                    borderRadius: '12px',
                    padding: '0.65rem 1rem',
                    color: '#EF6A5B',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Clock size={16} />
                  <span>Appointment in 2 days (15 July 2026 at {nextAppt.time})</span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '1.25rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid #F0E5E0',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase' }}>Service</span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1A1A1A', marginTop: '2px' }}>
                      {nextAppt.service}
                    </h4>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <img
                      src={nextAppt.barberAvatar}
                      alt={nextAppt.barber}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase' }}>Master Stylist</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1A1A1A', marginTop: '2px' }}>
                        {nextAppt.barber}
                      </h4>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase' }}>Date & Duration</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1A1A1A', marginTop: '2px' }}>
                      {nextAppt.date} ({nextAppt.duration})
                    </h4>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigate(`/customer/appointments/${nextAppt.id}`)}
                    style={{
                      padding: '0.6rem 1.25rem',
                      borderRadius: '9999px',
                      backgroundColor: '#1A1A1A',
                      color: '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    VIEW DETAILS
                  </button>

                  <button
                    onClick={() => navigate('/customer/appointments')}
                    style={{
                      padding: '0.6rem 1.25rem',
                      borderRadius: '9999px',
                      backgroundColor: '#FFFFFF',
                      color: '#666666',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      border: '1px solid #F0E5E0',
                      cursor: 'pointer',
                    }}
                  >
                    RESCHEDULE
                  </button>
                </div>
              </div>
            ) : (
              <p style={{ color: '#666666', fontSize: '0.9rem' }}>No upcoming appointments scheduled.</p>
            )}
          </div>

          {/* QUICK BOOKING SERVICES */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A' }}>
                Book Your Next Session
              </h3>
              <button
                onClick={() => navigate('/customer/services')}
                style={{ fontSize: '0.8rem', fontWeight: 600, color: '#EF6A5B', border: 'none', background: 'none', cursor: 'pointer' }}
              >
                View All Services ⟶
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {services.slice(0, 4).map((s) => (
                <div
                  key={s.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    border: '1px solid #F0E5E0',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#EF6A5B', textTransform: 'uppercase' }}>
                      {s.category}
                    </span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1A1A1A', margin: '0.25rem 0' }}>
                      {s.name}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#666666' }}>{s.duration} min • ₹{s.price * 15}</p>
                  </div>

                  <button
                    onClick={() => navigate('/customer/booking', { state: { selectedServiceId: s.id } })}
                    style={{
                      marginTop: '1rem',
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '10px',
                      backgroundColor: '#FFF7F3',
                      color: '#EF6A5B',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: '1px solid #F0E5E0',
                      cursor: 'pointer',
                    }}
                  >
                    BOOK NOW
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Activity Timeline & Recommended Products */}
        <div style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="dash-side-col">
          {/* RECENT ACTIVITY TIMELINE */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid #F0E5E0',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A', marginBottom: '1rem' }}>
              Recent Activity
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { title: 'Haircut completed', date: '12 Jul 2026' },
                { title: 'Appointment confirmed', date: '08 Jul 2026' },
                { title: 'Order delivered', date: '02 Jul 2026' },
                { title: 'Beard Trim booked', date: '28 Jun 2026' },
              ].map((act, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#EF6A5B',
                      marginTop: '6px',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A1A', margin: 0 }}>{act.title}</p>
                    <span style={{ fontSize: '0.75rem', color: '#666666' }}>{act.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECOMMENDED PRODUCTS */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A' }}>
                Grooming Essentials
              </h3>
              <button
                onClick={() => navigate('/customer/shop')}
                style={{ fontSize: '0.8rem', fontWeight: 600, color: '#EF6A5B', border: 'none', background: 'none', cursor: 'pointer' }}
              >
                Shop ⟶
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {products.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '0.85rem',
                    border: '1px solid #F0E5E0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                  }}
                >
                  <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A1A' }}>{p.name}</h4>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#EF6A5B' }}>₹{p.price}</span>
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    style={{
                      padding: '0.4rem 0.75rem',
                      borderRadius: '8px',
                      backgroundColor: '#EF6A5B',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .dash-main-col {
            grid-column: span 8 !important;
          }
          .dash-side-col {
            grid-column: span 4 !important;
          }
        }
      `}</style>
    </div>
  );
};
