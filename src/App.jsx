import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Category from './pages/Admin/Category';
import Product from './pages/Admin/Product';
import Inventory from './pages/Admin/Inventory';
import Supplier from './pages/Admin/Supplier';
import Orders from './pages/Admin/Orders';
import OfflineOrders from './pages/Admin/OfflineOrders';
import {
  Truck, ShieldCheck, RefreshCw, Search, User, Heart, ShoppingBag,
  ChevronRight, ChevronLeft, Star, Phone, Mail, CheckCircle, MapPin, Menu
} from 'lucide-react';
import './App.css';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import logoImg from './assets/Images/logo.png';

// Import images for dropdowns
import necklaceImg from './assets/Images/home/Category/necklace.png';
import earringImg from './assets/Images/home/Category/earings.png';
import bangleImg from './assets/Images/home/Category/bangles.png';
import ringImg from './assets/Images/home/Category/rings.png';
import bridalImg from './assets/Images/home/Category/bridal.png';

const LogoIcon = () => (
  <div style={{ height: '60px', display: 'flex', alignItems: 'center' }}>
    <img src={logoImg} alt="Anugraha Logo" style={{ width: '150px', height: '150px', objectFit: 'contain', margin: '-45px 0' }} />
  </div>
);

const TopBar = () => {
  const announcements = [
    "Free Shipping on Orders Above ₹999",
    "Hallmarked Jewellery",
    "Easy Returns & 7 Days Exchange",
    "100% Secure Payments"
  ];

  const renderItems = (keyPrefix) => announcements.map((text, i) => (
    <React.Fragment key={`${keyPrefix}-${i}`}>
      <span className="marquee-text">{text}</span>
      <span className="marquee-separator">✦</span>
    </React.Fragment>
  ));

  return (
    <div className="topbar">
      <div className="marquee-container">
        <div className="marquee-content">
          {renderItems('set1')}
          {renderItems('set2')}
        </div>
      </div>
    </div>
  );
};

