import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle2 } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useCustomer();

  const order = orders.find((o) => o.id === id) || orders[0];

  const timelineSteps = [
    { label: 'Order Placed', status: 'completed' },
    { label: 'Processing', status: order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' ? 'completed' : 'pending' },
    { label: 'Shipped', status: order.status === 'Shipped' || order.status === 'Delivered' ? 'completed' : 'pending' },
    { label: 'Delivered', status: order.status === 'Delivered' ? 'completed' : 'pending' },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <button
        onClick={() => navigate('/customer/orders')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#EF6A5B',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          alignSelf: 'flex-start',
        }}
      >
        <ArrowLeft size={16} />
        <span>BACK TO ORDERS</span>
      </button>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '2rem', border: '1px solid #EEEEEE', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #EEEEEE' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>ORDER ID</span>
            <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
              {order.id}
            </h1>
          </div>
          <span
            style={{
              backgroundColor: order.status === 'Delivered' ? '#E6F4EA' : '#FEF3C7',
              color: order.status === 'Delivered' ? '#137333' : '#D97706',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              textTransform: 'uppercase',
            }}
          >
            {order.status}
          </span>
        </div>

        {/* Timeline Progress */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#151515', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Delivery Progress
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {timelineSteps.map((step, idx) => (
              <React.Fragment key={step.label}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: step.status === 'completed' ? '#EF6A5B' : '#EEEEEE',
                      color: step.status === 'completed' ? '#FFFFFF' : '#666666',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {step.status === 'completed' ? '✓' : idx + 1}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: step.status === 'completed' ? '#EF6A5B' : '#666666' }}>
                    {step.label}
                  </span>
                </div>
                {idx < timelineSteps.length - 1 && (
                  <div style={{ flex: 1, height: '2px', backgroundColor: step.status === 'completed' ? '#EF6A5B' : '#EEEEEE', margin: '0 0.5rem', marginBottom: '1.25rem' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Purchased Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#151515', textTransform: 'uppercase' }}>Items Ordered</h4>
          {order.items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: '12px', backgroundColor: '#FFF7F7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#151515' }}>{item.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: '#666666' }}>Qty: {item.quantity}</span>
                </div>
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#EF6A5B' }}>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div style={{ padding: '1.25rem', borderRadius: '16px', border: '1px solid #EEEEEE', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#666666' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>₹{order.subtotal}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Delivery</span><span>₹{order.delivery}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Taxes</span><span>₹{order.tax}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, color: '#151515', paddingTop: '0.5rem', borderTop: '1px solid #EEEEEE' }}>
            <span>Total Paid</span>
            <span style={{ color: '#EF6A5B' }}>₹{order.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
