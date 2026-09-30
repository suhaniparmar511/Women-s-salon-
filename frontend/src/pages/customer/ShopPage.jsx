import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Star, Heart } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const ShopPage = () => {
  const navigate = useNavigate();
  const { products, addToCart, favorites, toggleFavoriteProduct } = useCustomer();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['All', 'Styling', 'Beard Care', 'Hair Care', 'Skin Care'];

  let filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          Grooming Essentials Store
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Barber-grade hair wax, organic beard oils, clay pomades, and skincare.
        </p>

        {/* Search & Sort Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666666' }} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.75rem',
                borderRadius: '12px',
                border: '1px solid #EEEEEE',
                backgroundColor: '#FFF7F7',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              border: '1px solid #EEEEEE',
              backgroundColor: '#FFFFFF',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="popular">Sort by: Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
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
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {filtered.map((p) => {
          const isFav = favorites.products.includes(p.id);
          return (
            <div
              key={p.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid #EEEEEE',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Product Image */}
              <div style={{ position: 'relative', height: '200px', cursor: 'pointer' }} onClick={() => navigate(`/customer/shop/${p.id}`)}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavoriteProduct(p.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <Heart size={18} fill={isFav ? '#EF6A5B' : 'none'} color={isFav ? '#EF6A5B' : '#666666'} />
                </button>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    left: '0.75rem',
                    backgroundColor: 'rgba(21, 21, 21, 0.75)',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                  }}
                >
                  {p.category}
                </span>
              </div>

              {/* Product Info */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#151515' }}>{p.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.75rem', fontWeight: 700, color: '#151515' }}>
                      <Star size={12} fill="#EF6A5B" color="#EF6A5B" />
                      <span>{p.rating}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#EF6A5B' }}>₹{p.price}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    onClick={() => navigate(`/customer/shop/${p.id}`)}
                    style={{
                      padding: '0.55rem',
                      borderRadius: '10px',
                      backgroundColor: '#FFFFFF',
                      color: '#151515',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: '1px solid #EEEEEE',
                      cursor: 'pointer',
                    }}
                  >
                    VIEW
                  </button>
                  <button
                    onClick={() => addToCart(p)}
                    style={{
                      padding: '0.55rem',
                      borderRadius: '10px',
                      backgroundColor: '#EF6A5B',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <ShoppingBag size={14} />
                    <span>ADD</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
