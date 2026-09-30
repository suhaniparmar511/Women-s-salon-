import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Search, Star } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const AdminStaff = () => {
  const { barbers, showToast } = useCustomer();
  const [search, setSearch] = useState('');

  const [staffList, setStaffList] = useState([
    { id: 'EMP-101', name: 'Marcus Vance', role: 'Barber', email: 'marcus@salon.com', phone: '+91 98765 43211', experience: 7, commissionRate: 30, isActive: true },
    { id: 'EMP-102', name: 'Sarah Chen', role: 'Barber', email: 'sarah@salon.com', phone: '+91 98765 43212', experience: 5, commissionRate: 30, isActive: true },
    { id: 'EMP-103', name: 'David Park', role: 'Barber', email: 'david@salon.com', phone: '+91 98765 43213', experience: 6, commissionRate: 25, isActive: true },
    { id: 'EMP-104', name: 'Emily Roberts', role: 'Receptionist', email: 'emily@salon.com', phone: '+91 98765 43214', experience: 4, commissionRate: 0, isActive: true },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', email: '', phone: '', role: 'Barber', commissionRate: 30 });

  const handleAddStaff = (e) => {
    e.preventDefault();
    const created = { id: `EMP-${Date.now().toString().slice(-3)}`, ...newStaff, experience: 3, isActive: true };
    setStaffList([...staffList, created]);
    setShowAddModal(false);
    showToast('Employee account created successfully!');
  };

  const handleDeactivate = (id) => {
    setStaffList(staffList.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)));
    showToast('Employee status updated.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
            Staff & Employee Management
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
            Create accounts, set roles, assign commission rates, and manage active status.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={16} />
          <span>ADD NEW EMPLOYEE</span>
        </button>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #EEEEEE', color: '#666666', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                <th style={{ padding: '0.75rem' }}>Emp ID</th>
                <th style={{ padding: '0.75rem' }}>Name</th>
                <th style={{ padding: '0.75rem' }}>Role</th>
                <th style={{ padding: '0.75rem' }}>Contact Info</th>
                <th style={{ padding: '0.75rem' }}>Experience</th>
                <th style={{ padding: '0.75rem' }}>Commission</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>{s.id}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{s.name}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ backgroundColor: '#FFF7F7', color: '#EF6A5B', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                      {s.role}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#666666' }}>{s.email}<br />{s.phone}</td>
                  <td style={{ padding: '0.75rem' }}>{s.experience} Years</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700 }}>{s.commissionRate}%</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ backgroundColor: s.isActive ? '#E6F4EA' : '#FCE8E6', color: s.isActive ? '#137333' : '#C5221F', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                      {s.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <button onClick={() => handleDeactivate(s.id)} style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', backgroundColor: '#FFFFFF', color: '#666666', border: '1px solid #EEEEEE', fontSize: '0.75rem', cursor: 'pointer' }}>
                      {s.isActive ? 'DEACTIVATE' : 'ACTIVATE'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <form onSubmit={handleAddStaff} style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '2rem', maxWidth: '440px', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>Add New Staff Member</h3>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', display: 'block', marginBottom: '0.35rem' }}>Full Name</label>
              <input type="text" required value={newStaff.name} onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', display: 'block', marginBottom: '0.35rem' }}>Email</label>
              <input type="email" required value={newStaff.email} onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })} style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #EEEEEE', backgroundColor: '#FFF7F7', fontSize: '0.85rem' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', display: 'block', marginBottom: '0.35rem' }}>Role</label>
                <select value={newStaff.role} onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })} style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #EEEEEE', fontSize: '0.85rem' }}>
                  <option>Barber</option>
                  <option>Receptionist</option>
                  <option>Admin</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#151515', display: 'block', marginBottom: '0.35rem' }}>Commission %</label>
                <input type="number" value={newStaff.commissionRate} onChange={(e) => setNewStaff({ ...newStaff, commissionRate: Number(e.target.value) })} style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #EEEEEE', fontSize: '0.85rem' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '0.6rem 1.25rem', borderRadius: '9999px', backgroundColor: '#FFFFFF', color: '#666666', border: '1px solid #EEEEEE', cursor: 'pointer' }}>CANCEL</button>
              <button type="submit" style={{ padding: '0.6rem 1.25rem', borderRadius: '9999px', backgroundColor: '#EF6A5B', color: '#FFFFFF', fontWeight: 700, border: 'none', cursor: 'pointer' }}>CREATE ACCOUNT</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
