import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './common/Button';

export const About = ({ onBookClick }) => {
  return (
    <section
      id="about"
      style={{
        padding: '6.5rem 0',
        backgroundColor: 'var(--bg-main)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Queen Profile Line-Art Watermark */}
      <div
        style={{
          position: 'absolute',
          right: '2%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '380px',
          height: '480px',
          opacity: 0.12,
          pointerEvents: 'none',
          color: 'var(--primary-accent)',
        }}
      >
        <svg viewBox="0 0 200 260" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Queen Crown */}
          <path d="M70 40 L90 60 L100 30 L110 60 L130 40 L125 75 L75 75 Z" strokeLinejoin="round" />
          <circle cx="70" cy="38" r="2.5" fill="currentColor" />
          <circle cx="100" cy="28" r="3" fill="currentColor" />
          <circle cx="130" cy="38" r="2.5" fill="currentColor" />
          {/* Elegant Woman Profile Contour */}
          <path d="M110 75 Q125 85 130 100 Q135 115 125 130 Q120 135 122 145 Q126 150 120 160 Q110 170 95 175 Q85 190 70 210 Q60 230 40 250" />
          {/* Flowing Waves Hair Lines */}
          <path d="M75 75 C60 90 50 110 52 140 C54 170 45 190 30 220" />
          <path d="M80 80 C68 100 60 120 62 155 C64 180 55 200 40 235" />
        </svg>
      </div>

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* LEFT: Overlapping Luxury Images Layout */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            style={{
              gridColumn: 'span 12',
              position: 'relative',
            }}
            className="about-left-col"
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '1rem',
                position: 'relative',
              }}
            >
              {/* Main Salon Interior Image */}
              <div
                style={{
                  gridColumn: 'span 7',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
                  height: '380px',
                  border: '3px solid #FFFFFF',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80"
                  alt="Beauty Plus Interior"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Stacked Overlapping Right Images */}
              <div
                style={{
                  gridColumn: 'span 5',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    height: '180px',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.06)',
                    border: '3px solid #FFFFFF',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
                    alt="Makeup Care"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div
                  style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    height: '180px',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.06)',
                    border: '3px solid #FFFFFF',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80"
                    alt="Hair Treatment"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Content & Story */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            style={{
              gridColumn: 'span 12',
            }}
            className="about-right-col"
          >
            {/* Tagline */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--primary-accent)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              <span>ABOUT US</span>
              <div style={{ height: '1px', width: '30px', backgroundColor: 'var(--primary-accent)' }} />
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--text-main)',
                lineHeight: 1.12,
                marginBottom: '1.25rem',
              }}
            >
              Where Beauty{' '}
              <span
                style={{
                  fontFamily: 'var(--font-script)',
                  color: 'var(--primary-accent)',
                  fontWeight: 400,
                  fontSize: '1.25em',
                  display: 'block',
                }}
              >
                Meets Elegance
              </span>
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '1.25rem',
              }}
            >
              At Beauty Plus Women's Salon, we believe every woman deserves to look and feel her absolute best. Our master stylists and estheticians provide tailored, high-end care using only premium organic products in a peaceful, luxurious environment.
            </p>

            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: '2.25rem',
              }}
            >
              From bespoke hair treatments and glowing facials to opulent bridal packages, we prioritize hygiene, comfort, and unmatched artistry in every session.
            </p>

            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              onClick={onBookClick}
            >
              DISCOVER MORE
            </Button>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-left-col {
            grid-column: span 6 !important;
          }
          .about-right-col {
            grid-column: span 6 !important;
          }
        }
      `}</style>
    </section>
  );
};
