import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart } = useCustomer();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 0 ? 50 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          Your Shopping Cart
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Review your grooming products before proceeding to checkout.
        </p>
      </div>

      {cart.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
          {/* Cart Items List */}
          <div style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="cart-list-col">
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  border: '1px solid #EEEEEE',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                }}
              >
                <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />

                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#EF6A5B', textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#151515' }}>{item.name}</h3>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#EF6A5B' }}>₹{item.price}</span>
                </div>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #EEEEEE', borderRadius: '8px', overflow: 'hidden' }}>
                  <button
                    onClick={() => updateCartQuantity(item.id, -1)}
                    style={{ width: '32px', height: '32px', border: 'none', backgroundColor: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ padding: '0 0.75rem', fontSize: '0.85rem', fontWeight: 700, color: '#151515' }}>{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, 1)}
                    style={{ width: '32px', height: '32px', border: 'none', backgroundColor: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div style={{ textAlign: 'right', minWidth: '80px' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#151515' }}>₹{item.price * item.quantity}</span>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#666666', padding: '0.5rem' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ gridColumn: 'span 12' }} className="cart-summary-col">
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515', marginBottom: '1.25rem' }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#666666', paddingBottom: '1.25rem', borderBottom: '1px solid #EEEEEE' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 600, color: '#151515' }}>₹{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Estimated Delivery</span>
                  <span style={{ fontWeight: 600, color: '#151515' }}>₹{delivery}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Taxes (5%)</span>
                  <span style={{ fontWeight: 600, color: '#151515' }}>₹{tax}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, color: '#151515', margin: '1.25rem 0' }}>
                <span>Total Amount</span>
                <span style={{ color: '#EF6A5B' }}>₹{total}</span>
              </div>

              <button
                onClick={() => navigate('/customer/checkout')}
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div style={{ textAlign: 'center', padding: '4rem 1rem', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #EEEEEE' }}>
          <ShoppingBag size={48} color="#EF6A5B" style={{ marginBottom: '1rem', opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
            Your Cart is Empty
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#666666', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            Explore our grooming products and treat yourself to premium care.
          </p>
          <button
            onClick={() => navigate('/customer/shop')}
            style={{ padding: '0.75rem 1.75rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            SHOP PRODUCTS
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .cart-list-col { grid-column: span 8 !important; }
          .cart-summary-col { grid-column: span 4 !important; }
        }
      `}</style>
    </div>
  );
};
