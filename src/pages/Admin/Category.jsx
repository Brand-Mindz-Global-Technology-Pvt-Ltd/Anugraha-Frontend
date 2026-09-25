import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Category = () => {
  return (
    <div className="admin-page-content">
      <div className="admin-header-row">
        <h2>Category Management</h2>
        <button className="admin-btn-primary">
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Necklaces</td>
              <td>Gold and Diamond necklaces</td>
              <td><span className="status-badge status-active">Active</span></td>
              <td>
                <div className="action-icons">
                  <Edit2 size={16} className="action-icon" />
                  <Trash2 size={16} className="action-icon delete" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Earrings</td>
              <td>Studs, drops, and hoops</td>
              <td><span className="status-badge status-active">Active</span></td>
              <td>
                <div className="action-icons">
                  <Edit2 size={16} className="action-icon" />
                  <Trash2 size={16} className="action-icon delete" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Bangles</td>
              <td>Traditional and modern bangles</td>
              <td><span className="status-badge status-active">Active</span></td>
              <td>
                <div className="action-icons">
                  <Edit2 size={16} className="action-icon" />
                  <Trash2 size={16} className="action-icon delete" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Rings</td>
              <td>Engagement and casual rings</td>
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

export default Category;
