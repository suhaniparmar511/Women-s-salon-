import React, { useState } from 'react';
import { Clock, Calendar, Check, AlertCircle } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const BarberAvailability = () => {
  const { showToast } = useCustomer();

  const [workingDays, setWorkingDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [breakStart, setBreakStart] = useState('13:00');
  const [breakEnd, setBreakEnd] = useState('14:00');

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleDay = (day) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter((d) => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const handleSaveSchedule = (e) => {
    e.preventDefault();
    showToast('Working availability updated successfully!');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          Working Availability & Schedule
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Manage your active days, working hours, break times, and days off.
        </p>
      </div>

      <form onSubmit={handleSaveSchedule} style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '2rem', border: '1px solid #EEEEEE', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Working Days */}
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#151515', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'block' }}>
            Working Days
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {daysList.map((day) => {
              const active = workingDays.includes(day);
              return (
                <button
                  type="button"
                  key={day}
                  onClick={() => toggleDay(day)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: active ? '2px solid #EF6A5B' : '1px solid #EEEEEE',
                    backgroundColor: active ? '#FFF7F7' : '#FFFFFF',
                    color: active ? '#EF6A5B' : '#666666',
                    cursor: 'pointer',
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Working Hours */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Shift Start Time</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.9rem', outline: 'none' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Shift End Time</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.9rem', outline: 'none' }} />
          </div>
        </div>

        {/* Break Hours */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Lunch Break Start</label>
            <input type="time" value={breakStart} onChange={(e) => setBreakStart(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.9rem', outline: 'none' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Lunch Break End</label>
            <input type="time" value={breakEnd} onChange={(e) => setBreakEnd(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.9rem', outline: 'none' }} />
          </div>
        </div>

        <button type="submit" style={{ alignSelf: 'flex-start', padding: '0.75rem 1.75rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
          SAVE AVAILABILITY
        </button>
      </form>
    </div>
  );
};
