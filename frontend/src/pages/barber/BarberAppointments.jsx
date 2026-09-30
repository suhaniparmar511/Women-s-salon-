import React, { useState } from 'react';
import { CalendarCheck, Clock, CheckCircle2, Search } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const BarberAppointments = () => {
  const { appointments, updateAppointmentStatus } = useCustomer();
  const [selectedTab, setSelectedTab] = useState('Today');
  const [search, setSearch] = useState('');

  const tabs = ['Today', 'Upcoming', 'Completed', 'Cancelled', 'All'];

  const filtered = appointments.filter((a) => {
    const match = a.service.toLowerCase().includes(search.toLowerCase()) || a.barber.toLowerCase().includes(search.toLowerCase());
    if (selectedTab === 'Today') return match && a.date === '2026-07-15';
    if (selectedTab === 'Upcoming') return match && (a.status === 'Confirmed' || a.status === 'Pending');
    if (selectedTab === 'Completed') return match && a.status === 'Completed';
    if (selectedTab === 'Cancelled') return match && a.status === 'Cancelled';
    return match;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          Assigned Client Appointments
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Track and progress your client sessions in real time.
        </p>

        {/* Filter Tabs & Search */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {tabs.map((tab) => {
              const active = selectedTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: active ? '1px solid #EF6A5B' : '1px solid #EEEEEE',
                    backgroundColor: active ? '#EF6A5B' : '#FFFFFF',
                    color: active ? '#FFFFFF' : '#666666',
                    cursor: 'pointer',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666666' }} />
            <input
              type="text"
              placeholder="Search appointment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* Appointments Table / List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map((a) => (
          <div key={a.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '1.5rem', border: '1px solid #EEEEEE', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>{a.id}</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#151515' }}>{a.service}</h3>
              <p style={{ fontSize: '0.8rem', color: '#666666' }}>Date: {a.date} at {a.time} ({a.duration})</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
  );
};
