import React from 'react';
import { Scissors, Star, Clock, CheckCircle2 } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const ReceptionistStylists = () => {
  const { barbers } = useCustomer();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          Stylist Availability & On-Floor Schedules
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Check real-time availability, working hours, and active client loads.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {barbers.map((b) => (
          <div key={b.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.5rem', border: '1px solid #EEEEEE', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <img src={b.avatar} alt={b.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#151515' }}>{b.name}</h3>
                <span style={{ fontSize: '0.8rem', color: '#666666' }}>{b.specialization}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, color: '#EF6A5B', marginTop: '2px' }}>
                  <Star size={14} fill="#EF6A5B" />
                  <span>{b.rating} ({b.experience})</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '0.85rem', backgroundColor: '#FFF7F7', borderRadius: '12px', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Status</span><strong style={{ color: '#137333' }}>Active / Available</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Shift Hours</span><span>09:00 AM – 06:00 PM</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Today's Sessions</span><span>5 Clients</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
