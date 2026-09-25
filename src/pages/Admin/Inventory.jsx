import React from 'react';
import { Edit2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const mockInventory = [
  { id: 1, product: 'Royal Gold Necklace', sku: 'NK-001', stock: 24, reorderLevel: 10, status: 'In Stock' },
  { id: 2, product: 'Diamond Drop Earrings', sku: 'ER-002', stock: 5, reorderLevel: 10, status: 'Low Stock' },
  { id: 3, product: 'Traditional Kada Bangle', sku: 'BG-003', stock: 42, reorderLevel: 15, status: 'In Stock' },
  { id: 4, product: 'Platinum Solitaire Ring', sku: 'RN-004', stock: 0, reorderLevel: 5, status: 'Out of Stock' },
  { id: 5, product: 'Temple Jewellery Set', sku: 'NK-005', stock: 8, reorderLevel: 10, status: 'Low Stock' },
];

const statusIcon = (status) => {
  if (status === 'In Stock') return <CheckCircle size={14} style={{ marginRight: 4 }} />;
  if (status === 'Low Stock') return <AlertTriangle size={14} style={{ marginRight: 4 }} />;
  return <XCircle size={14} style={{ marginRight: 4 }} />;
};

const statusClass = (status) => {
  if (status === 'In Stock') return 'status-instock';
  if (status === 'Low Stock') return 'status-lowstock';
  return 'status-outstock';
};

const Inventory = () => {
  return (
    <div className="admin-page-content">
      <div className="admin-header-row">
        <h2>Inventory Management</h2>
      </div>

      {/* Quick summary cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{
          flex: '1 1 180px', padding: '16px 20px', borderRadius: '10px',
          background: '#dcfce7', border: '1px solid #bbf7d0',
          display: 'flex', alignItems: 'center', gap: '12px'
        }}>
          <CheckCircle size={22} color="#166534" />
          <div>
            <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 500 }}>In Stock</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#166534' }}>2</div>
          </div>
        </div>
        <div style={{
          flex: '1 1 180px', padding: '16px 20px', borderRadius: '10px',
          background: '#fef3c7', border: '1px solid #fde68a',
          display: 'flex', alignItems: 'center', gap: '12px'
        }}>
          <AlertTriangle size={22} color="#92400e" />
          <div>
            <div style={{ fontSize: '0.8rem', color: '#92400e', fontWeight: 500 }}>Low Stock</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#92400e' }}>2</div>
          </div>
        </div>
        <div style={{
          flex: '1 1 180px', padding: '16px 20px', borderRadius: '10px',
          background: '#fee2e2', border: '1px solid #fecaca',
          display: 'flex', alignItems: 'center', gap: '12px'
        }}>
          <XCircle size={22} color="#991b1b" />
          <div>
            <div style={{ fontSize: '0.8rem', color: '#991b1b', fontWeight: 500 }}>Out of Stock</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#991b1b' }}>1</div>
          </div>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockInventory.map(item => (
              <tr key={item.id}>
                <td style={{ fontWeight: 600 }}>{item.product}</td>
                <td style={{ color: '#64748b', fontSize: '0.85rem' }}>{item.sku}</td>
                <td style={{ fontWeight: 600, fontSize: '1.05rem' }}>{item.stock}</td>
                <td>{item.reorderLevel}</td>
                <td>
                  <span className={`status-badge ${statusClass(item.status)}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {statusIcon(item.status)}{item.status}
                  </span>
                </td>
                <td>
                  <button style={{
                    background: 'var(--primary-gold, #d4af37)',
                    color: '#111',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'background 0.2s',
                  }}>
                    <Edit2 size={13} /> Update Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
