import React from 'react';
import { IndianRupee, ShoppingBag, Package, Users } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="admin-page-content" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
      <div className="admin-header-row">
        <h2>Dashboard Overview</h2>
      </div>

      <div className="stat-cards-grid">
        <div className="stat-card">
          <div className="stat-icon"><IndianRupee size={28} /></div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-value">₹24,500</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><ShoppingBag size={28} /></div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p className="stat-value">142</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Package size={28} /></div>
          <div className="stat-content">
            <h3>Total Products</h3>
            <p className="stat-value">38</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Users size={28} /></div>
          <div className="stat-content">
            <h3>Active Suppliers</h3>
            <p className="stat-value">12</p>
          </div>
        </div>
      </div>

      <div className="admin-page-content">
        <h3>Recent Orders</h3>
        <div className="admin-table-container" style={{ marginTop: '15px' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#ORD-001</td>
                <td>Rahul Sharma</td>
                <td>Oct 24, 2024</td>
                <td>₹4,500</td>
                <td><span className="status-badge status-delivered">Delivered</span></td>
              </tr>
              <tr>
                <td>#ORD-002</td>
                <td>Priya Singh</td>
                <td>Oct 23, 2024</td>
                <td>₹12,200</td>
                <td><span className="status-badge status-shipped">Shipped</span></td>
              </tr>
              <tr>
                <td>#ORD-003</td>
                <td>Anil Kumar</td>
                <td>Oct 23, 2024</td>
                <td>₹1,850</td>
                <td><span className="status-badge status-pending">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
