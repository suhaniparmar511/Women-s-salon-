import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Sparkles, Palette, Hand, Flower2, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/salonData';
import { SectionHeading } from './common/SectionHeading';
import { Button } from './common/Button';

export const Services = ({ onBookService }) => {
  const [activeCard, setActiveCard] = useState(null);

  const iconMap = {
    Scissors: Scissors,
    Sparkles: Sparkles,
    Palette: Palette,
    Hand: Hand,
    Flower2: Flower2,
  };

  return (
    <section
      id="services"
      style={{
        padding: '6rem 0',
        backgroundColor: 'var(--bg-section)',
        position: 'relative',
      }}
    >
      <div className="container">
        <SectionHeading
          tagline="OUR SERVICES"
          title="Beauty & Care,"
          highlight="Perfected For You"
          subtitle="Explore our comprehensive range of high-end beauty, hair, skin, and spa treatments."
        />

        {/* 5 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.75rem',
            marginTop: '3.5rem',
          }}
        >
          {SERVICES.map((service, index) => {
            const ServiceIcon = iconMap[service.icon] || Sparkles;
            const isHovered = activeCard === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setActiveCard(service.id)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '2.25rem 1.75rem',
                  border: isHovered ? '1.5px solid var(--primary-accent)' : '1.5px solid var(--border-color)',
                  boxShadow: isHovered ? '0 20px 40px rgba(239, 106, 91, 0.12)' : '0 4px 20px rgba(0, 0, 0, 0.03)',
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Minimalist Icon Badge */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: isHovered ? 'var(--primary-accent)' : 'var(--soft-peach)',
                    color: isHovered ? '#FFFFFF' : 'var(--primary-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ServiceIcon size={28} />
                </div>

                {/* Service Title */}
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: 'var(--text-main)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {service.title}
                </h3>

                {/* Short Subtitle */}
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: '1.5rem',
                    flexGrow: 1,
                  }}
                >
                  {service.description}
                </p>

                {/* Book Action Link */}
                <button
                  onClick={() => onBookService(service.title)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--primary-accent)',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>BOOK TREATMENT</span>
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
