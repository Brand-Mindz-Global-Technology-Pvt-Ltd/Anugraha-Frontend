import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, List, Package, Archive, Users, ShoppingCart, Store, LogOut } from 'lucide-react';
import './Sidebar.css';
import logoImg from '../../../assets/Images/logo.png';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Category', path: '/admin/category', icon: <List size={20} /> },
    { name: 'Product', path: '/admin/product', icon: <Package size={20} /> },
    { name: 'Inventory', path: '/admin/inventory', icon: <Archive size={20} /> },
    { name: 'Supplier', path: '/admin/supplier', icon: <Users size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Offline Orders', path: '/admin/offline-orders', icon: <Store size={20} /> },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <img src={logoImg} alt="Admin Logo" className="sidebar-logo" />
        <h2 className="sidebar-title">Admin Panel</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
