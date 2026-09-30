import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Lock, Mail, User, Phone, ArrowLeft, CheckCircle2, Sparkles, Shield } from 'lucide-react';
import { authAPI } from '../services/api';

// Available roles in system
const ROLE_OPTIONS = [
  { id: 'Customer', label: 'Customer', defaultEmail: 'alex@example.com', defaultPass: 'customer123' },
  { id: 'Barber', label: 'Barber / Stylist', defaultEmail: 'marcus@salon.com', defaultPass: 'barber123' },
  { id: 'Receptionist', label: 'Receptionist', defaultEmail: 'emily@salon.com', defaultPass: 'recep123' },
  { id: 'Admin', label: 'Admin', defaultEmail: 'admin@salon.com', defaultPass: 'admin123' },
];

export const AuthModal = ({ isOpen, onClose, initialView = 'login', onAuthSuccess }) => {
  const [view, setView] = useState(initialView); // 'login' | 'register' | 'forgot-password'
  const [selectedRole, setSelectedRole] = useState('Customer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [loginForm, setLoginForm] = useState({ email: 'alex@example.com', password: 'customer123', rememberMe: true });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', agreeTerms: true, role: 'Customer' });
  const [forgotEmail, setForgotEmail] = useState('');

  if (!isOpen) return null;

  const handleRoleSelect = (roleObj) => {
    setSelectedRole(roleObj.id);
    setLoginForm({ ...loginForm, email: roleObj.defaultEmail, password: roleObj.defaultPass });
    setErrorMsg('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Real backend authentication API request with expected payload
      const res = await authAPI.login({
        email: loginForm.email,
        password: loginForm.password,
        role: selectedRole,
      });

      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
      }

      const userData = res.data?.user || {
        name: loginForm.email.split('@')[0],
        email: loginForm.email,
        role: selectedRole,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      };

      setLoading(false);
      onAuthSuccess(userData);
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || err.message || 'Login failed. Please check your credentials and role.';
      setErrorMsg(msg);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      setErrorMsg('Passwords do not match!');
      return;
    }
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await authAPI.register({
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        phone: registerForm.phone,
        role: registerForm.role || 'Customer',
      });

      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
      }

      const userData = res.data?.user || {
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: registerForm.role || 'Customer',
      };
      setLoading(false);
      onAuthSuccess(userData);
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || err.message || 'Registration failed. Please check your details and try again.';
      setErrorMsg(msg);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSubmitted(true);
  };

  const resetAndClose = () => {
    setForgotSubmitted(false);
    setErrorMsg('');
    setView('login');
    onClose();
  };

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
          backgroundColor: 'rgba(26, 26, 26, 0.65)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={resetAndClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{
            backgroundColor: '#FFFDFB',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '520px',
            padding: '2.5rem',
            boxShadow: '0 25px 50px -12px rgba(239, 106, 91, 0.25)',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '1px solid #F0E5E0',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={resetAndClose}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFF7F3',
              color: '#1A1A1A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #F0E5E0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <X size={18} />
          </button>

          {/* Top Brand */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontFamily: '"Cinzel", "Cormorant Garamond", "Playfair Display", serif',
                fontSize: '1.85rem',
                fontWeight: 400,
                color: '#222222',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              BEAUTY PLUS
            </h2>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '8px',
              }}
            >
              <span style={{ width: '28px', height: '1px', backgroundColor: '#F26B5E', display: 'inline-block' }} />
              <span
                style={{
                  color: '#F26B5E',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                WOMEN'S SALON
              </span>
              <span style={{ width: '28px', height: '1px', backgroundColor: '#F26B5E', display: 'inline-block' }} />
            </div>

            {view !== 'forgot-password' && (
              <div className="auth-tab-container">
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className={`auth-tab-btn ${view === 'login' ? 'active' : 'inactive'}`}
                >
                  LOG IN
                </button>
                <button
                  type="button"
                  onClick={() => setView('register')}
                  className={`auth-tab-btn ${view === 'register' ? 'active' : 'inactive'}`}
                >
                  CREATE ACCOUNT
                </button>
              </div>
            )}
          </div>

          {errorMsg && (
            <div style={{ padding: '0.75rem 1rem', borderRadius: '12px', backgroundColor: '#FFD9CF', color: '#1A1A1A', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem', textAlign: 'center', border: '1px solid #F58C7C' }}>
              {errorMsg}
            </div>
          )}

          {/* VIEW 1: LOGIN FORM WITH ROLE SELECTOR */}
          {view === 'login' && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleLoginSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}
            >
              {/* SELECT ROLE SECTION */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Shield size={14} color="#F26B5E" />
                  <span>SELECT ROLE</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {ROLE_OPTIONS.map((r) => {
                    const isSelected = selectedRole === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleRoleSelect(r)}
                        className={`auth-role-btn ${isSelected ? 'active' : 'inactive'}`}
                      >
                        {r.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'block' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666666' }} />
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.75rem',
                      borderRadius: '12px',
                      border: '1px solid #F0E5E0',
                      backgroundColor: '#FFF7F3',
                      fontSize: '0.9rem',
                      color: '#1A1A1A',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setView('forgot-password')}
                    style={{
                      fontSize: '0.75rem',
                      color: '#F26B5E',
                      fontWeight: 600,
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      padding: 0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666666' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 2.75rem 0.75rem 2.75rem',
                      borderRadius: '12px',
                      border: '1px solid #F0E5E0',
                      backgroundColor: '#FFF7F3',
                      fontSize: '0.9rem',
                      color: '#1A1A1A',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#666666' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={loginForm.rememberMe}
                  onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                  style={{ accentColor: '#F26B5E' }}
                />
                <label htmlFor="rememberMe" style={{ color: '#666666', cursor: 'pointer' }}>
                  Keep me logged in
                </label>
              </div>

              <button type="submit" className="auth-primary-btn">
                <Sparkles size={16} />
                <span>{loading ? 'AUTHENTICATING...' : `LOG IN AS ${selectedRole.toUpperCase()}`}</span>
              </button>
            </motion.form>
          )}

          {/* VIEW 2: REGISTRATION FORM */}
          {view === 'register' && (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleRegisterSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'block' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666666' }} />
                  <input
                    type="text"
                    required
                    placeholder="Alex Mercer"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.75rem',
                      borderRadius: '12px',
                      border: '1px solid #F0E5E0',
                      backgroundColor: '#FFF7F3',
                      fontSize: '0.9rem',
                      color: '#1A1A1A',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'block' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: '1px solid #F0E5E0',
                      backgroundColor: '#FFF7F3',
                      fontSize: '0.85rem',
                      color: '#1A1A1A',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'block' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: '1px solid #F0E5E0',
                      backgroundColor: '#FFF7F3',
                      fontSize: '0.85rem',
                      color: '#1A1A1A',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'block' }}>
                  Create Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666666' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 6 characters"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 2.75rem 0.75rem 2.75rem',
                      borderRadius: '12px',
                      border: '1px solid #F0E5E0',
                      backgroundColor: '#FFF7F3',
                      fontSize: '0.9rem',
                      color: '#1A1A1A',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#666666' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'block' }}>
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666666' }} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-enter password"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 2.75rem 0.75rem 2.75rem',
                      borderRadius: '12px',
                      border: '1px solid #F0E5E0',
                      backgroundColor: '#FFF7F3',
                      fontSize: '0.9rem',
                      color: '#1A1A1A',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#666666' }}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', margin: '0.25rem 0' }}>
                <input
                  type="checkbox"
                  id="agreeTerms"
                  required
                  checked={registerForm.agreeTerms}
                  onChange={(e) => setRegisterForm({ ...registerForm, agreeTerms: e.target.checked })}
                  style={{ accentColor: '#F26B5E' }}
                />
                <label htmlFor="agreeTerms" style={{ color: '#666666', cursor: 'pointer' }}>
                  I agree to the <span style={{ color: '#F26B5E', fontWeight: 600 }}>Terms of Service & Privacy Policy</span>
                </label>
              </div>

              <button type="submit" className="auth-primary-btn">
                <Sparkles size={16} />
                <span>{loading ? 'REGISTERING...' : 'CREATE ACCOUNT & OPEN PORTAL'}</span>
              </button>
            </motion.form>
          )}

          {/* VIEW 3: FORGOT PASSWORD */}
          {view === 'forgot-password' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <button
                onClick={() => setView('login')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#F26B5E',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  marginBottom: '1rem',
                  textDecoration: 'none',
                  padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                <ArrowLeft size={16} />
                <span>BACK TO LOGIN</span>
              </button>

              {!forgotSubmitted ? (
                <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A' }}>
                    Reset Your Password
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#666666', lineHeight: 1.5 }}>
                    Enter your registered email address below. We'll send you an instant reset link to create a new password.
                  </p>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem', display: 'block' }}>
                      Your Email Address
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666666' }} />
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem 0.75rem 2.75rem',
                          borderRadius: '12px',
                          border: '1px solid #F0E5E0',
                          backgroundColor: '#FFF7F3',
                          fontSize: '0.9rem',
                          color: '#1A1A1A',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <button type="submit" className="auth-primary-btn">
                    <span>SEND RESET LINK</span>
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: '#FFF7F3',
                      color: '#F26B5E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.25rem',
                    }}
                  >
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A' }}>
                    Reset Link Sent!
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.5rem', lineHeight: 1.5 }}>
                    We have dispatched password recovery instructions to <strong>{forgotEmail || 'your email'}</strong>.
                  </p>
                  <button onClick={() => setView('login')} className="auth-primary-btn" style={{ marginTop: '1.5rem' }}>
                    <span>RETURN TO LOGIN</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
