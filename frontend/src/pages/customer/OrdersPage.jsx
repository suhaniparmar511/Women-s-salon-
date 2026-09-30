import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle2, ChevronRight } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const OrdersPage = () => {
  const navigate = useNavigate();
  const { orders } = useCustomer();

  const [selectedTab, setSelectedTab] = useState('All');

  const tabs = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filtered = orders.filter((o) => {
    if (selectedTab === 'All') return true;
    return o.status.toLowerCase() === selectedTab.toLowerCase();
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          My Purchase Orders
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Track and review your grooming product purchases.
        </p>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', overflowX: 'auto' }}>
          {tabs.map((tab) => {
            const isActive = selectedTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: isActive ? '1px solid #EF6A5B' : '1px solid #EEEEEE',
                  backgroundColor: isActive ? '#EF6A5B' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#666666',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.length > 0 ? (
          filtered.map((o) => (
            <div
              key={o.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '1.5rem',
                border: '1px solid #EEEEEE',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>{o.id}</span>
                  <span style={{ fontSize: '0.8rem', color: '#666666' }}>{o.date}</span>
                  <span
                    style={{
                      backgroundColor: o.status === 'Delivered' ? '#E6F4EA' : '#FEF3C7',
                      color: o.status === 'Delivered' ? '#137333' : '#D97706',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.65rem',
                      borderRadius: '9999px',
                    }}
                  >
                    {o.status}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {o.items.map((item, idx) => (
                    <img key={idx} src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                  ))}
                  <span style={{ fontSize: '0.85rem', color: '#666666', marginLeft: '0.5rem' }}>
                    {o.items.length} item(s) • Total: <strong style={{ color: '#151515' }}>₹{o.total}</strong>
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/customer/orders/${o.id}`)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '9999px',
                  backgroundColor: '#FFF7F7',
                  color: '#EF6A5B',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>VIEW ORDER</span>
                <ChevronRight size={16} />
              </button>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #EEEEEE' }}>
            <Package size={48} color="#EF6A5B" style={{ marginBottom: '1rem', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
              No Orders Yet
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#666666', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              Browse our grooming products store and make your first purchase.
            </p>
            <button
              onClick={() => navigate('/customer/shop')}
              style={{ padding: '0.75rem 1.75rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              SHOP PRODUCTS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
