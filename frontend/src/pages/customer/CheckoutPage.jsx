import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Truck, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, user, createOrder } = useCustomer();

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '123, Luxury Suite Road',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380001',
    upiId: 'alex@upi',
  });

  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 50;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const created = createOrder({
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      paymentMethod: paymentMethod.toUpperCase(),
    });
    setOrderConfirmed(created);
  };

  if (orderConfirmed) {
    return (
      <div style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '3rem 2rem', border: '1px solid #EEEEEE' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#FFF7F7', color: '#EF6A5B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <CheckCircle2 size={40} />
        </div>

        <h2 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          Order Placed Successfully!
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#666666', marginTop: '0.5rem' }}>
          Order ID: <strong style={{ color: '#EF6A5B' }}>{orderConfirmed.id}</strong>
        </p>

        <div style={{ backgroundColor: '#FFF7F7', borderRadius: '16px', padding: '1.5rem', margin: '1.5rem 0', textAlign: 'left' }}>
          <p style={{ fontSize: '0.85rem', color: '#151515', marginBottom: '0.5rem' }}>
            <strong>Estimated Delivery:</strong> 3-5 Business Days
          </p>
          <p style={{ fontSize: '0.85rem', color: '#151515', marginBottom: '0.5rem' }}>
            <strong>Total Paid:</strong> ₹{orderConfirmed.total}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#151515' }}>
            <strong>Shipping To:</strong> {formData.address}, {formData.city}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/customer/orders')} style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            VIEW ORDER DETAILS
          </button>
          <button onClick={() => navigate('/customer/shop')} style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', backgroundColor: '#FFFFFF', color: '#151515', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #EEEEEE', cursor: 'pointer' }}>
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          Checkout & Shipping
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Enter your delivery information and payment preferences.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
        {/* Left Form Sections */}
        <div style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="chk-form-col">
          {/* Section 1: Contact Info */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE' }}>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515', marginBottom: '1.25rem' }}>
              1. Contact Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Address */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE' }}>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515', marginBottom: '1.25rem' }}>
              2. Delivery Address
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Pincode</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE' }}>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515', marginBottom: '1.25rem' }}>
              3. Payment Method
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
              {[
                { id: 'upi', label: 'UPI / GPay' },
                { id: 'card', label: 'Credit / Debit Card' },
                { id: 'cod', label: 'Cash on Delivery' },
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  style={{
                    padding: '0.85rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    border: paymentMethod === m.id ? '2px solid #EF6A5B' : '1px solid #EEEEEE',
                    backgroundColor: paymentMethod === m.id ? '#FFF7F7' : '#FFFFFF',
                    color: paymentMethod === m.id ? '#EF6A5B' : '#666666',
                    cursor: 'pointer',
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {paymentMethod === 'upi' && (
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Enter UPI ID</label>
                <input
                  type="text"
                  placeholder="username@upi"
                  value={formData.upiId}
                  onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Summary */}
        <div style={{ gridColumn: 'span 12' }} className="chk-summary-col">
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE', sticky: 'top', top: '100px' }}>
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515', marginBottom: '1.25rem' }}>
              Order Review
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#151515' }}>{item.name} x {item.quantity}</span>
                  <span style={{ fontWeight: 700, color: '#151515' }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#666666', padding: '1rem 0', borderTop: '1px solid #EEEEEE', borderBottom: '1px solid #EEEEEE' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Delivery</span><span>₹{delivery}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tax</span><span>₹{tax}</span></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, color: '#151515', margin: '1.25rem 0' }}>
              <span>Total Payable</span>
              <span style={{ color: '#EF6A5B' }}>₹{total}</span>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '9999px',
                backgroundColor: '#EF6A5B',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(239, 106, 91, 0.3)',
              }}
            >
              PLACE ORDER NOW
            </button>
          </div>
        </div>
      </form>

      <style>{`
        @media (min-width: 992px) {
          .chk-form-col { grid-column: span 7 !important; }
          .chk-summary-col { grid-column: span 5 !important; }
        }
      `}</style>
    </div>
  );
};
