import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, User, Scissors, CheckCircle2 } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const ReceptionistCalendar = () => {
  const { appointments } = useCustomer();
  const [currentMonth, setCurrentMonth] = useState('July 2026');
  const [selectedDay, setSelectedDay] = useState(15);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Sample mapping of appointment counts per day
  const getApptsForDay = (day) => {
    if (day === 15) return appointments;
    if (day % 3 === 0) return appointments.slice(0, 2);
    if (day % 4 === 0) return appointments.slice(1, 3);
    return [];
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A' }}>
          Interactive Salon Calendar Grid
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Monthly overview of salon booking density, scheduled sessions, and day-by-day capacity.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.75rem' }}>
        {/* Left Column: Calendar Grid */}
        <div style={{ gridColumn: 'span 12' }} className="cal-grid-left">
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #F0E5E0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            {/* Header Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CalendarIcon size={22} color="#EF6A5B" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1A1A1A' }}>{currentMonth}</h3>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FFF7F3', border: '1px solid #F0E5E0', color: '#EF6A5B', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <ChevronLeft size={18} />
                </button>
                <button style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FFF7F3', border: '1px solid #F0E5E0', color: '#EF6A5B', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Weekdays Header */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>

            {/* Days Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
              {daysInMonth.map((day) => {
                const dayAppts = getApptsForDay(day);
                const isSelected = selectedDay === day;

                return (
                  <motion.div
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    whileHover={{ scale: 1.03 }}
                    style={{
                      height: '80px',
                      borderRadius: '12px',
                      padding: '0.5rem',
                      backgroundColor: isSelected ? '#FFF7F3' : '#FFFFFF',
                      border: isSelected ? '2px solid #EF6A5B' : '1px solid #F0E5E0',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', fontWeight: isSelected ? 700 : 600, color: isSelected ? '#EF6A5B' : '#1A1A1A' }}>
                      {day}
                    </span>

                    {dayAppts.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '9999px' }}>
                          {dayAppts.length} Appts
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Day Schedule Details */}
        <div style={{ gridColumn: 'span 12' }} className="cal-grid-right">
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #F0E5E0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A', marginBottom: '1rem' }}>
              Schedule for July {selectedDay}, 2026
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {getApptsForDay(selectedDay).map((a) => (
                <div key={a.id} style={{ padding: '0.85rem 1rem', borderRadius: '12px', backgroundColor: '#FFF7F3', border: '1px solid #F0E5E0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>{a.time}</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1A1A1A', margin: '2px 0' }}>{a.service}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#666666' }}>Stylist: {a.barber}</p>
                  </div>
                  <span style={{ backgroundColor: '#E6F4EA', color: '#137333', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                    {a.status}
                  </span>
                </div>
              ))}

              {getApptsForDay(selectedDay).length === 0 && (
                <p style={{ color: '#666666', fontSize: '0.85rem' }}>No appointments scheduled for this day.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .cal-grid-left { grid-column: span 8 !important; }
          .cal-grid-right { grid-column: span 4 !important; }
        }
      `}</style>
    </div>
  );
};
