import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, CheckCircle2, Users, Scissors, Plus, Clock, Search } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const ReceptionistDashboard = () => {
  const navigate = useNavigate();
  const { appointments, barbers, updateAppointmentStatus } = useCustomer();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #FFF7F3 0%, #FFFFFF 100%)',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid #F0E5E0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#EF6A5B' }}>
            FRONT DESK OPERATIONAL DASHBOARD
          </span>
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A', marginTop: '0.25rem' }}>
            Welcome, Receptionist Emily 📋
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#666666', marginTop: '0.25rem' }}>
            18 appointments scheduled for today • 3 floor stylists active.
          </p>
        </div>

        <button
          onClick={() => navigate('/receptionist/appointments')}
          style={{
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px',
            backgroundColor: '#EF6A5B',
            color: '#FFFFFF',
            fontSize: '0.85rem',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(239, 106, 91, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Plus size={16} />
          <span>NEW APPOINTMENT / WALK-IN</span>
        </button>
      </motion.div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        {[
          { label: "Today's Bookings", count: '18 Sessions', icon: CalendarDays },
          { label: 'Checked In / Confirmed', count: '12 Arrived', icon: CheckCircle2 },
          { label: 'Walk-ins Today', count: '4 Clients', icon: Users },
          { label: 'Active Stylists', count: '3 On Floor', icon: Scissors },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '1.25rem', border: '1px solid #F0E5E0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FFF7F3', color: '#EF6A5B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666666', textTransform: 'uppercase' }}>{m.label}</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1A1A1A', marginTop: '2px' }}>{m.count}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Appointments Grid */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #F0E5E0' }}>
        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A', marginBottom: '1.25rem' }}>
          Today's Salon Appointments Overview
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #F0E5E0', color: '#666666', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                <th style={{ padding: '0.75rem' }}>Appt ID</th>
                <th style={{ padding: '0.75rem' }}>Customer</th>
                <th style={{ padding: '0.75rem' }}>Stylist</th>
                <th style={{ padding: '0.75rem' }}>Service</th>
                <th style={{ padding: '0.75rem' }}>Time</th>
                <th style={{ padding: '0.75rem' }}>Amount</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid #F0E5E0' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>{a.id}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>Alex Mercer</td>
                  <td style={{ padding: '0.75rem' }}>{a.barber}</td>
                  <td style={{ padding: '0.75rem' }}>{a.service}</td>
                  <td style={{ padding: '0.75rem', color: '#666666' }}>{a.time}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700 }}>₹{a.price * 15}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ backgroundColor: a.status === 'Confirmed' ? '#E6F4EA' : '#FEF3C7', color: a.status === 'Confirmed' ? '#137333' : '#D97706', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                      {a.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <button onClick={() => updateAppointmentStatus(a.id, 'Confirmed')} style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', backgroundColor: '#FFF7F3', color: '#EF6A5B', fontSize: '0.75rem', fontWeight: 700, border: '1px solid #F0E5E0', cursor: 'pointer' }}>
                      CONFIRM
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
