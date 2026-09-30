import React, { useState } from 'react';
import { Search, CalendarCheck, User, Scissors, Plus } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const ReceptionistAppointments = () => {
  const { appointments, barbers, services, updateAppointmentStatus, rescheduleAppointment } = useCustomer();
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filtered = appointments.filter((a) => {
    const matchSearch = a.service.toLowerCase().includes(search.toLowerCase()) || a.barber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = selectedStatus === 'All' || a.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          Master Appointments Management
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          View, search, filter, reassign stylists, and update appointment statuses.
        </p>

        {/* Filter Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666666' }} />
            <input
              type="text"
              placeholder="Search by customer, stylist, or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ padding: '0.65rem 1rem', borderRadius: '12px', border: '1px solid #EEEEEE', fontSize: '0.85rem', outline: 'none' }}
          >
            <option value="All">Filter Status: All</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #EEEEEE', color: '#666666', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                <th style={{ padding: '0.75rem' }}>Ref ID</th>
                <th style={{ padding: '0.75rem' }}>Customer</th>
                <th style={{ padding: '0.75rem' }}>Service</th>
                <th style={{ padding: '0.75rem' }}>Assigned Stylist</th>
                <th style={{ padding: '0.75rem' }}>Date & Time</th>
                <th style={{ padding: '0.75rem' }}>Amount</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>{a.id}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>Alex Mercer</td>
                  <td style={{ padding: '0.75rem' }}>{a.service}</td>
                  <td style={{ padding: '0.75rem', color: '#151515', fontWeight: 600 }}>{a.barber}</td>
                  <td style={{ padding: '0.75rem', color: '#666666' }}>{a.date} at {a.time}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700 }}>₹{a.price * 15}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ backgroundColor: a.status === 'Confirmed' ? '#E6F4EA' : a.status === 'Cancelled' ? '#FCE8E6' : '#FEF3C7', color: a.status === 'Confirmed' ? '#137333' : a.status === 'Cancelled' ? '#C5221F' : '#D97706', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                      {a.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button onClick={() => updateAppointmentStatus(a.id, 'Confirmed')} style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', backgroundColor: '#FFF7F7', color: '#EF6A5B', fontSize: '0.7rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                        CONFIRM
                      </button>
                      <button onClick={() => updateAppointmentStatus(a.id, 'Completed')} style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', backgroundColor: '#151515', color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                        COMPLETE
                      </button>
                    </div>
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
