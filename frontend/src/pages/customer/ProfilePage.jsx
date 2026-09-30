import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Sliders, CheckCircle2 } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const ProfilePage = () => {
  const { user, setUser, showToast } = useCustomer();

  const [activeTab, setActiveTab] = useState('personal');

  // Form states
  const [personalForm, setPersonalForm] = useState({
    name: user?.name || 'Alex Mercer',
    email: user?.email || 'alex@example.com',
    phone: user?.phone || '+91 98765 43215',
    dob: '1995-08-14',
    gender: 'Male',
  });

  const [prefForm, setPrefForm] = useState({
    barber: 'Marcus Vance',
    service: 'Premium Haircut',
    time: 'Afternoon (12 PM - 4 PM)',
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSavePersonal = (e) => {
    e.preventDefault();
    setUser({ ...user, ...personalForm });
    showToast('Profile updated successfully!');
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return;
    }
    showToast('Password changed successfully!');
    setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Profile Header Card */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '2rem', border: '1px solid #EEEEEE', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <img src={user?.avatar} alt={user?.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #FFF7F7' }} />
        <div>
          <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
            {user?.name}
          </h1>
          <span style={{ fontSize: '0.85rem', color: '#666666' }}>{user?.email} • {user?.phone}</span>
          <div style={{ marginTop: '0.5rem' }}>
            <span style={{ backgroundColor: '#FFF7F7', color: '#EF6A5B', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '9999px', textTransform: 'uppercase' }}>
              ROYAL MEMBER
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #EEEEEE', paddingBottom: '0.5rem' }}>
        {[
          { id: 'personal', label: 'Personal Info', icon: User },
          { id: 'preferences', label: 'Preferences', icon: Sliders },
          { id: 'security', label: 'Security', icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                border: 'none',
                backgroundColor: isActive ? '#FFF7F7' : 'transparent',
                color: isActive ? '#EF6A5B' : '#666666',
                cursor: 'pointer',
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PERSONAL INFORMATION */}
      {activeTab === 'personal' && (
        <form onSubmit={handleSavePersonal} style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '2rem', border: '1px solid #EEEEEE', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Full Name</label>
              <input
                type="text"
                required
                value={personalForm.name}
                onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Email Address</label>
              <input
                type="email"
                required
                value={personalForm.email}
                onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Phone</label>
              <input
                type="tel"
                required
                value={personalForm.phone}
                onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Date of Birth</label>
              <input
                type="date"
                value={personalForm.dob}
                onChange={(e) => setPersonalForm({ ...personalForm, dob: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Gender</label>
              <select
                value={personalForm.gender}
                onChange={(e) => setPersonalForm({ ...personalForm, gender: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            style={{
              alignSelf: 'flex-start',
              padding: '0.75rem 1.75rem',
              borderRadius: '9999px',
              backgroundColor: '#EF6A5B',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              marginTop: '0.5rem',
            }}
          >
            SAVE CHANGES
          </button>
        </form>
      )}

      {/* TAB 2: PREFERENCES */}
      {activeTab === 'preferences' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '2rem', border: '1px solid #EEEEEE', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Favorite Stylist / Barber</label>
            <select
              value={prefForm.barber}
              onChange={(e) => setPrefForm({ ...prefForm, barber: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
            >
              <option>Marcus Vance</option>
              <option>Sarah Chen</option>
              <option>David Park</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Preferred Service</label>
            <select
              value={prefForm.service}
              onChange={(e) => setPrefForm({ ...prefForm, service: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
            >
              <option>Premium Haircut</option>
              <option>Beard Trim & Shape</option>
              <option>Royal Shave</option>
              <option>Scalp Massage & Spa</option>
            </select>
          </div>

          <button
            onClick={() => showToast('Preferences updated!')}
            style={{
              alignSelf: 'flex-start',
              padding: '0.75rem 1.75rem',
              borderRadius: '9999px',
              backgroundColor: '#EF6A5B',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              marginTop: '0.5rem',
            }}
          >
            SAVE PREFERENCES
          </button>
        </div>
      )}

      {/* TAB 3: SECURITY & PASSWORD */}
      {activeTab === 'security' && (
        <form onSubmit={handleSavePassword} style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '2rem', border: '1px solid #EEEEEE', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Current Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showCurrent ? 'text' : 'password'}
                required
                value={securityForm.currentPassword}
                onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 2.5rem 0.75rem 0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#666666' }}
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showNew ? 'text' : 'password'}
                  required
                  value={securityForm.newPassword}
                  onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 2.5rem 0.75rem 0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#666666' }}
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Confirm New Password</label>
              <input
                type="password"
                required
                value={securityForm.confirmPassword}
                onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              alignSelf: 'flex-start',
              padding: '0.75rem 1.75rem',
              borderRadius: '9999px',
              backgroundColor: '#EF6A5B',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              marginTop: '0.5rem',
            }}
          >
            UPDATE PASSWORD
          </button>
        </form>
      )}
    </div>
  );
};
