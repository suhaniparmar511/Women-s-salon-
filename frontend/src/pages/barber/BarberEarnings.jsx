import React from 'react';
import { DollarSign, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const BarberEarnings = () => {
  const { user } = useCustomer();

  const wages = [
    { id: 'WG-701', date: '2026-07-14', service: 'Royal Full Grooming Package', serviceAmount: 60, commissionRate: 30, commissionEarned: 18, tips: 5, totalEarning: 23, status: 'Paid' },
    { id: 'WG-702', date: '2026-07-13', service: 'Premium Haircut & Beard Trim', serviceAmount: 35, commissionRate: 30, commissionEarned: 10.5, tips: 3, totalEarning: 13.5, status: 'Paid' },
    { id: 'WG-703', date: '2026-07-11', service: 'Hair Coloring & Haircut', serviceAmount: 50, commissionRate: 30, commissionEarned: 15, tips: 4, totalEarning: 19, status: 'Paid' },
    { id: 'WG-704', date: '2026-07-08', service: 'Scalp Treatment & Head Massage', serviceAmount: 40, commissionRate: 30, commissionEarned: 12, tips: 2, totalEarning: 14, status: 'Paid' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          Earnings & Wage Breakdown
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Track your completed service commissions, tips, and monthly wage totals.
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        {[
          { label: 'Commission Rate', val: '30%', icon: TrendingUp },
          { label: 'Monthly Earnings', val: '₹18,450', icon: DollarSign },
          { label: 'Total Tips Earned', val: '₹2,100', icon: CheckCircle2 },
          { label: 'Completed Services', val: '42 Sessions', icon: Calendar },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '1.25rem', border: '1px solid #EEEEEE', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FFF7F7', color: '#EF6A5B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase' }}>{s.label}</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#151515', marginTop: '2px' }}>{s.val}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Wages Log Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE' }}>
        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515', marginBottom: '1.25rem' }}>
          Recent Wage Log & Service Commissions
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #EEEEEE', color: '#666666', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                <th style={{ padding: '0.75rem' }}>ID</th>
                <th style={{ padding: '0.75rem' }}>Date</th>
                <th style={{ padding: '0.75rem' }}>Service</th>
                <th style={{ padding: '0.75rem' }}>Gross Price</th>
                <th style={{ padding: '0.75rem' }}>Commission</th>
                <th style={{ padding: '0.75rem' }}>Tips</th>
                <th style={{ padding: '0.75rem' }}>Total Payout</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {wages.map((w) => (
                <tr key={w.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>{w.id}</td>
                  <td style={{ padding: '0.75rem', color: '#666666' }}>{w.date}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 600, color: '#151515' }}>{w.service}</td>
                  <td style={{ padding: '0.75rem' }}>₹{w.serviceAmount * 15}</td>
                  <td style={{ padding: '0.75rem' }}>₹{w.commissionEarned * 15} ({w.commissionRate}%)</td>
                  <td style={{ padding: '0.75rem' }}>₹{w.tips * 15}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>₹{w.totalEarning * 15}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ backgroundColor: '#E6F4EA', color: '#137333', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                      {w.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
