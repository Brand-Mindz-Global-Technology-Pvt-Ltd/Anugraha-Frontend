import React from 'react';
import { Eye, Truck, Clock, CheckCircle, XCircle } from 'lucide-react';

const mockOrders = [
  { id: '#ORD-1001', customer: 'Rahul Sharma', email: 'rahul@gmail.com', date: 'Oct 24, 2024', items: 3, total: '₹4,500', payment: 'UPI', status: 'Delivered' },
  { id: '#ORD-1002', customer: 'Priya Singh', email: 'priya.s@gmail.com', date: 'Oct 23, 2024', items: 1, total: '₹12,200', payment: 'Credit Card', status: 'Shipped' },
  { id: '#ORD-1003', customer: 'Anil Kumar', email: 'anil.k@yahoo.com', date: 'Oct 23, 2024', items: 2, total: '₹1,850', payment: 'UPI', status: 'Pending' },
  { id: '#ORD-1004', customer: 'Deepa Nair', email: 'deepa.n@gmail.com', date: 'Oct 22, 2024', items: 1, total: '₹25,600', payment: 'Net Banking', status: 'Delivered' },
  { id: '#ORD-1005', customer: 'Suresh Menon', email: 'suresh.m@hotmail.com', date: 'Oct 21, 2024', items: 4, total: '₹8,900', payment: 'UPI', status: 'Cancelled' },
  { id: '#ORD-1006', customer: 'Kavitha R', email: 'kavitha.r@gmail.com', date: 'Oct 20, 2024', items: 2, total: '₹3,450', payment: 'Credit Card', status: 'Shipped' },
];

const statusConfig = {
  Delivered: { className: 'status-delivered', icon: <CheckCircle size={14} style={{ marginRight: 4 }} /> },
  Shipped: { className: 'status-shipped', icon: <Truck size={14} style={{ marginRight: 4 }} /> },
  Pending: { className: 'status-pending', icon: <Clock size={14} style={{ marginRight: 4 }} /> },
  Cancelled: { className: 'status-cancelled', icon: <XCircle size={14} style={{ marginRight: 4 }} /> },
};

const Orders = () => {
  return (
    <div className="admin-page-content">
      <div className="admin-header-row">
        <h2>Online Orders</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select className="admin-select" style={{ width: 'auto', minWidth: '150px' }}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Quick summary */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { label: 'Total Orders', value: '142', bg: '#f0f4ff', color: '#3730a3' },
          { label: 'Pending', value: '18', bg: '#fef3c7', color: '#92400e' },
          { label: 'Shipped', value: '23', bg: '#e0e7ff', color: '#3730a3' },
          { label: 'Delivered', value: '96', bg: '#dcfce7', color: '#166534' },
        ].map(stat => (
          <div key={stat.label} style={{
            flex: '1 1 140px', padding: '16px 20px', borderRadius: '10px',
            background: stat.bg, textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.8rem', color: stat.color, fontWeight: 500, marginBottom: '4px' }}>{stat.label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map(order => (
              <tr key={order.id}>
                <td style={{ fontWeight: 600, color: '#3730a3' }}>{order.id}</td>
                <td>
                  <div>
                    <div style={{ fontWeight: 600 }}>{order.customer}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{order.email}</div>
                  </div>
                </td>
                <td>{order.date}</td>
                <td style={{ textAlign: 'center' }}>{order.items}</td>
                <td style={{ fontWeight: 600 }}>{order.total}</td>
                <td>
                  <span style={{
                    background: '#f1f5f9',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: '#475569'
                  }}>{order.payment}</span>
                </td>
                <td>
                  <span className={`status-badge ${statusConfig[order.status]?.className}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {statusConfig[order.status]?.icon}{order.status}
                  </span>
                </td>
                <td>
                  <div className="action-icons">
                    <Eye size={16} className="action-icon" title="View Details" />
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

export default Orders;
