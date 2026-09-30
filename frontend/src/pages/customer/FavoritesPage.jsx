import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Scissors, ShoppingBag, Trash2 } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { services, products, favorites, toggleFavoriteService, toggleFavoriteProduct, addToCart } = useCustomer();

  const [activeTab, setActiveTab] = useState('services');

  const favoriteServicesList = services.filter((s) => favorites.services.includes(s.id));
  const favoriteProductsList = products.filter((p) => favorites.products.includes(p.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          My Favorites
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Your saved grooming treatments and favorite store items.
        </p>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
          <button
            onClick={() => setActiveTab('services')}
            style={{
              padding: '0.55rem 1.25rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: activeTab === 'services' ? '1px solid #EF6A5B' : '1px solid #EEEEEE',
              backgroundColor: activeTab === 'services' ? '#EF6A5B' : '#FFFFFF',
              color: activeTab === 'services' ? '#FFFFFF' : '#666666',
              cursor: 'pointer',
            }}
          >
            Services ({favoriteServicesList.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '0.55rem 1.25rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: activeTab === 'products' ? '1px solid #EF6A5B' : '1px solid #EEEEEE',
              backgroundColor: activeTab === 'products' ? '#EF6A5B' : '#FFFFFF',
              color: activeTab === 'products' ? '#FFFFFF' : '#666666',
              cursor: 'pointer',
            }}
          >
            Products ({favoriteProductsList.length})
          </button>
        </div>
      </div>

      {/* SERVICES TAB */}
      {activeTab === 'services' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {favoriteServicesList.length > 0 ? (
            favoriteServicesList.map((s) => (
              <div key={s.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.25rem', border: '1px solid #EEEEEE', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#EF6A5B', textTransform: 'uppercase' }}>{s.category}</span>
                    <button onClick={() => toggleFavoriteService(s.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#EF6A5B' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#151515', margin: '0.35rem 0' }}>{s.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#666666' }}>{s.duration} min • ₹{s.price * 15}</p>
                </div>
                <button
                  onClick={() => navigate('/customer/booking', { state: { selectedServiceId: s.id } })}
                  style={{ marginTop: '1rem', padding: '0.6rem', borderRadius: '10px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                >
                  BOOK AGAIN
                </button>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #EEEEEE' }}>
              <Heart size={48} color="#EF6A5B" style={{ marginBottom: '1rem', opacity: 0.8 }} />
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>No Saved Services</h3>
              <p style={{ fontSize: '0.85rem', color: '#666666', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Explore our services and tap the heart icon to save your favorites.</p>
              <button onClick={() => navigate('/customer/services')} style={{ padding: '0.75rem 1.75rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                EXPLORE SERVICES
              </button>
            </div>
          )}
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {favoriteProductsList.length > 0 ? (
            favoriteProductsList.map((p) => (
              <div key={p.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.25rem', border: '1px solid #EEEEEE', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#EF6A5B', textTransform: 'uppercase' }}>{p.category}</span>
                    <button onClick={() => toggleFavoriteProduct(p.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#EF6A5B' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#151515', margin: '0.35rem 0' }}>{p.name}</h3>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#EF6A5B' }}>₹{p.price}</span>
                </div>
                <button
                  onClick={() => addToCart(p)}
                  style={{ marginTop: '1rem', padding: '0.6rem', borderRadius: '10px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                >
                  ADD TO CART
                </button>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #EEEEEE' }}>
              <ShoppingBag size={48} color="#EF6A5B" style={{ marginBottom: '1rem', opacity: 0.8 }} />
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>No Saved Products</h3>
              <p style={{ fontSize: '0.85rem', color: '#666666', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Browse grooming essentials and save your top picks.</p>
              <button onClick={() => navigate('/customer/shop')} style={{ padding: '0.75rem 1.75rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                SHOP PRODUCTS
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
