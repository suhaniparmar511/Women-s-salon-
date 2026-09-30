import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/salonData';
import { SectionHeading } from './common/SectionHeading';

export const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const categories = ['All', 'Hair', 'Skin', 'Makeup', 'Nails', 'Spa'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section
      id="gallery"
      style={{
        padding: '6rem 0',
        backgroundColor: 'var(--bg-main)',
        position: 'relative',
      }}
    >
      <div className="container">
        <SectionHeading
          tagline="OUR GALLERY"
          title="A Glimpse Of"
          highlight="Pure Beauty"
          subtitle="Take a tour through our luxury transformations, serene aesthetic lounge, and beauty artistry."
        />

        {/* Filter Category Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
          }}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: isActive ? '1px solid var(--primary-accent)' : '1px solid var(--border-color)',
                  backgroundColor: isActive ? 'var(--primary-accent)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Masonry Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveImage(item)}
                whileHover="hover"
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  variants={{
                    hover: { scale: 1.08 },
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Subtle Overlay */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(26, 26, 26, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.5rem',
                    color: '#FFFFFF',
                  }}
                  initial={{ opacity: 0 }}
                  variants={{
                    hover: { opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <Maximize2 size={18} color="#FFFFFF" />
                  </div>
                  <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.9 }}>
                    {item.category}
                  </span>
                  <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', fontWeight: 600 }}>
                    {item.title}
                  </h4>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0,0,0,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              backdropFilter: 'blur(8px)',
            }}
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ position: 'relative', maxWidth: '900px', maxHeight: '85vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                style={{
                  position: 'absolute',
                  top: '-3rem',
                  right: '0',
                  color: '#FFFFFF',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                }}
              >
                <X size={32} />
              </button>
              <img
                src={activeImage.image}
                alt={activeImage.title}
                style={{
                  width: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                }}
              />
              <p
                style={{
                  color: '#FFFFFF',
                  textAlign: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  marginTop: '1rem',
                }}
              >
                {activeImage.title}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
