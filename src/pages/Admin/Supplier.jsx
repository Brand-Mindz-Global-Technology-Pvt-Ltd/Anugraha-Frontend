import React from 'react';
import { Plus, Edit2, Trash2, Mail, Phone } from 'lucide-react';

const Supplier = () => {
  return (
    <div className="admin-page-content">
      <div className="admin-header-row">
        <h2>Supplier Management</h2>
        <button className="admin-btn-primary">
          <Plus size={18} /> Add Supplier
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Contact Person</th>
              <th>Email & Phone</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GoldSmiths India</td>
              <td>Rajesh Kumar</td>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12}/> contact@goldsmiths.in</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12}/> +91 98765 12345</span>
                </div>
              </td>
              <td>⭐ 4.8</td>
              <td><span className="status-badge status-active">Active</span></td>
              <td>
                <div className="action-icons">
                  <Edit2 size={16} className="action-icon" />
                  <Trash2 size={16} className="action-icon delete" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Diamond Traders</td>
              <td>Vikram Singh</td>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12}/> sales@diamondtraders.com</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12}/> +91 98222 33444</span>
                </div>
              </td>
              <td>⭐ 4.5</td>
              <td><span className="status-badge status-active">Active</span></td>
              <td>
                <div className="action-icons">
                  <Edit2 size={16} className="action-icon" />
                  <Trash2 size={16} className="action-icon delete" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Silver Sparkle</td>
              <td>Meera Desai</td>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12}/> meera@silversparkle.in</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12}/> +91 99888 77665</span>
                </div>
              </td>
              <td>⭐ 3.9</td>
              <td><span className="status-badge status-inactive">Inactive</span></td>
              <td>
                <div className="action-icons">
                  <Edit2 size={16} className="action-icon" />
                  <Trash2 size={16} className="action-icon delete" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Supplier;
