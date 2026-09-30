import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Play, Scissors, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { HERO_FEATURES } from '../data/salonData';
import { Button } from './common/Button';

export const Hero = ({ onBookClick, onWatchVideoClick }) => {
  const iconMap = {
    Scissors: Scissors,
    Sparkles: Sparkles,
    ShieldCheck: ShieldCheck,
    Heart: Heart,
  };

  // Floating petals coordinates for micro-animation
  const petals = [
    { id: 1, left: '15%', delay: 0, duration: 8, scale: 0.8 },
    { id: 2, left: '45%', delay: 2, duration: 10, scale: 1.2 },
    { id: 3, left: '75%', delay: 1, duration: 9, scale: 0.9 },
    { id: 4, left: '88%', delay: 3, duration: 11, scale: 1.1 },
  ];

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '7.5rem',
        paddingBottom: '4rem',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #FFFDFB 0%, #FFF7F3 60%, #FFD9CF 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background Soft Abstract Circles */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 217, 207, 0.4) 0%, rgba(245, 232, 218, 0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 232, 218, 0.5) 0%, rgba(255, 253, 251, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Animated Rose Petals */}
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -50, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '90vh'],
            x: ['0px', '30px', '-20px', '0px'],
            opacity: [0, 0.6, 0.6, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: p.left,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--secondary-accent)" opacity="0.35">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              gridColumn: 'span 12',
            }}
            className="hero-left-col"
          >
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                color: 'var(--primary-accent)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}
            >
              <span>Embrace the Beauty in You</span>
              <span style={{ fontSize: '1.2rem' }}>♡</span>
            </motion.div>

            {/* Main Heading */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--text-main)',
                lineHeight: 1.08,
                letterSpacing: '-0.01em',
                marginBottom: '1.25rem',
              }}
            >
              LOOK BEAUTIFUL.
              <br />
              FEEL <span style={{ color: 'var(--primary-accent)' }}>CONFIDENT.</span>
            </h1>

            {/* Decorative floral underline bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem',
                color: 'var(--secondary-accent)',
              }}
            >
              <div style={{ height: '1px', width: '60px', backgroundColor: 'var(--secondary-accent)' }} />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
              <div style={{ height: '1px', width: '60px', backgroundColor: 'var(--secondary-accent)' }} />
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                color: 'var(--text-secondary)',
                maxWidth: '520px',
                lineHeight: 1.65,
                marginBottom: '2rem',
              }}
            >
              Experience premium beauty & personalized care designed to bring out your best in a luxurious, serene sanctuary.
            </p>

            {/* Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1.25rem',
                marginBottom: '3.5rem',
              }}
            >
              <Button
                variant="primary"
                size="lg"
                icon={Calendar}
                onClick={onBookClick}
              >
                BOOK APPOINTMENT
              </Button>

              <Button
                variant="outline"
                size="lg"
                icon={Play}
                onClick={onWatchVideoClick}
              >
                WATCH VIDEO
              </Button>
            </div>

            {/* 4 Feature Badges Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1.25rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-color)',
              }}
            >
              {HERO_FEATURES.map((feature) => {
                const FeatureIcon = iconMap[feature.icon] || Sparkles;
                return (
                  <div key={feature.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--soft-peach)',
                        color: 'var(--primary-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <FeatureIcon size={18} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        color: 'var(--text-main)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {feature.title}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {feature.subtitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Woman Portrait with Floral Circular Arch Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              gridColumn: 'span 12',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="hero-right-col"
          >
            {/* Soft Circular Frame Artwork behind */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '520px',
                aspectRatio: '4/5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Golden/Coral Outer Decorative Ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-12px',
                  borderRadius: '50% 50% 45% 45%',
                  border: '1.5px solid var(--secondary-accent)',
                  opacity: 0.6,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: '-24px',
                  borderRadius: '50% 50% 45% 45%',
                  border: '1px stroke var(--soft-peach)',
                  opacity: 0.4,
                  pointerEvents: 'none',
                }}
              />

              {/* Elegant Botanical Illustration Leaf Overlays */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '-30px',
                  width: '140px',
                  height: '140px',
                  opacity: 0.75,
                  pointerEvents: 'none',
                  zIndex: 3,
                }}
              >
                <svg viewBox="0 0 100 100" fill="none" stroke="var(--primary-accent)">
                  <path d="M10 90 Q40 50 80 10 M30 70 Q50 50 65 35 M20 80 Q35 70 45 55 M50 50 Q65 40 75 25" strokeWidth="1.5" />
                  <ellipse cx="65" cy="35" rx="5" ry="10" transform="rotate(-30 65 35)" fill="var(--soft-peach)" opacity="0.8" />
                  <ellipse cx="45" cy="55" rx="4" ry="8" transform="rotate(-40 45 55)" fill="var(--soft-peach)" opacity="0.8" />
                </svg>
              </div>

              {/* Bottom Right Floral Artwork Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-30px',
                  right: '-30px',
                  width: '160px',
                  height: '160px',
                  opacity: 0.85,
                  pointerEvents: 'none',
                  zIndex: 3,
                }}
              >
                <svg viewBox="0 0 120 120" fill="none">
                  {/* Flower Petals */}
                  <circle cx="60" cy="60" r="18" fill="var(--secondary-accent)" opacity="0.9" />
                  <path d="M60 20 Q70 40 60 60 Q50 40 60 20Z" fill="var(--soft-peach)" />
                  <path d="M100 60 Q80 70 60 60 Q80 50 100 60Z" fill="var(--soft-peach)" />
                  <path d="M60 100 Q50 80 60 60 Q70 80 60 100Z" fill="var(--soft-peach)" />
                  <path d="M20 60 Q40 50 60 60 Q40 70 20 60Z" fill="var(--soft-peach)" />
                  <circle cx="60" cy="60" r="8" fill="var(--primary-accent)" />
                </svg>
              </div>

              {/* Main Woman Image Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '260px 260px 180px 180px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(239, 106, 91, 0.15)',
                  border: '4px solid #FFFFFF',
                  zIndex: 2,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85"
                  alt="Beauty Plus Luxury Woman"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-left-col {
            grid-column: span 7 !important;
          }
          .hero-right-col {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </section>
  );
};
