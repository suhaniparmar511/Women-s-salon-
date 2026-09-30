import React from 'react';
import { DollarSign, CheckCircle2, Clock } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const AdminWages = () => {
  const { showToast } = useCustomer();

  const wagesData = [
    { id: 'WG-701', employee: 'Marcus Vance', role: 'Barber', service: 'Royal Full Grooming Package', serviceAmount: 60, commissionRate: 30, commissionEarned: 18, tips: 5, totalPayout: 23, status: 'Paid' },
    { id: 'WG-702', employee: 'Sarah Chen', role: 'Barber', service: 'Premium Haircut & Styling', serviceAmount: 40, commissionRate: 30, commissionEarned: 12, tips: 4, totalPayout: 16, status: 'Paid' },
    { id: 'WG-703', employee: 'David Park', role: 'Barber', service: 'Beard Trim & Facial Treatment', serviceAmount: 45, commissionRate: 25, commissionEarned: 11.25, tips: 3, totalPayout: 14.25, status: 'Pending' },
    { id: 'WG-704', employee: 'Emily Roberts', role: 'Receptionist', service: 'Monthly Base Salary', serviceAmount: 1200, commissionRate: 0, commissionEarned: 0, tips: 0, totalPayout: 1200, status: 'Paid' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          Wages & Employee Commissions
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Audit service revenues, commission calculations, tips, and payroll payouts.
        </p>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #EEEEEE', color: '#666666', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                <th style={{ padding: '0.75rem' }}>Log ID</th>
                <th style={{ padding: '0.75rem' }}>Employee</th>
                <th style={{ padding: '0.75rem' }}>Role</th>
                <th style={{ padding: '0.75rem' }}>Service / Base</th>
                <th style={{ padding: '0.75rem' }}>Service Rev</th>
                <th style={{ padding: '0.75rem' }}>Commission %</th>
                <th style={{ padding: '0.75rem' }}>Commission</th>
                <th style={{ padding: '0.75rem' }}>Total Payout</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {wagesData.map((w) => (
                <tr key={w.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>{w.id}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{w.employee}</td>
                  <td style={{ padding: '0.75rem' }}>{w.role}</td>
                  <td style={{ padding: '0.75rem', color: '#666666' }}>{w.service}</td>
                  <td style={{ padding: '0.75rem' }}>₹{w.serviceAmount * 15}</td>
                  <td style={{ padding: '0.75rem' }}>{w.commissionRate}%</td>
                  <td style={{ padding: '0.75rem' }}>₹{w.commissionEarned * 15}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>₹{w.totalPayout * 15}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ backgroundColor: w.status === 'Paid' ? '#E6F4EA' : '#FEF3C7', color: w.status === 'Paid' ? '#137333' : '#D97706', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
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
