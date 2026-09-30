import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, favorites, toggleFavoriteProduct } = useCustomer();

  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id) || products[0];
  const isFav = favorites.products.includes(product.id);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <button
        onClick={() => navigate('/customer/shop')}
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
        <span>BACK TO STORE</span>
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid #EEEEEE',
          boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ gridColumn: 'span 12' }} className="prod-left">
          <div style={{ borderRadius: '16px', overflow: 'hidden', height: '320px', position: 'relative' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <div style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="prod-right">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#EF6A5B', textTransform: 'uppercase' }}>
                {product.category}
              </span>
              <button
                onClick={() => toggleFavoriteProduct(product.id)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#FFF7F7',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Heart size={20} fill={isFav ? '#EF6A5B' : 'none'} color={isFav ? '#EF6A5B' : '#666666'} />
              </button>
            </div>

            <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515', marginBottom: '0.5rem' }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 700, color: '#151515' }}>
                <Star size={16} fill="#EF6A5B" color="#EF6A5B" />
                <span>{product.rating} (45 Reviews)</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#137333', fontWeight: 600 }}>In Stock ({product.stock} available)</span>
            </div>

            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#EF6A5B', marginBottom: '1.25rem' }}>
              ₹{product.price}
            </div>

            <p style={{ fontSize: '0.9rem', color: '#666666', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {product.description} Crafted with barber-grade organic ingredients to deliver long-lasting hold and texture without flaking or greasiness.
            </p>

            {/* Quantity Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#151515' }}>Quantity:</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #EEEEEE', borderRadius: '10px', overflow: 'hidden' }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ width: '36px', height: '36px', border: 'none', backgroundColor: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ padding: '0 1rem', fontSize: '0.9rem', fontWeight: 700, color: '#151515' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ width: '36px', height: '36px', border: 'none', backgroundColor: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <button
              onClick={() => addToCart(product, quantity)}
              style={{
                padding: '0.85rem',
                borderRadius: '9999px',
                backgroundColor: '#FFF7F7',
                color: '#EF6A5B',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: '1px solid #FFF7F7',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <ShoppingBag size={18} />
              <span>ADD TO CART</span>
            </button>

            <button
              onClick={() => {
                addToCart(product, quantity);
                navigate('/customer/cart');
              }}
              style={{
                padding: '0.85rem',
                borderRadius: '9999px',
                backgroundColor: '#EF6A5B',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .prod-left { grid-column: span 6 !important; }
          .prod-right { grid-column: span 6 !important; }
        }
      `}</style>
    </div>
  );
};
