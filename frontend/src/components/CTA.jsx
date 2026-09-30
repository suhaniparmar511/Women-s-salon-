import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import { Button } from './common/Button';

export const CTA = ({ onBookClick }) => {
  return (
    <section
      style={{
        padding: '5rem 0',
        backgroundColor: 'var(--bg-main)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          style={{
            background: 'linear-gradient(135deg, #FFD9CF 0%, #FFF7F3 50%, #F5E8DA 100%)',
            borderRadius: '32px',
            padding: '4.5rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 40px rgba(239, 106, 91, 0.1)',
          }}
        >
          {/* Abstract circles */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              left: '-50px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-50px',
              right: '-50px',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 106, 91, 0.08)',
              pointerEvents: 'none',
            }}
          />

          <span
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              color: 'var(--primary-accent)',
              display: 'block',
              marginBottom: '0.25rem',
            }}
          >
            Embrace Your Luxury Transformation
          </span>

          <h2
            style={{
              fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              color: 'var(--text-main)',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
            }}
          >
            Ready To Glow?
            <br />
            Book Your Appointment Today
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              margin: '0 auto 2.25rem',
              lineHeight: 1.6,
            }}
          >
            Experience individualized consultation, master stylists, and organic beauty therapy in a private setting.
          </p>

          <Button
            variant="primary"
            size="lg"
            icon={Calendar}
            onClick={onBookClick}
          >
            BOOK NOW
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
