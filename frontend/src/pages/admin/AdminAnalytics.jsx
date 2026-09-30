import React from 'react';
import { TrendingUp, Users, CalendarCheck, ShoppingBag, Award } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const AdminAnalytics = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          Salon Performance & Revenue Analytics
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Real-time metrics for revenue, appointment volume, employee performance, and service popularity.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        {[
          { label: 'Monthly Gross Revenue', val: '₹1,24,500', growth: '+14.2% vs last month', icon: TrendingUp },
          { label: 'Appointment Volume', val: '210 Sessions', growth: '+8.5% growth', icon: CalendarCheck },
          { label: 'Product Store Sales', val: '₹28,400', growth: '+19.0% sales', icon: ShoppingBag },
          { label: 'Top Performer', val: 'Marcus Vance', growth: '4.9 ★ Rating (42 Sessions)', icon: Award },
        ].map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.label} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '1.25rem', border: '1px solid #EEEEEE', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#FFF7F7', color: '#EF6A5B', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <Icon size={20} />
              </div>
              <span style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase' }}>{a.label}</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#151515', marginTop: '2px' }}>{a.val}</h3>
              <span style={{ fontSize: '0.75rem', color: '#137333', fontWeight: 600, display: 'block', marginTop: '0.25rem' }}>{a.growth}</span>
            </div>
          );
        })}
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE' }}>
        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515', marginBottom: '1rem' }}>
          Top Requested Services & Revenue Share
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { service: 'Premium Haircut & Styling', count: 84, revenue: '₹42,000', pct: 85 },
            { service: 'Beard Trim & Precision Shape', count: 62, revenue: '₹18,600', pct: 65 },
            { service: 'Hair Coloring - Jet Black', count: 35, revenue: '₹26,250', pct: 50 },
            { service: 'Royal Spa & Head Massage', count: 29, revenue: '₹17,400', pct: 40 },
          ].map((item) => (
            <div key={item.service} style={{ padding: '1rem', borderRadius: '12px', backgroundColor: '#FFF7F7', border: '1px solid #EEEEEE' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 700 }}>
                <span style={{ color: '#151515' }}>{item.service} ({item.count} sessions)</span>
                <span style={{ color: '#EF6A5B' }}>{item.revenue}</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#EEEEEE', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${item.pct}%`, height: '100%', backgroundColor: '#EF6A5B', borderRadius: '9999px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
