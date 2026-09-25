import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';
import './AdminLayout.css';
import './AdminPages.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main-content">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <h2>Welcome Admin</h2>
          </div>
          <div className="admin-topbar-right">
            <div className="admin-profile-pic">A</div>
          </div>
        </header>
        <main className="admin-page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
