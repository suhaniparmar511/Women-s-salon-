import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Users, CalendarCheck, Package, Scissors, DollarSign, ShieldAlert, ArrowRight, AlertTriangle } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { services, barbers, products, appointments } = useCustomer();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #FFF7F3 0%, #FFFFFF 100%)',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid #F0E5E0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#EF6A5B' }}>
            SALON MANAGEMENT SYSTEM
          </span>
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A', marginTop: '0.25rem' }}>
            Executive Admin Control 👑
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#666666', marginTop: '0.25rem' }}>
            Complete administrative overview of finances, active staff, inventory, and appointment trends.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/analytics')}
          style={{
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px',
            backgroundColor: '#EF6A5B',
            color: '#FFFFFF',
            fontSize: '0.85rem',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(239, 106, 91, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>ANALYTICS & REPORTS</span>
          <ArrowRight size={16} />
        </button>
      </motion.div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        {[
          { label: 'Total Revenue', val: '₹1,24,500', icon: TrendingUp },
          { label: 'Active Staff', val: `${barbers.length + 2} Employees`, icon: Users },
          { label: 'Monthly Sessions', val: `${appointments.length * 5} Appts`, icon: CalendarCheck },
          { label: 'Inventory Stock', val: '350 Units', icon: Package },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '1.25rem', border: '1px solid #F0E5E0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FFF7F3', color: '#EF6A5B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666666', textTransform: 'uppercase' }}>{m.label}</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1A1A1A', marginTop: '2px' }}>{m.val}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.75rem' }}>
        <div style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="admin-col-left">
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #F0E5E0' }}>
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#1A1A1A', marginBottom: '1.25rem' }}>
              Administrative Modules
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {[
                { title: 'Staff Management', desc: 'Add/edit barbers, receptionists & working hours', path: '/admin/staff', icon: Users },
                { title: 'Services Catalog', desc: 'Manage prices, durations & service categories', path: '/admin/services', icon: Scissors },
                { title: 'Inventory & Supplies', desc: 'Monitor stock levels, reorder thresholds & suppliers', path: '/admin/inventory', icon: Package },
                { title: 'Wages & Commissions', desc: 'Track employee commission rates & payouts', path: '/admin/wages', icon: DollarSign },
              ].map((mod) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={mod.title}
                    onClick={() => navigate(mod.path)}
                    style={{ padding: '1.25rem', borderRadius: '16px', border: '1px solid #F0E5E0', backgroundColor: '#FFF7F3', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    <div>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#FFFFFF', color: '#EF6A5B', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                        <Icon size={20} />
                      </div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1A1A1A' }}>{mod.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: '#666666', marginTop: '0.25rem' }}>{mod.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
