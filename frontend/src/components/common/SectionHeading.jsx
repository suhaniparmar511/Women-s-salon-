import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeading = ({
  tagline,
  title,
  highlight,
  subtitle,
  center = true,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      style={{
        textAlign: center ? 'center' : 'left',
        marginBottom: '3rem',
      }}
      className={className}
    >
      {tagline && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--primary-accent)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}
        >
          <span style={{ height: '1px', width: '24px', backgroundColor: 'var(--primary-accent)', opacity: 0.7 }} />
          <span>{tagline}</span>
          <span style={{ height: '1px', width: '24px', backgroundColor: 'var(--primary-accent)', opacity: 0.7 }} />
        </div>
      )}

      {title && (
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-main)',
            fontWeight: 600,
            lineHeight: 1.15,
            marginTop: '0.25rem',
          }}
        >
          {title}{' '}
          {highlight && (
            <span
              style={{
                color: 'var(--primary-accent)',
                fontFamily: 'var(--font-script)',
                fontWeight: 400,
                fontSize: '1.2em',
                display: 'inline-block',
                marginLeft: '0.2rem',
              }}
            >
              {highlight}
            </span>
          )}
        </h2>
      )}

      {subtitle && (
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: center ? '600px' : '100%',
            margin: center ? '0.75rem auto 0' : '0.75rem 0 0',
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
