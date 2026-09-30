import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Star, Heart, Check, Scissors } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const ServiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, barbers, favorites, toggleFavoriteService } = useCustomer();

  const service = services.find((s) => s.id === id) || services[0];
  const isFav = favorites.services.includes(service.id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Back button */}
      <button
        onClick={() => navigate('/customer/services')}
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
        <span>BACK TO SERVICES</span>
      </button>

      {/* Main Details Card Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid #EEEEEE',
          boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
        }}
      >
        {/* Left Image Gallery */}
        <div style={{ gridColumn: 'span 12' }} className="service-details-left">
          <div style={{ borderRadius: '16px', overflow: 'hidden', height: '320px', position: 'relative' }}>
            <img src={service.image} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <span
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                backgroundColor: '#EF6A5B',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                textTransform: 'uppercase',
              }}
            >
              {service.category}
            </span>
          </div>
        </div>

        {/* Right Information */}
        <div style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="service-details-right">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <h1 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
                {service.name}
              </h1>
              <button
                onClick={() => toggleFavoriteService(service.id)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#FFF7F7',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Heart size={20} fill={isFav ? '#EF6A5B' : 'none'} color={isFav ? '#EF6A5B' : '#666666'} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: '#151515' }}>
                <Star size={16} fill="#EF6A5B" color="#EF6A5B" />
                <span>{service.rating} (120+ Reviews)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666666' }}>
                <Clock size={16} />
                <span>{service.duration} Minutes</span>
              </div>
            </div>

            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#EF6A5B', marginBottom: '1.25rem' }}>
              ₹{service.price * 15}
            </div>

            <p style={{ fontSize: '0.95rem', color: '#666666', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {service.description} Our master stylists provide customized treatment tailored specifically to your hair type and style preference.
            </p>

            {/* What's Included */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#151515', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                What's Included
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem', color: '#666666' }}>
                {['Personalized Consultation', 'Scalp Wash & Conditioning', 'Precision Haircut & Styling', 'Hot Towel Finish'].map((inc) => (
                  <div key={inc} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={16} color="#EF6A5B" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/customer/booking', { state: { selectedServiceId: service.id } })}
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '9999px',
              backgroundColor: '#EF6A5B',
              color: '#FFFFFF',
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(239, 106, 91, 0.3)',
            }}
          >
            BOOK APPOINTMENT NOW
          </button>
        </div>
      </div>

      {/* Available Stylists */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE' }}>
        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515', marginBottom: '1rem' }}>
          Master Stylists Available For This Treatment
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {barbers.map((b) => (
            <div key={b.id} style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #EEEEEE', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <img src={b.avatar} alt={b.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#151515' }}>{b.name}</h4>
                <span style={{ fontSize: '0.75rem', color: '#666666' }}>{b.experience} • {b.rating} ★</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .service-details-left {
            grid-column: span 6 !important;
          }
          .service-details-right {
            grid-column: span 6 !important;
          }
        }
      `}</style>
    </div>
  );
};
