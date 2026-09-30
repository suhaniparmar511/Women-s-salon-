import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Scissors, Clock, Star, Heart, ArrowRight, Check } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const ServicesPage = () => {
  const navigate = useNavigate();
  const { services, favorites, toggleFavoriteService } = useCustomer();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Haircut', 'Beard', 'Hair Coloring', 'Facial', 'Spa'];

  const filteredServices = services.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A' }}>
          Salon Treatments & Grooming Services
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Select from our curated menu of luxury haircuts, beard precision, skin facials, and relaxing spa sessions.
        </p>

        {/* Search & Category Filter Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: isActive ? '1px solid #EF6A5B' : '1px solid #F0E5E0',
                    backgroundColor: isActive ? '#EF6A5B' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#666666',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666666' }} />
            <input
              type="text"
              placeholder="Search treatment..."
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

      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {filteredServices.map((service, idx) => {
          const isFav = favorites.services.some((id) => id === service.id);

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid #F0E5E0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '180px' }}>
                <img src={service.image} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  onClick={() => toggleFavoriteService(service.id)}
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  <Heart size={18} fill={isFav ? '#EF6A5B' : 'none'} color={isFav ? '#EF6A5B' : '#666666'} />
                </button>

                <span
                  style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    left: '0.75rem',
                    backgroundColor: 'rgba(26, 26, 26, 0.85)',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {service.category}
                </span>
              </div>

              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1A1A1A' }}>{service.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', fontWeight: 700, color: '#EF6A5B' }}>
                      <Star size={14} fill="#EF6A5B" />
                      <span>{service.rating}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.825rem', color: '#666666', lineHeight: 1.4, marginBottom: '1rem' }}>
                    {service.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F0E5E0', paddingTop: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#666666', fontSize: '0.8rem' }}>
                      <Clock size={15} />
                      <span>{service.duration} mins</span>
                    </div>
                    <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#EF6A5B' }}>₹{service.price * 15}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      onClick={() => navigate(`/customer/services/${service.id}`)}
                      style={{
                        padding: '0.6rem',
                        borderRadius: '10px',
                        backgroundColor: '#FFFFFF',
                        color: '#1A1A1A',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        border: '1px solid #F0E5E0',
                        cursor: 'pointer',
                      }}
                    >
                      DETAILS
                    </button>

                    <button
                      onClick={() => navigate('/customer/booking', { state: { selectedServiceId: service.id } })}
                      style={{
                        padding: '0.6rem',
                        borderRadius: '10px',
                        backgroundColor: '#EF6A5B',
                        color: '#FFFFFF',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
