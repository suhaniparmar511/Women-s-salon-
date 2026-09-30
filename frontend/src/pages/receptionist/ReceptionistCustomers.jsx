import React, { useState } from 'react';
import { Search, User, Phone, Mail, CalendarCheck } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const ReceptionistCustomers = () => {
  const [search, setSearch] = useState('');

  const customers = [
    { id: 'CUST-001', name: 'Alex Mercer', email: 'alex@example.com', phone: '+91 98765 43215', totalVisits: 12, lastVisit: '12 Jul 2026', totalSpent: 8400 },
    { id: 'CUST-002', name: 'Jessica Wilson', email: 'jessica@example.com', phone: '+91 98765 43216', totalVisits: 8, lastVisit: '08 Jul 2026', totalSpent: 5600 },
    { id: 'CUST-003', name: 'Ryan Thompson', email: 'ryan@example.com', phone: '+91 98765 43217', totalVisits: 5, lastVisit: '02 Jul 2026', totalSpent: 3500 },
  ];

  const filtered = customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          Customer Directory & Lookup
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Search client records by name, email or phone to view booking histories.
        </p>

        <div style={{ position: 'relative', maxWidth: '360px', marginTop: '1.25rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666666' }} />
          <input
            type="text"
            placeholder="Search customer by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {filtered.map((c) => (
          <div key={c.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '1.25rem', border: '1px solid #EEEEEE', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>{c.id}</span>
              <span style={{ fontSize: '0.75rem', color: '#666666' }}>{c.totalVisits} Visits</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#151515' }}>{c.name}</h3>
            <p style={{ fontSize: '0.8rem', color: '#666666', marginTop: '0.25rem' }}>{c.phone}</p>
            <p style={{ fontSize: '0.8rem', color: '#666666' }}>{c.email}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #EEEEEE', fontSize: '0.8rem' }}>
              <span>Last Visit: <strong>{c.lastVisit}</strong></span>
              <span style={{ color: '#EF6A5B', fontWeight: 700 }}>₹{c.totalSpent}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
