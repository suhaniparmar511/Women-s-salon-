import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Scissors,
  User,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Search,
  Star,
  Check,
} from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const BookingWizardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { services, barbers, user, createAppointment } = useCustomer();

  // Selected service passed from state if navigated from card
  const initialServiceId = location.state?.selectedServiceId || services[0]?.id;

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(
    services.find((s) => s.id === initialServiceId) || services[0]
  );
  const [selectedBarber, setSelectedBarber] = useState(barbers[0]);
  const [selectedDate, setSelectedDate] = useState('2026-07-15');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('02:30 PM');
  const [specialNotes, setSpecialNotes] = useState('');
  const [confirmedApptId, setConfirmedApptId] = useState(null);

  // Time slot buckets
  const timeSlots = {
    Morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM'],
    Afternoon: ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM'],
    Evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'],
  };

  const stepsList = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Stylist / Barber' },
    { num: 3, label: 'Date & Time' },
    { num: 4, label: 'Review' },
    { num: 5, label: 'Confirmed' },
  ];

  const handleConfirmBooking = () => {
    const newAppt = {
      service: selectedService.name,
      barber: selectedBarber?.name || 'Any Available Barber',
      barberAvatar: selectedBarber?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      date: selectedDate,
      time: selectedTimeSlot,
      duration: `${selectedService.duration} min`,
      price: selectedService.price,
      notes: specialNotes,
    };
    const apptId = createAppointment(newAppt);
    setConfirmedApptId(apptId);
    setStep(5);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Heading */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          Book Your Appointment
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Follow the simple steps below to reserve your luxury grooming session.
        </p>
      </div>

      {/* Horizontal Stepper Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          border: '1px solid #EEEEEE',
          boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        }}
      >
        {stepsList.map((s, idx) => {
          const isActive = step === s.num;
          const isDone = step > s.num;
          return (
            <React.Fragment key={s.num}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? '#EF6A5B' : isDone ? '#E6F4EA' : '#FFF7F7',
                    color: isActive ? '#FFFFFF' : isDone ? '#137333' : '#666666',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isDone ? <Check size={16} /> : s.num}
                </div>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#EF6A5B' : '#151515',
                  }}
                  className="stepper-label"
                >
                  {s.label}
                </span>
              </div>
              {idx < stepsList.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: '2px',
                    backgroundColor: isDone ? '#EF6A5B' : '#EEEEEE',
                    margin: '0 0.5rem',
                  }}
                  className="stepper-line"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* STEP 1: SELECT SERVICE */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515', marginBottom: '1rem' }}>
            Choose Your Service
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {services.map((s) => {
              const isSelected = selectedService?.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    border: isSelected ? '2px solid #EF6A5B' : '1px solid #EEEEEE',
                    backgroundColor: isSelected ? '#FFF7F7' : '#FFFFFF',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#EF6A5B',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Check size={14} />
                    </div>
                  )}
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#EF6A5B', textTransform: 'uppercase' }}>
                    {s.category}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#151515', margin: '0.25rem 0' }}>{s.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#666666', marginBottom: '1rem' }}>{s.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                    <span style={{ fontSize: '0.85rem', color: '#666666' }}>{s.duration} min</span>
                    <span style={{ fontSize: '1rem', color: '#EF6A5B' }}>₹{s.price * 15}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <button
              onClick={() => setStep(2)}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                backgroundColor: '#EF6A5B',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              CONTINUE TO BARBER ⟶
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: SELECT BARBER */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515', marginBottom: '1rem' }}>
            Choose Your Barber / Stylist
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
            {/* Any Available Barber */}
            <div
              onClick={() => setSelectedBarber({ name: 'Any Available Barber', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', specialization: 'First available expert' })}
              style={{
                backgroundColor: selectedBarber?.name === 'Any Available Barber' ? '#FFF7F7' : '#FFFFFF',
                borderRadius: '16px',
                padding: '1.5rem',
                border: selectedBarber?.name === 'Any Available Barber' ? '2px solid #EF6A5B' : '1px solid #EEEEEE',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FFF7F7', color: '#EF6A5B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#151515' }}>Any Available Stylist</h4>
                <span style={{ fontSize: '0.75rem', color: '#666666' }}>Fastest appointment time</span>
              </div>
            </div>

            {barbers.map((b) => {
              const isSelected = selectedBarber?.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBarber(b)}
                  style={{
                    backgroundColor: isSelected ? '#FFF7F7' : '#FFFFFF',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: isSelected ? '2px solid #EF6A5B' : '1px solid #EEEEEE',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    position: 'relative',
                  }}
                >
                  <img src={b.avatar} alt={b.name} style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#151515' }}>{b.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#666666' }}>{b.specialization}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#EF6A5B', marginTop: '2px' }}>
                      <Star size={12} fill="#EF6A5B" />
                      <span>{b.rating} ({b.experience})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button onClick={() => setStep(1)} style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', backgroundColor: '#FFFFFF', color: '#666666', border: '1px solid #EEEEEE', cursor: 'pointer' }}>
              ⟵ BACK
            </button>
            <button onClick={() => setStep(3)} style={{ padding: '0.75rem 2rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              CONTINUE TO DATE & TIME ⟶
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: DATE & TIME */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515', marginBottom: '1rem' }}>
            Select Date & Available Time Slot
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
            {/* Custom Visual Calendar UI */}
            <div style={{ gridColumn: 'span 12', backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '1.5rem', border: '1px solid #EEEEEE' }} className="calendar-col">
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#151515', marginBottom: '1rem' }}>July 2026</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                  <span key={d} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666666', textTransform: 'uppercase' }}>{d}</span>
                ))}

                {[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].map((day) => {
                  const dateStr = `2026-07-${day}`;
                  const isSelected = selectedDate === dateStr;
                  const isUnavailable = day === 18; // Example disabled date
                  return (
                    <button
                      key={day}
                      disabled={isUnavailable}
                      onClick={() => setSelectedDate(dateStr)}
                      style={{
                        padding: '0.75rem 0',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        fontWeight: isSelected ? 700 : 500,
                        border: isSelected ? '2px solid #EF6A5B' : '1px solid #EEEEEE',
                        backgroundColor: isSelected ? '#EF6A5B' : isUnavailable ? '#F5F5F5' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : isUnavailable ? '#CCCCCC' : '#151515',
                        cursor: isUnavailable ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Picker */}
            <div style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="slots-col">
              {Object.entries(timeSlots).map(([bucket, slots]) => (
                <div key={bucket}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#666666', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>
                    {bucket} Slots
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {slots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: isSelected ? 700 : 500,
                            border: isSelected ? '1px solid #EF6A5B' : '1px solid #EEEEEE',
                            backgroundColor: isSelected ? '#EF6A5B' : '#FFFFFF',
                            color: isSelected ? '#FFFFFF' : '#151515',
                            cursor: 'pointer',
                          }}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button onClick={() => setStep(2)} style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', backgroundColor: '#FFFFFF', color: '#666666', border: '1px solid #EEEEEE', cursor: 'pointer' }}>
              ⟵ BACK
            </button>
            <button onClick={() => setStep(4)} style={{ padding: '0.75rem 2rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              REVIEW APPOINTMENT ⟶
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 4: REVIEW & CONFIRM */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515', marginBottom: '1rem' }}>
            Review Your Appointment
          </h2>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #EEEEEE' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase' }}>Service</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#151515' }}>{selectedService?.name}</h4>
                <p style={{ fontSize: '0.8rem', color: '#666666' }}>{selectedService?.duration} Minutes</p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase' }}>Stylist / Barber</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#151515' }}>{selectedBarber?.name}</h4>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #EEEEEE' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase' }}>Date & Time</span>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#151515' }}>{selectedDate} at {selectedTimeSlot}</h4>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase' }}>Total Amount</span>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#EF6A5B' }}>₹{selectedService?.price * 15}</h4>
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                Special Instructions / Request (Optional)
              </label>
              <textarea
                rows="3"
                placeholder="e.g. Please keep sides medium fade..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: '1px solid #EEEEEE',
                  backgroundColor: '#FFF7F7',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button onClick={() => setStep(3)} style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', backgroundColor: '#FFFFFF', color: '#666666', border: '1px solid #EEEEEE', cursor: 'pointer' }}>
              ⟵ BACK
            </button>
            <button onClick={handleConfirmBooking} style={{ padding: '0.75rem 2.25rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              CONFIRM APPOINTMENT NOW
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 5: CONFIRMATION SUCCESS */}
      {step === 5 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '3rem 2rem', border: '1px solid #EEEEEE' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#FFF7F7', color: '#EF6A5B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle2 size={40} />
          </div>

          <h2 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
            Appointment Confirmed!
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#666666', marginTop: '0.5rem' }}>
            Reference ID: <strong style={{ color: '#EF6A5B' }}>{confirmedApptId}</strong>
          </p>

          <div style={{ backgroundColor: '#FFF7F7', borderRadius: '16px', padding: '1.5rem', maxWidth: '450px', margin: '1.5rem auto', textAlign: 'left' }}>
            <p style={{ fontSize: '0.85rem', color: '#151515', marginBottom: '0.5rem' }}>
              <strong>Service:</strong> {selectedService?.name}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#151515', marginBottom: '0.5rem' }}>
              <strong>Stylist:</strong> {selectedBarber?.name}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#151515' }}>
              <strong>When:</strong> {selectedDate} at {selectedTimeSlot}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button onClick={() => navigate('/customer/appointments')} style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              VIEW MY APPOINTMENTS
            </button>
            <button onClick={() => navigate('/customer/dashboard')} style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', backgroundColor: '#FFFFFF', color: '#151515', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #EEEEEE', cursor: 'pointer' }}>
              BACK TO DASHBOARD
            </button>
          </div>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .stepper-label { display: none !important; }
          .stepper-line { margin: 0 0.25rem !important; }
        }
        @media (min-width: 768px) {
          .calendar-col { grid-column: span 6 !important; }
          .slots-col { grid-column: span 6 !important; }
        }
      `}</style>
    </div>
  );
};
