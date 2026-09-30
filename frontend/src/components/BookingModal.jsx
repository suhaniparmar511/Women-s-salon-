import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Sparkles, CheckCircle2, User, Phone, Mail } from 'lucide-react';
import { SERVICES } from '../data/salonData';
import { Button } from './common/Button';

export const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: SERVICES[0]?.title || 'HAIR CARE',
    date: '',
    time: '11:00 AM',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          backgroundColor: 'rgba(26, 26, 26, 0.4)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '560px',
            padding: '2.5rem',
            boxShadow: '0 25px 50px -12px rgba(239, 106, 91, 0.25)',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '1px solid var(--border-color)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-section)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <X size={18} />
          </button>

          {!submitted ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-script)',
                    fontSize: '1.75rem',
                    color: 'var(--primary-accent)',
                    display: 'block',
                  }}
                >
                  Beauty Plus Luxury Salon
                </span>
                <h3
                  style={{
                    fontSize: '1.85rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                  }}
                >
                  Book Your Appointment
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Select your treatment and reserve a private luxury session.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'block' }}>
                    Select Treatment
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-main)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      color: 'var(--text-main)',
                    }}
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} — {s.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'block' }}>
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-main)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'block' }}>
                      Preferred Time
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-main)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    >
                      <option>10:00 AM</option>
                      <option>11:30 AM</option>
                      <option>01:00 PM</option>
                      <option>02:30 PM</option>
                      <option>04:00 PM</option>
                      <option>05:30 PM</option>
                      <option>07:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'block' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sophia Reynolds"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-main)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'block' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-main)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'block' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sophia@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-main)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <Button type="submit" variant="primary" size="lg" icon={Sparkles} iconPosition="right" style={{ marginTop: '0.5rem', width: '100%' }}>
                  CONFIRM APPOINTMENT
                </Button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-section)',
                  color: 'var(--primary-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                }}
              >
                <CheckCircle2 size={40} />
              </motion.div>
              <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: 'var(--text-main)', fontWeight: 700 }}>
                Reservation Confirmed!
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
                Thank you, <strong style={{ color: 'var(--text-main)' }}>{formData.name}</strong>. We have reserved your luxury <strong>{formData.service}</strong> session for <strong>{formData.date || 'your selected date'}</strong> at <strong>{formData.time}</strong>.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <Button onClick={handleReset} variant="primary" size="md">
                  CLOSE WINDOW
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
