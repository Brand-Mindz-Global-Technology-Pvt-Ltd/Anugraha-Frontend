import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Eye } from 'lucide-react';

const mockCategories = ['Necklaces', 'Earrings', 'Bangles', 'Rings'];
const mockSuppliers = ['GoldSmiths India', 'Diamond Traders', 'Silver Sparkle'];

const mockProducts = [
  { id: 1, name: 'Royal Gold Necklace', sku: 'NK-001', category: 'Necklaces', supplier: 'GoldSmiths India', price: '₹45,000', status: 'Active' },
  { id: 2, name: 'Diamond Drop Earrings', sku: 'ER-002', category: 'Earrings', supplier: 'Diamond Traders', price: '₹12,500', status: 'Active' },
  { id: 3, name: 'Traditional Kada Bangle', sku: 'BG-003', category: 'Bangles', supplier: 'GoldSmiths India', price: '₹8,200', status: 'Active' },
  { id: 4, name: 'Platinum Solitaire Ring', sku: 'RN-004', category: 'Rings', supplier: 'Diamond Traders', price: '₹1,25,000', status: 'Inactive' },
  { id: 5, name: 'Temple Jewellery Set', sku: 'NK-005', category: 'Necklaces', supplier: 'Silver Sparkle', price: '₹22,800', status: 'Active' },
];

const Product = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="admin-page-content">
      <div className="admin-header-row">
        <h2>Product Management</h2>
        <button className="admin-btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Product</>}
        </button>
      </div>

      {showForm && (
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '28px',
          marginBottom: '28px',
        }}>
          <h3 style={{ margin: '0 0 20px', color: '#0f172a', fontSize: '1.1rem' }}>Add New Product</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="admin-form-group">
              <label>Product Name</label>
              <input type="text" className="admin-input" placeholder="Enter product name" />
            </div>
            <div className="admin-form-group">
              <label>SKU</label>
              <input type="text" className="admin-input" placeholder="e.g. NK-006" />
            </div>
            <div className="admin-form-group">
              <label>Category</label>
              <select className="admin-select">
                <option value="">Select Category</option>
                {mockCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label>Supplier</label>
              <select className="admin-select">
                <option value="">Select Supplier</option>
                {mockSuppliers.map(sup => (
                  <option key={sup} value={sup}>{sup}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label>Price (₹)</label>
              <input type="text" className="admin-input" placeholder="Enter price" />
            </div>
            <div className="admin-form-group">
              <label>Status</label>
              <select className="admin-select">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button className="admin-btn-primary">Save Product</button>
            <button
              onClick={() => setShowForm(false)}
              style={{
                background: 'transparent',
                border: '1px solid #cbd5e1',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                color: '#64748b',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map(product => (
              <tr key={product.id}>
                <td style={{ fontWeight: 600 }}>{product.name}</td>
                <td style={{ color: '#64748b', fontSize: '0.85rem' }}>{product.sku}</td>
                <td>{product.category}</td>
                <td>{product.supplier}</td>
                <td style={{ fontWeight: 600 }}>{product.price}</td>
                <td>
                  <span className={`status-badge ${product.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="action-icons">
                    <Eye size={16} className="action-icon" />
                    <Edit2 size={16} className="action-icon" />
                    <Trash2 size={16} className="action-icon delete" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
