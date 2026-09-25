import React, { useState } from 'react';
import { Plus, Eye, Printer, X, CheckCircle, Clock } from 'lucide-react';

const mockOfflineOrders = [
  { id: '#OFF-501', customer: 'Walk-in Customer', date: 'Oct 24, 2024', items: 'Gold Chain, Earring Set', total: '₹18,500', payment: 'Cash', salesperson: 'Raj', status: 'Completed' },
  { id: '#OFF-502', customer: 'Lakshmi Devi', date: 'Oct 24, 2024', items: 'Bridal Necklace Set', total: '₹65,000', payment: 'Card + Cash', salesperson: 'Arjun', status: 'Completed' },
  { id: '#OFF-503', customer: 'Walk-in Customer', date: 'Oct 23, 2024', items: 'Silver Anklet', total: '₹2,200', payment: 'UPI', salesperson: 'Priya', status: 'Completed' },
  { id: '#OFF-504', customer: 'Meena K', date: 'Oct 23, 2024', items: 'Custom Ring (Pending)', total: '₹12,000', payment: 'Advance ₹5,000', salesperson: 'Raj', status: 'Pending' },
  { id: '#OFF-505', customer: 'Walk-in Customer', date: 'Oct 22, 2024', items: 'Bangles (2 pair)', total: '₹7,800', payment: 'Cash', salesperson: 'Arjun', status: 'Completed' },
];

const OfflineOrders = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="admin-page-content">
      <div className="admin-header-row">
        <h2>Offline / In-Store Orders</h2>
        <button className="admin-btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> New Sale</>}
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
          <h3 style={{ margin: '0 0 20px', color: '#0f172a', fontSize: '1.1rem' }}>Record New In-Store Sale</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="admin-form-group">
              <label>Customer Name</label>
              <input type="text" className="admin-input" placeholder="Walk-in Customer" />
            </div>
            <div className="admin-form-group">
              <label>Salesperson</label>
              <select className="admin-select">
                <option value="">Select Salesperson</option>
                <option value="Raj">Raj</option>
                <option value="Arjun">Arjun</option>
                <option value="Priya">Priya</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Items Sold</label>
              <input type="text" className="admin-input" placeholder="e.g. Gold Chain, Earrings" />
            </div>
            <div className="admin-form-group">
              <label>Total Amount (₹)</label>
              <input type="text" className="admin-input" placeholder="Enter amount" />
            </div>
            <div className="admin-form-group">
              <label>Payment Method</label>
              <select className="admin-select">
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Card + Cash">Card + Cash</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Status</label>
              <select className="admin-select">
                <option value="Completed">Completed</option>
                <option value="Pending">Pending (Custom Order)</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button className="admin-btn-primary">Save Sale</button>
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

      {/* Quick summary */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{
          flex: '1 1 200px', padding: '16px 20px', borderRadius: '10px',
          background: '#f0f4ff', border: '1px solid #c7d2fe',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.8rem', color: '#3730a3', fontWeight: 500 }}>Today's Sales</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3730a3' }}>₹83,500</div>
        </div>
        <div style={{
          flex: '1 1 200px', padding: '16px 20px', borderRadius: '10px',
          background: '#dcfce7', border: '1px solid #bbf7d0',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 500 }}>Completed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#166534' }}>4</div>
        </div>
        <div style={{
          flex: '1 1 200px', padding: '16px 20px', borderRadius: '10px',
          background: '#fef3c7', border: '1px solid #fde68a',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.8rem', color: '#92400e', fontWeight: 500 }}>Pending Custom</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#92400e' }}>1</div>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Salesperson</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockOfflineOrders.map(order => (
              <tr key={order.id}>
                <td style={{ fontWeight: 600, color: '#7c3aed' }}>{order.id}</td>
                <td style={{ fontWeight: order.customer !== 'Walk-in Customer' ? 600 : 400 }}>{order.customer}</td>
                <td>{order.date}</td>
                <td style={{ fontSize: '0.88rem', maxWidth: '200px' }}>{order.items}</td>
                <td style={{ fontWeight: 600 }}>{order.total}</td>
                <td>
                  <span style={{
                    background: '#f1f5f9',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: '#475569',
                  }}>{order.payment}</span>
                </td>
                <td>{order.salesperson}</td>
                <td>
                  <span
                    className={`status-badge ${order.status === 'Completed' ? 'status-delivered' : 'status-pending'}`}
                    style={{ display: 'inline-flex', alignItems: 'center' }}
                  >
                    {order.status === 'Completed'
                      ? <CheckCircle size={14} style={{ marginRight: 4 }} />
                      : <Clock size={14} style={{ marginRight: 4 }} />
                    }
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="action-icons">
                    <Eye size={16} className="action-icon" title="View" />
                    <Printer size={16} className="action-icon" title="Print Receipt" />
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

export default OfflineOrders;
