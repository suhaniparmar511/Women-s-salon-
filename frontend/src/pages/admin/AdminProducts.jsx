import React, { useState } from 'react';
import { ShoppingBag, Plus, Edit } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const AdminProducts = () => {
  const { products, showToast } = useCustomer();
  const [productList, setProductList] = useState(products);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
            Retail Product Store Control
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
            Manage product catalog, prices, brand stock, and customer orders.
          </p>
        </div>

        <button
          onClick={() => showToast('Create product modal opened.')}
          style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={16} />
          <span>ADD NEW PRODUCT</span>
        </button>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #EEEEEE', color: '#666666', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                <th style={{ padding: '0.75rem' }}>Product ID</th>
                <th style={{ padding: '0.75rem' }}>Product Name</th>
                <th style={{ padding: '0.75rem' }}>Category</th>
                <th style={{ padding: '0.75rem' }}>Price</th>
                <th style={{ padding: '0.75rem' }}>Stock Quantity</th>
                <th style={{ padding: '0.75rem' }}>Rating</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>{p.id}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: '0.75rem' }}><span style={{ backgroundColor: '#FFF7F7', color: '#EF6A5B', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>{p.category}</span></td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#151515' }}>₹{p.price}</td>
                  <td style={{ padding: '0.75rem' }}>{p.stock} units</td>
                  <td style={{ padding: '0.75rem' }}>{p.rating} ★</td>
                  <td style={{ padding: '0.75rem' }}>
                    <button onClick={() => showToast('Product edited.')} style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', backgroundColor: '#FFFFFF', color: '#666666', border: '1px solid #EEEEEE', fontSize: '0.75rem', cursor: 'pointer' }}>EDIT</button>
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
