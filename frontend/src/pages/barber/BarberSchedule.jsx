import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, User, Scissors } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const BarberSchedule = () => {
  const { appointments } = useCustomer();
  const [selectedDate, setSelectedDate] = useState('2026-07-15');

  const timeSlots = [
    { time: '09:00 AM', status: 'Booked', client: 'Alex Mercer', service: 'Royal Full Grooming Package', duration: '60 min' },
    { time: '10:00 AM', status: 'Available', client: '-', service: '-', duration: '-' },
    { time: '11:00 AM', status: 'Booked', client: 'David Miller', service: 'Premium Haircut & Styling', duration: '45 min' },
    { time: '12:00 PM', status: 'Booked', client: 'Jessica Taylor', service: 'Hair Coloring - Jet Black', duration: '60 min' },
    { time: '01:00 PM', status: 'Lunch Break', client: '-', service: 'Staff Rest Break', duration: '60 min' },
    { time: '02:00 PM', status: 'Booked', client: 'Ryan Thompson', service: 'Beard Precision & Facial', duration: '45 min' },
    { time: '03:00 PM', status: 'Available', client: '-', service: '-', duration: '-' },
    { time: '04:00 PM', status: 'Booked', client: 'Michael Vance', service: 'Scalp Massage & Treatment', duration: '30 min' },
    { time: '05:00 PM', status: 'Available', client: '-', service: '-', duration: '-' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A' }}>
          Daily Workstation Timeline Schedule
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Hour-by-hour client appointments, break times, and open slot availability.
        </p>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #F0E5E0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A', marginBottom: '1.25rem' }}>
          Shift Timeline — July 15, 2026
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {timeSlots.map((slot, idx) => {
            const isBooked = slot.status === 'Booked';
            const isBreak = slot.status === 'Lunch Break';

            return (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
                  borderRadius: '16px',
                  backgroundColor: isBreak ? '#FFF7F3' : isBooked ? '#FFFFFF' : '#FFFDFB',
                  border: isBooked ? '1.5px solid #EF6A5B' : '1px solid #F0E5E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ minWidth: '85px', textAlign: 'center', padding: '0.5rem', backgroundColor: '#FFF7F3', borderRadius: '10px', border: '1px solid #F0E5E0' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#EF6A5B' }}>{slot.time}</span>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1A1A1A' }}>
                      {isBooked ? slot.service : isBreak ? 'Lunch & Rest Break' : 'Open Slot Available'}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#666666', marginTop: '2px' }}>
                      {isBooked ? `Client: ${slot.client} (${slot.duration})` : isBreak ? '1 Hour Break' : 'Ready for walk-ins or online bookings'}
                    </p>
                  </div>
                </div>

                <span
                  style={{
                    backgroundColor: isBooked ? '#EF6A5B' : isBreak ? '#FEF3C7' : '#E6F4EA',
                    color: isBooked ? '#FFFFFF' : isBreak ? '#D97706' : '#137333',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                  }}
                >
                  {slot.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
