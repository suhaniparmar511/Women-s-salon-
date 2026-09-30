import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, CheckCircle2, User, Scissors } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const AppointmentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appointments } = useCustomer();

  const appt = appointments.find((a) => a.id === id) || appointments[0];

  const timelineSteps = [
    { label: 'Booked', status: 'completed' },
    { label: 'Confirmed', status: appt.status === 'Confirmed' || appt.status === 'Completed' ? 'completed' : 'pending' },
    { label: 'In Progress', status: appt.status === 'In Progress' || appt.status === 'Completed' ? 'completed' : 'pending' },
    { label: 'Completed', status: appt.status === 'Completed' ? 'completed' : 'pending' },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <button
        onClick={() => navigate('/customer/appointments')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#EF6A5B',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          alignSelf: 'flex-start',
        }}
      >
        <ArrowLeft size={16} />
        <span>BACK TO APPOINTMENTS</span>
      </button>

      {/* Appointment Summary Card */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '2rem', border: '1px solid #EEEEEE', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #EEEEEE' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>APPOINTMENT REF</span>
            <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
              {appt.id}
            </h1>
          </div>
          <span
            style={{
              backgroundColor: appt.status === 'Confirmed' ? '#E6F4EA' : appt.status === 'Cancelled' ? '#FCE8E6' : '#FEF3C7',
              color: appt.status === 'Confirmed' ? '#137333' : appt.status === 'Cancelled' ? '#C5221F' : '#D97706',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              textTransform: 'uppercase',
            }}
          >
            {appt.status}
          </span>
        </div>

        {/* Timeline Progress */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#151515', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Appointment Progress
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {timelineSteps.map((step, idx) => (
              <React.Fragment key={step.label}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: step.status === 'completed' ? '#EF6A5B' : '#EEEEEE',
                      color: step.status === 'completed' ? '#FFFFFF' : '#666666',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {step.status === 'completed' ? '✓' : idx + 1}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: step.status === 'completed' ? '#EF6A5B' : '#666666' }}>
                    {step.label}
                  </span>
                </div>
                {idx < timelineSteps.length - 1 && (
                  <div style={{ flex: 1, height: '2px', backgroundColor: step.status === 'completed' ? '#EF6A5B' : '#EEEEEE', margin: '0 0.5rem', marginBottom: '1.25rem' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', padding: '1.5rem', backgroundColor: '#FFF7F7', borderRadius: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase' }}>Treatment</span>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#151515', marginTop: '2px' }}>{appt.service}</h4>
            <span style={{ fontSize: '0.8rem', color: '#666666' }}>{appt.duration}</span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase' }}>Stylist / Barber</span>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#151515', marginTop: '2px' }}>{appt.barber}</h4>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase' }}>Date & Time</span>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#151515', marginTop: '2px' }}>{appt.date} at {appt.time}</h4>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase' }}>Total Amount</span>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#EF6A5B', marginTop: '2px' }}>₹{appt.price * 15}</h4>
          </div>
        </div>

        {appt.notes && (
          <div style={{ marginTop: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#151515', textTransform: 'uppercase' }}>Customer Notes</span>
            <p style={{ fontSize: '0.85rem', color: '#666666', marginTop: '0.25rem', fontStyle: 'italic' }}>"{appt.notes}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
