import React from 'react';
import { motion } from 'framer-motion';
import { Crown, BadgeCheck, Cpu, Feather } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/salonData';
import { SectionHeading } from './common/SectionHeading';

export const WhyChooseUs = () => {
  const iconMap = {
    Crown: Crown,
    BadgeCheck: BadgeCheck,
    Cpu: Cpu,
    Feather: Feather,
  };

  return (
    <section
      id="packages"
      style={{
        padding: '6rem 0',
        backgroundColor: 'var(--bg-section)',
        position: 'relative',
      }}
    >
      <div className="container">
        <SectionHeading
          tagline="WHY CHOOSE US"
          title="The Beauty Plus"
          highlight="Experience"
          subtitle="Uncompromising luxury, certified master artists, and bespoke beauty treatments."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
            marginTop: '3.5rem',
          }}
        >
          {WHY_CHOOSE_US.map((item, idx) => {
            const ItemIcon = iconMap[item.icon] || Crown;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '2.5rem 2rem',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
                whileHover={{
                  y: -6,
                  borderColor: 'var(--soft-peach)',
                  boxShadow: '0 20px 40px rgba(239, 106, 91, 0.1)',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--soft-peach)',
                    color: 'var(--primary-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <ItemIcon size={26} />
                </div>

                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
