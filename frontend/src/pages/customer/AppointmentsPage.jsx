import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheck, Clock, Search, Scissors, User, ChevronRight } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const AppointmentsPage = () => {
  const navigate = useNavigate();
  const { appointments } = useCustomer();

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filters = ['All', 'Upcoming', 'Completed', 'Cancelled'];

  const filteredAppointments = appointments.filter((a) => {
    const matchesFilter =
      selectedFilter === 'All'
        ? true
        : selectedFilter === 'Upcoming'
        ? a.status === 'Confirmed' || a.status === 'Pending'
        : a.status === selectedFilter;

    const matchesSearch =
      a.service.toLowerCase().includes(search.toLowerCase()) ||
      a.barber.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A' }}>
          My Grooming Appointments
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Track past treatments, view upcoming sessions, and reschedule bookings.
        </p>

        {/* Filters and Search Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {filters.map((f) => {
              const active = selectedFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: active ? '1px solid #EF6A5B' : '1px solid #F0E5E0',
                    backgroundColor: active ? '#EF6A5B' : '#FFFFFF',
                    color: active ? '#FFFFFF' : '#666666',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666666' }} />
            <input
              type="text"
              placeholder="Search appointment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.75rem',
                borderRadius: '12px',
                border: '1px solid #F0E5E0',
                backgroundColor: '#FFF7F3',
                fontSize: '0.85rem',
                color: '#1A1A1A',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredAppointments.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid #F0E5E0',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <img
                src={a.barberAvatar}
                alt={a.barber}
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
              />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>{a.id}</span>
                  <span
                    style={{
                      backgroundColor: a.status === 'Confirmed' || a.status === 'Completed' ? '#E6F4EA' : '#FEF3C7',
                      color: a.status === 'Confirmed' || a.status === 'Completed' ? '#137333' : '#D97706',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.65rem',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {a.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1A1A1A' }}>{a.service}</h3>
                <p style={{ fontSize: '0.85rem', color: '#666666', marginTop: '2px' }}>
                  Stylist: <strong>{a.barber}</strong> • {a.date} at {a.time} ({a.duration})
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#EF6A5B' }}>₹{a.price * 15}</span>

              <button
                onClick={() => navigate(`/customer/appointments/${a.id}`)}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '9999px',
                  backgroundColor: '#FFF7F3',
                  color: '#EF6A5B',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: '1px solid #F0E5E0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>VIEW</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
