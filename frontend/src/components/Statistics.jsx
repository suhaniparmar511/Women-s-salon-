import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, CalendarCheck, Trophy, Star } from 'lucide-react';
import { STATS } from '../data/salonData';

export const Statistics = () => {
  const iconMap = {
    Users: Users,
    Award: Award,
    CalendarCheck: CalendarCheck,
    Trophy: Trophy,
    Star: Star,
  };

  return (
    <section
      style={{
        padding: '3rem 0',
        backgroundColor: 'var(--bg-main)',
        position: 'relative',
        zIndex: 10,
        marginTop: '-2rem',
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            boxShadow: '0 15px 35px rgba(239, 106, 91, 0.08)',
            border: '1px solid var(--border-color)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {STATS.map((stat, idx) => {
            const StatIcon = iconMap[stat.icon] || Star;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                {/* Minimal Icon */}
                <div
                  style={{
                    color: 'var(--primary-accent)',
                    marginBottom: '0.75rem',
                    opacity: 0.9,
                  }}
                >
                  <StatIcon size={28} />
                </div>

                {/* Big Stat Value */}
                <span
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    lineHeight: 1,
                    marginBottom: '0.35rem',
                  }}
                >
                  {stat.value}
                </span>

                {/* Label */}
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
