import React, { useState } from 'react';
import { Scissors, Plus, Edit, Trash2 } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const AdminServices = () => {
  const { services, showToast } = useCustomer();
  const [serviceList, setServiceList] = useState(services);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSrv, setNewSrv] = useState({ name: '', category: 'Haircut', price: 30, duration: 45, description: '' });

  const handleAddService = (e) => {
    e.preventDefault();
    const created = { id: `srv_${Date.now().toString().slice(-3)}`, ...newSrv, rating: 4.8, image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80' };
    setServiceList([...serviceList, created]);
    setShowAddModal(false);
    showToast('New service added to catalog!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
            Services Catalog Control
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
            Manage treatment names, categories, pricing, duration, and active status.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={16} />
          <span>ADD NEW SERVICE</span>
        </button>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #EEEEEE', color: '#666666', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                <th style={{ padding: '0.75rem' }}>Service ID</th>
                <th style={{ padding: '0.75rem' }}>Name</th>
                <th style={{ padding: '0.75rem' }}>Category</th>
                <th style={{ padding: '0.75rem' }}>Duration</th>
                <th style={{ padding: '0.75rem' }}>Price</th>
                <th style={{ padding: '0.75rem' }}>Rating</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {serviceList.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>{s.id}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{s.name}</td>
                  <td style={{ padding: '0.75rem' }}><span style={{ backgroundColor: '#FFF7F7', color: '#EF6A5B', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>{s.category}</span></td>
                  <td style={{ padding: '0.75rem' }}>{s.duration} min</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#151515' }}>₹{s.price * 15}</td>
                  <td style={{ padding: '0.75rem' }}>{s.rating} ★</td>
                  <td style={{ padding: '0.75rem' }}>
                    <button onClick={() => showToast('Service updated.')} style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', backgroundColor: '#FFFFFF', color: '#666666', border: '1px solid #EEEEEE', fontSize: '0.75rem', cursor: 'pointer' }}>EDIT</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <form onSubmit={handleAddService} style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '2rem', maxWidth: '440px', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>Create New Service</h3>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', display: 'block', marginBottom: '0.35rem' }}>Service Name</label>
              <input type="text" required value={newSrv.name} onChange={(e) => setNewSrv({ ...newSrv, name: e.target.value })} style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', display: 'block', marginBottom: '0.35rem' }}>Category</label>
                <select value={newSrv.category} onChange={(e) => setNewSrv({ ...newSrv, category: e.target.value })} style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #EEEEEE', fontSize: '0.85rem' }}>
                  <option>Haircut</option>
                  <option>Beard</option>
                  <option>Hair Coloring</option>
                  <option>Facial</option>
                  <option>Spa</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', display: 'block', marginBottom: '0.35rem' }}>Duration (m)</label>
                <input type="number" value={newSrv.duration} onChange={(e) => setNewSrv({ ...newSrv, duration: Number(e.target.value) })} style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #EEEEEE', fontSize: '0.85rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', display: 'block', marginBottom: '0.35rem' }}>Price (USD)</label>
                <input type="number" value={newSrv.price} onChange={(e) => setNewSrv({ ...newSrv, price: Number(e.target.value) })} style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #EEEEEE', fontSize: '0.85rem' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '0.6rem 1.25rem', borderRadius: '9999px', backgroundColor: '#FFFFFF', color: '#666666', border: '1px solid #EEEEEE', cursor: 'pointer' }}>CANCEL</button>
              <button type="submit" style={{ padding: '0.6rem 1.25rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontWeight: 700, border: 'none', cursor: 'pointer' }}>SAVE SERVICE</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
