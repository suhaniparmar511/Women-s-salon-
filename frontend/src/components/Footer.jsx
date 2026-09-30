import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUp } from 'lucide-react';
import { NAV_LINKS, SERVICES, CONTACT_INFO } from '../data/salonData';

const SocialIcon = ({ type }) => {
  switch (type) {
    case 'facebook':
      return (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.77 5.6c1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      );
    default:
      return null;
  }
};

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '5rem',
        paddingBottom: '2rem',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* 5 Column Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Col 1: Logo & Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--soft-peach)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-accent)',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 2 6.5 5 8" />
                  <path d="M12 2c2.5 0 5 1.5 6.5 3.5C20 7.5 20.5 10 20 12.5c-.5 2.5-2 4.5-4 5.5" />
                  <path d="M16 8c-1-1-2.5-1.5-4-1.5-3 0-5.5 2.5-5.5 5.5 0 1.5.5 3 1.5 4" />
                </svg>
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    lineHeight: 1,
                    display: 'block',
                  }}
                >
                  BEAUTY PLUS
                </span>
                <span
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: 'var(--primary-accent)',
                    fontWeight: 600,
                  }}
                >
                  WOMEN'S SALON
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Experience premium beauty & personalized care designed to bring out your best.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              {['facebook', 'instagram', 'youtube', 'whatsapp'].map((type) => (
                <a
                  key={type}
                  href="#"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-section)',
                    color: 'var(--primary-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary-accent)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-section)';
                    e.currentTarget.style.color = 'var(--primary-accent)';
                  }}
                >
                  <SocialIcon type={type} />
                </a>
              ))}
            </div>
          </div>


          {/* Col 2: Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--primary-accent)',
                marginBottom: '1.25rem',
              }}
            >
              QUICK LINKS
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--primary-accent)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--primary-accent)',
                marginBottom: '1.25rem',
              }}
            >
              OUR SERVICES
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {SERVICES.map((srv) => (
                <li key={srv.id}>
                  <a
                    href="#services"
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--primary-accent)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                  >
                    {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--primary-accent)',
                marginBottom: '1.25rem',
              }}
            >
              CONTACT US
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={16} color="var(--primary-accent)" />
                <span>{CONTACT_INFO.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={16} color="var(--primary-accent)" />
                <span>{CONTACT_INFO.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={18} color="var(--primary-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{CONTACT_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Col 5: Working Hours */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--primary-accent)',
                marginBottom: '1.25rem',
              }}
            >
              WORKING HOURS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {CONTACT_INFO.hours.map((h, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{h.days}</span>
                  <span style={{ fontSize: '0.8rem' }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright strip & Back to top button */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span>© 2025 Beauty Plus Women's Salon. All Rights Reserved.</span>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-accent)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(239, 106, 91, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};