const Header = () => (
  <header className="app-header">
    <div className="container app-header-inner">
      <div className="app-logo-area">
        <button className="mobile-menu-btn"><Menu size={24} /></button>
        <LogoIcon />
      </div>

      <nav className="app-nav">
        <div className="nav-item-animate"><a href="#" className="active">HOME</a></div>
        
        {/* SHOP Dropdown */}
        <div className="nav-item nav-item-animate">
          <a href="#">SHOP ▾</a>
          <div className="dropdown-menu">
            <div className="dropdown-card">
              <div className="dropdown-card-img-wrapper"><img src={necklaceImg} alt="Necklaces" /></div>
              <h4>NECKLACES</h4>
            </div>
            <div className="dropdown-card">
              <div className="dropdown-card-img-wrapper"><img src={earringImg} alt="Earrings" /></div>
              <h4>EARRINGS</h4>
            </div>
            <div className="dropdown-card">
              <div className="dropdown-card-img-wrapper"><img src={bangleImg} alt="Bangles" /></div>
              <h4>BANGLES</h4>
            </div>
            <div className="dropdown-card">
              <div className="dropdown-card-img-wrapper"><img src={ringImg} alt="Rings" /></div>
              <h4>RINGS</h4>
            </div>
          </div>
        </div>

        {/* COLLECTIONS Dropdown */}
        <div className="nav-item nav-item-animate">
          <a href="#">COLLECTIONS ▾</a>
          <div className="dropdown-menu">
            <div className="dropdown-card">
              <div className="dropdown-card-img-wrapper"><img src={bridalImg} alt="Bridal" /></div>
              <h4>BRIDAL</h4>
            </div>
            <div className="dropdown-card">
              <div className="dropdown-card-img-wrapper" style={{ backgroundColor: '#2a1a1a' }}><img src={necklaceImg} alt="Festive" style={{ mixBlendMode: 'luminosity' }} /></div>
              <h4>FESTIVE</h4>
            </div>
            <div className="dropdown-card">
              <div className="dropdown-card-img-wrapper" style={{ backgroundColor: '#1a2a2a' }}><img src={bangleImg} alt="Everyday" style={{ mixBlendMode: 'luminosity' }} /></div>
              <h4>EVERYDAY</h4>
            </div>
          </div>
        </div>

        <div className="nav-item-animate"><a href="#">NEW ARRIVALS</a></div>
        <div className="nav-item-animate"><a href="#">ABOUT US</a></div>
        <div className="nav-item-animate"><a href="/contact">CONTACT US</a></div>
      </nav>

      <div className="app-header-icons">
        <div className="header-icon-animate"><Search size={18} className="search-icon" style={{ cursor: 'pointer' }} /></div>
        <div className="header-icon-animate"><User size={18} style={{ cursor: 'pointer' }} /></div>
        <div className="header-icon-animate"><Heart size={18} style={{ cursor: 'pointer' }} /></div>
        <div className="header-icon-animate" style={{ position: 'relative', cursor: 'pointer' }}>
          <ShoppingBag size={18} />
          <span style={{ position: 'absolute', top: '-6px', right: '-8px', backgroundColor: 'var(--primary-gold)', color: '#111', fontSize: '0.6rem', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>0</span>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="app-footer">
    <div className="container footer-top">
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <div style={{ marginBottom: '1rem' }}><LogoIcon /></div>
          <p style={{ lineHeight: '1.8', fontSize: '0.73rem', color: '#9a8a78', marginBottom: '1.5rem' }}>
            Timeless jewellery crafted with passion,<br />purity &amp; perfection. Designed to<br /><em>celebrate every moment</em> of your life.
          </p>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {['f', 'in', 'yt', 'tw'].map((s, i) => (
              <div key={i} style={{ width: '28px', height: '28px', border: '1px solid #3a2e22', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.65rem', color: '#c9a84c', fontWeight: 'bold' }}>{s}</div>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 style={{ color: 'var(--primary-gold)', marginBottom: '1.2rem', letterSpacing: '1px', fontSize: '0.78rem', fontWeight: '700' }}>SHOP</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.73rem' }}>
            {['All Jewellery', 'Necklaces', 'Earrings', 'Rings', 'Bangles', 'Pendants', 'Bridal Sets'].map(item => (
              <li key={item}><a href={item === 'Contact Us' ? '/contact' : '#'} style={{ color: '#9a8a78', textDecoration: 'none' }}>{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Collections */}
        <div>
          <h4 style={{ color: 'var(--primary-gold)', marginBottom: '1.2rem', letterSpacing: '1px', fontSize: '0.78rem', fontWeight: '700' }}>COLLECTIONS</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.73rem' }}>
            {['New Arrivals', 'Best Sellers', 'Bridal Collection', 'Traditional Collection', 'Gift Collection', 'Festive Collection'].map(item => (
              <li key={item}><a href="#" style={{ color: '#9a8a78', textDecoration: 'none' }}>{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 style={{ color: 'var(--primary-gold)', marginBottom: '1.2rem', letterSpacing: '1px', fontSize: '0.78rem', fontWeight: '700' }}>CUSTOMER CARE</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.73rem' }}>
            {['About Us', 'Contact Us', 'Shipping Policy', 'Return Policy', "FAQ's", 'Track Order'].map(item => (
              <li key={item}><a href="#" style={{ color: '#9a8a78', textDecoration: 'none' }}>{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: 'var(--primary-gold)', marginBottom: '1.2rem', letterSpacing: '1px', fontSize: '0.78rem', fontWeight: '700' }}>CONTACT US</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.73rem', color: '#9a8a78', marginBottom: '1.5rem' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <Phone size={13} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} /> +91 98765 43210
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <Mail size={13} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} /> support@anugrahafashions.com
            </p>
            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', margin: 0 }}>
              <MapPin size={13} style={{ color: 'var(--primary-gold)', flexShrink: 0, marginTop: '2px' }} />
              123, Anna Salai, Chennai,<br />Tamil Nadu - 600002, India
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {['VISA', 'MC', 'UPI', 'GPAY'].map(p => (
              <div key={p} style={{ backgroundColor: '#fff', padding: '2px 7px', borderRadius: '3px', color: '#222', fontSize: '0.58rem', fontWeight: 'bold' }}>{p}</div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p style={{ margin: 0 }}>© 2024 Anugraha Fashions. All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <span>|</span>
          <a href="#">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>
  </footer>
);

const MainLayout = () => (
  <div>
    <TopBar />
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="category" element={<Category />} />
        <Route path="product" element={<Product />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="supplier" element={<Supplier />} />
        <Route path="orders" element={<Orders />} />
        <Route path="offline-orders" element={<OfflineOrders />} />
      </Route>
    </Routes>
  );
}
