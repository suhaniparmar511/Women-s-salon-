import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheck, Users, DollarSign, Star, Clock, CheckCircle2, Scissors, ArrowRight } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const BarberDashboard = () => {
  const navigate = useNavigate();
  const { user, appointments, updateAppointmentStatus } = useCustomer();

  const todayAppts = appointments.filter((a) => a.barber?.includes('Marcus') || a.barber === user?.name || true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #FFF7F3 0%, #FFFFFF 100%)',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid #F0E5E0',
          boxShadow: '0 10px 30px rgba(239, 106, 91, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#EF6A5B' }}>
            STYLIST WORKSTATION
          </span>
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A', marginTop: '0.25rem' }}>
            Hello, Master Stylist {user?.name?.split(' ')[0] || 'Marcus'} ✂️
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#666666', marginTop: '0.25rem' }}>
            You have 5 client sessions scheduled for today. Working hours: 09:00 AM – 06:00 PM.
          </p>
        </div>

        <button
          onClick={() => navigate('/barber/appointments')}
          style={{
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px',
            backgroundColor: '#EF6A5B',
            color: '#FFFFFF',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(239, 106, 91, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>VIEW ALL SESSIONS</span>
          <ArrowRight size={16} />
        </button>
      </motion.div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        {[
          { label: "Today's Sessions", count: '5 Clients', icon: Users },
          { label: 'Completed Today', count: '3 Done', icon: CheckCircle2 },
          { label: 'Gross Earnings', count: '₹3,450', icon: DollarSign },
          { label: 'Client Rating', count: '4.9 ★ (120+)', icon: Star },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '1.25rem', border: '1px solid #F0E5E0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
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

      {/* Timeline Schedule for Today */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #F0E5E0' }}>
        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A', marginBottom: '1.25rem' }}>
          Today's Appointment Schedule
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {todayAppts.slice(0, 5).map((a, idx) => (
            <div
              key={a.id || idx}
              style={{
                padding: '1.25rem',
                borderRadius: '16px',
                backgroundColor: '#FFF7F3',
                border: '1px solid #F0E5E0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ minWidth: '70px', textAlign: 'center', padding: '0.5rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #F0E5E0' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#EF6A5B', display: 'block' }}>{a.time}</span>
                  <span style={{ fontSize: '0.7rem', color: '#666666' }}>{a.duration}</span>
                </div>

                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#EF6A5B', textTransform: 'uppercase' }}>{a.id}</span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1A1A1A' }}>{a.service}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#666666' }}>Client: Alex Mercer • Phone: +91 98765 43215</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ backgroundColor: a.status === 'Completed' ? '#E6F4EA' : '#FEF3C7', color: a.status === 'Completed' ? '#137333' : '#D97706', fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 0.75rem', borderRadius: '9999px' }}>
                  {a.status}
                </span>

                {a.status !== 'Completed' && (
                  <button
                    onClick={() => updateAppointmentStatus(a.id, 'Completed')}
                    style={{ padding: '0.5rem 1rem', borderRadius: '8px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                  >
                    MARK COMPLETED
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
