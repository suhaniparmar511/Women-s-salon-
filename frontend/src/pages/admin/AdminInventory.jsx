import React, { useState } from 'react';
import { Package, AlertTriangle, Plus, Edit } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';

export const AdminInventory = () => {
  const { showToast } = useCustomer();

  const [items, setItems] = useState([
    { id: 'INV-01', itemName: 'Professional Shampoo 1L', category: 'Shampoo', currentStock: 25, minimumStock: 10, unit: 'bottles', costPerUnit: 8.5, supplier: 'SalonSupply Co' },
    { id: 'INV-02', itemName: 'Hair Wax Bulk Tubs', category: 'Hair Wax', currentStock: 5, minimumStock: 15, unit: 'tubes', costPerUnit: 6.0, supplier: 'StylePro Wholesale' },
    { id: 'INV-03', itemName: 'Hair Color Kit Jet Black', category: 'Hair Color', currentStock: 8, minimumStock: 10, unit: 'packets', costPerUnit: 12.0, supplier: 'ColorMaster Direct' },
    { id: 'INV-04', itemName: 'Disposable Razor Blades', category: 'Razor', currentStock: 120, minimumStock: 50, unit: 'pieces', costPerUnit: 0.5, supplier: 'CutPro Supply' },
  ]);

  const updateStock = (id, delta) => {
    setItems(items.map((i) => (i.id === id ? { ...i, currentStock: Math.max(0, i.currentStock + delta) } : i)));
    showToast('Inventory stock updated.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#151515' }}>
          Inventory & Supplier Management
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#666666', marginTop: '0.25rem' }}>
          Monitor stock levels, reorder thresholds, supplier contacts, and stock alerts.
        </p>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.75rem', border: '1px solid #EEEEEE' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #EEEEEE', color: '#666666', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                <th style={{ padding: '0.75rem' }}>Inv ID</th>
                <th style={{ padding: '0.75rem' }}>Item Name</th>
                <th style={{ padding: '0.75rem' }}>Category</th>
                <th style={{ padding: '0.75rem' }}>Current Stock</th>
                <th style={{ padding: '0.75rem' }}>Min Threshold</th>
                <th style={{ padding: '0.75rem' }}>Cost / Unit</th>
                <th style={{ padding: '0.75rem' }}>Supplier</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => {
                const isLow = i.currentStock < i.minimumStock;
                return (
                  <tr key={i.id} style={{ borderBottom: '1px solid #EEEEEE', backgroundColor: isLow ? '#FFF7F7' : 'transparent' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: '#EF6A5B' }}>{i.id}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>{i.itemName}</td>
                    <td style={{ padding: '0.75rem' }}>{i.category}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: isLow ? '#EF6A5B' : '#151515' }}>
                      {i.currentStock} {i.unit} {isLow && <AlertTriangle size={14} color="#EF6A5B" style={{ display: 'inline', marginLeft: '4px' }} />}
                    </td>
                    <td style={{ padding: '0.75rem', color: '#666666' }}>{i.minimumStock} {i.unit}</td>
                    <td style={{ padding: '0.75rem' }}>₹{i.costPerUnit * 15}</td>
                    <td style={{ padding: '0.75rem', color: '#666666' }}>{i.supplier}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button onClick={() => updateStock(i.id, 5)} style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', backgroundColor: '#E6F4EA', color: '#137333', fontSize: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>+ ADD</button>
                        <button onClick={() => updateStock(i.id, -1)} style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', backgroundColor: '#FCE8E6', color: '#C5221F', fontSize: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>- REDUCE</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
