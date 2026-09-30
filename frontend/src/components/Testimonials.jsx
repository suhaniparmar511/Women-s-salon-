import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/salonData';
import { SectionHeading } from './common/SectionHeading';

export const Testimonials = () => {
  return (
    <section
      style={{
        padding: '6rem 0',
        backgroundColor: 'var(--bg-section)',
        position: 'relative',
      }}
    >
      <div className="container">
        <SectionHeading
          tagline="WHAT OUR CLIENTS SAY"
          title="Loved By Thousands Of"
          highlight="Glamorous Women"
          subtitle="Read real experiences from our valued clients who trust us for their beauty transformations."
        />

        {/* 3 Cards Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '3.5rem',
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '2.5rem 2rem',
                border: '1px solid var(--border-color)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
              whileHover={{
                y: -6,
                borderColor: 'var(--soft-peach)',
                boxShadow: '0 20px 40px rgba(239, 106, 91, 0.1)',
              }}
            >
              <div>
                {/* Quote Mark */}
                <div style={{ color: 'var(--primary-accent)', marginBottom: '1rem', opacity: 0.8 }}>
                  <Quote size={36} />
                </div>

                {/* Review Text */}
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-main)',
                    lineHeight: 1.65,
                    fontStyle: 'italic',
                    marginBottom: '2rem',
                  }}
                >
                  "{t.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--bg-section)',
                }}
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--soft-peach)',
                  }}
                />

                <div style={{ flexGrow: 1 }}>
                  <h4
                    style={{
                      fontSize: '1.05rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                    }}
                  >
                    {t.name}
                  </h4>

                  {/* 5 Coral Stars */}
                  <div style={{ display: 'flex', gap: '3px', marginTop: '2px' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="var(--primary-accent)" color="var(--primary-accent)" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
