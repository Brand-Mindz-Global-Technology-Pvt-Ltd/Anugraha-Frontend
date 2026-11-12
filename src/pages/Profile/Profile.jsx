import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Heart, ShoppingBag,
  LogOut, Edit2, Home, ChevronRight, ArrowLeft
} from 'lucide-react';
import logoImg from '../../assets/Images/logo.png';
import heroBannerImg from '../../assets/Images/about/Elegant Indian Saree Portrait.png';
import jhumkaImg from '../../assets/Images/about/Traditional Gold Jhumka Earrings.png';
import sidebarJewelleryImg from '../../assets/Images/login/anugraha_desktop.png';
import avatarImg from '../../assets/Images/about/founder_priya.jpg';
import './Profile.css';
import api from "../../services/api";

export default function Profile() {
  const navigate = useNavigate();

  /* ── Hide site chrome (TopBar, Header, Footer) ── */
  useEffect(() => {
    const header = document.querySelector('.app-header');
    const topbar = document.querySelector('.topbar');
    const footer = document.querySelector('.app-footer');
    const prevH = header ? header.style.display : '';
    const prevT = topbar ? topbar.style.display : '';
    const prevF = footer ? footer.style.display : '';
    if (header) header.style.display = 'none';
    if (topbar) topbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    return () => {
      if (header) {
        header.style.display = prevH;
        header.style.removeProperty('display');
      }
      if (topbar) {
        topbar.style.display = prevT;
        topbar.style.removeProperty('display');
      }
      if (footer) {
        footer.style.display = prevF;
        footer.style.removeProperty('display');
      }
    };
  }, []);

  /* ── Active navigation state: 'profile' | 'orders' | 'addresses' ── */
  const [activeNav, setActiveNav] = useState('profile');

  /* ── Customer data from API ── */
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: ''
  });
  const [savedAddress, setSavedAddress] = useState(null);
  const [allAddresses, setAllAddresses] = useState([]);
  const [recentOrder, setRecentOrder] = useState(null);
  const [allOrders, setAllOrders] = useState([]);

  /* ── Fetch profile, addresses and orders ── */
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("customerToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await api.get("/customers/profile");

        const profile =
          response.data.customer ||
          response.data.data ||
          response.data;

        setCustomer({
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          avatar: profile.avatar || profile.profileImage || ''
        });

        const customerMongoId = profile.id || profile._id;
        if (customerMongoId) {
          localStorage.setItem("customerMongoId", customerMongoId);
        }

        const u = JSON.parse(localStorage.getItem("customerUser") || "{}");
        const cId = customerMongoId || u.id || u._id;

        if (cId) {
          // Fetch addresses
          try {
            const addrRes = await api.get(`/customers/address/${cId}`);
            if (addrRes.data?.data?.length > 0) {
              setAllAddresses(addrRes.data.data);
              const def = addrRes.data.data.find(a => a.isDefault) || addrRes.data.data[0];
              setSavedAddress(def);
            } else {
              setAllAddresses([]);
              setSavedAddress(null);
            }
          } catch (e) {
            setAllAddresses([]);
            setSavedAddress(null);
          }

          // Fetch orders
          try {
            const ordRes = await api.get(`/customers/orders/customer/${cId}`);
            if (ordRes.data?.data?.length > 0) {
              setAllOrders(ordRes.data.data);
              setRecentOrder(ordRes.data.data[0]);
            } else {
              setAllOrders([]);
              setRecentOrder(null);
            }
          } catch (e) {
            setAllOrders([]);
            setRecentOrder(null);
          }
        }
      } catch (error) {
        console.error("Profile fetch error:", error);

        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('customerToken');
          localStorage.removeItem('customerUser');
          localStorage.removeItem('customerMongoId');
          window.dispatchEvent(new Event("authChanged"));
          navigate('/login');
          return;
        }

        const stored = JSON.parse(
          localStorage.getItem("customerUser") || "null"
        );

        if (stored) {
          setCustomer({
            name: stored.name || stored.fullName || '',
            email: stored.email || '',
            phone: stored.phone || stored.phoneNumber || '',
            avatar: stored.avatar || ''
          });
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  /* ── Personal Info Edit State ── */
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', phone: '' });

  const startEdit = () => {
    setEditData({ name: customer.name, phone: customer.phone });
    setIsEditing(true);
  };
  const cancelEdit = () => setIsEditing(false);
  const saveEdit = async () => {
    try {
      const response = await api.put("/customers/profile", {
        name: editData.name,
        phone: editData.phone
      });

      const profile =
        response.data.customer ||
        response.data.data ||
        response.data;

      setCustomer(prev => ({
        ...prev,
        name: profile.name || editData.name,
        phone: profile.phone || editData.phone
      }));

      setIsEditing(false);

      localStorage.setItem(
        "customerUser",
        JSON.stringify({
          ...customer,
          name: profile.name || editData.name,
          phone: profile.phone || editData.phone
        })
      );

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      alert(
        error.response?.data?.message ||
        "Profile update failed. Please try again."
      );
    }
  };

  /* ── Address Edit State ── */
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editAddress, setEditAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: ''
  });

  const startAddressEdit = () => {
    setEditAddress({
      addressLine1: savedAddress?.addressLine1 || '',
      addressLine2: savedAddress?.addressLine2 || '',
      city: savedAddress?.city || '',
      state: savedAddress?.state || '',
      pincode: savedAddress?.pincode || ''
    });
    setIsEditingAddress(true);
  };

  const cancelAddressEdit = () => {
    setIsEditingAddress(false);
  };

  const saveAddressEdit = async () => {
    try {
      const u = JSON.parse(localStorage.getItem("customerUser") || "{}");
      const customerMongoId = localStorage.getItem("customerMongoId");
      const cId = customerMongoId || u.id || u._id;

      if (!cId) {
        alert("Please login again to update your address.");
        return;
      }

      if (!editAddress.addressLine1?.trim() || !editAddress.city?.trim() || !editAddress.pincode?.trim()) {
        alert("Please fill in address, city, and pincode.");
        return;
      }

      if (savedAddress && savedAddress._id) {
        const res = await api.put(`/customers/address/${cId}/${savedAddress._id}`, {
          ...savedAddress,
          addressLine1: editAddress.addressLine1.trim(),
          addressLine2: editAddress.addressLine2?.trim() || '',
          city: editAddress.city.trim(),
          state: editAddress.state.trim(),
          pincode: editAddress.pincode.trim()
        });

        const updated = res.data?.data || {
          ...savedAddress,
          addressLine1: editAddress.addressLine1.trim(),
          addressLine2: editAddress.addressLine2?.trim() || '',
          city: editAddress.city.trim(),
          state: editAddress.state.trim(),
          pincode: editAddress.pincode.trim()
        };

        setSavedAddress(updated);
        setAllAddresses(prev => prev.map(a => a._id === updated._id ? updated : a));
      } else {
        const res = await api.post("/customers/address/craete-address", {
          customerId: cId,
          type: "Home",
          fullName: customer.name || "Customer",
          phone: customer.phone || "",
          addressLine1: editAddress.addressLine1.trim(),
          addressLine2: editAddress.addressLine2?.trim() || '',
          city: editAddress.city.trim(),
          state: editAddress.state.trim(),
          pincode: editAddress.pincode.trim(),
          isDefault: true
        });

        if (res.data?.data) {
          setSavedAddress(res.data.data);
          setAllAddresses([res.data.data]);
        }
      }

      setIsEditingAddress(false);
      alert("Address updated successfully!");
    } catch (error) {
      console.error("Address update error:", error);
      alert(error.response?.data?.message || "Failed to save address. Please try again.");
    }
  };

  /* ── Logout ── */
  const handleLogout = () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerUser');
    localStorage.removeItem('customerId');
    localStorage.removeItem('customerMongoId');
    localStorage.removeItem('customerWishlist');
    window.dispatchEvent(new Event("authChanged"));
    window.dispatchEvent(new Event("wishlistUpdated"));
    navigate('/login');
  };

  /* ── Avatar initials ── */
  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  /* ── Sidebar Nav Items (Desktop / Tablet) ── */
  const sidebarNavItems = [
    { key: 'home', Icon: Home, label: 'Home' },
    { key: 'profile', Icon: User, label: 'My Profile' },
    { key: 'orders', Icon: ShoppingBag, label: 'Orders' },
    { key: 'addresses', Icon: MapPin, label: 'Addresses' },
    { key: 'wishlist', Icon: Heart, label: 'Wishlist' },
  ];

  /* ── Mobile Bottom Nav Items ── */
  const mobileNavItems = [
    { key: 'home', Icon: Home, label: 'Home' },
    { key: 'profile', Icon: User, label: 'My Profile' },
    { key: 'orders', Icon: ShoppingBag, label: 'Orders' },
    { key: 'addresses', Icon: MapPin, label: 'Addresses' },
    { key: 'wishlist', Icon: Heart, label: 'Wishlist' },
    { key: 'logout', Icon: LogOut, label: 'Logout' },
  ];

  const handleNavClick = (key) => {
    if (key === 'home') {
      navigate('/');
      return;
    }
    if (key === 'wishlist') {
      navigate('/wishlist');
      return;
    }
    if (key === 'logout') {
      handleLogout();
      return;
    }
    setActiveNav(key);
  };

  return (
    <div className="pf-wrapper">
      <div className="pf-layout">

        {/* ══════════════════════════════
            SIDEBAR (Desktop / Tablet)
            ══════════════════════════════ */}
        <aside className="pf-sidebar">
          <div className="pf-sidebar-top">
            {/* Logo — Prominent & Visible */}
            <div className="pf-sidebar-logo-wrap">
              <Link
                to="/"
                title="Back to Home"
                className="pf-sidebar-logo-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
              >
                <img src={logoImg} alt="Anugraha Fashions" className="pf-sidebar-logo" />
              </Link>
            </div>

            {/* Divider */}
            <div className="pf-sidebar-divider" aria-hidden="true">
              <span className="pf-sdiv-line" />
              <span className="pf-sdiv-icon">✦</span>
              <span className="pf-sdiv-line" />
            </div>

            {/* Navigation */}
            <nav className="pf-sidebar-nav" aria-label="Profile navigation">
              {sidebarNavItems.map(({ key, Icon, label }) => {
                const isActive = activeNav === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleNavClick(key)}
                    className={`pf-nav-item${isActive ? ' is-active' : ''}`}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2 : 1.6} className="pf-nav-icon" />
                    <span className="pf-nav-label">{label}</span>
                    {isActive && <ChevronRight size={15} className="pf-nav-chevron" />}
                  </button>
                );
              })}

              <button
                className="pf-nav-item pf-logout-btn"
                type="button"
                onClick={handleLogout}
                aria-label="Log out"
              >
                <LogOut size={18} strokeWidth={1.6} className="pf-nav-icon" />
                <span className="pf-nav-label">Logout</span>
              </button>
            </nav>
          </div>

          {/* Bottom jewellery photo */}
          <div className="pf-sidebar-bottom" aria-hidden="true">
            <svg className="pf-sidebar-floral" viewBox="0 0 240 70" fill="none">
              <path d="M0 50 C40 28 90 20 140 40 C175 52 205 45 240 30"
                stroke="#c5a059" strokeWidth="0.85" opacity="0.35" />
              <path d="M0 62 C50 38 105 30 150 50 C185 62 215 54 240 40"
                stroke="#c5a059" strokeWidth="0.6" opacity="0.22" />
              <circle cx="120" cy="35" r="24"
                stroke="#c5a059" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.2" />
            </svg>
            <div className="pf-sidebar-jewel-photo">
              <img
                src={sidebarJewelleryImg}
                alt=""
                className="pf-sidebar-jewel-img"
              />
            </div>
          </div>
        </aside>

        {/* ══════════════════════════════
            MAIN CONTENT
            ══════════════════════════════ */}
        <main className="pf-main">

          {/* Mobile Top Branding Bar (only visible on mobile screens) */}
          <header className="pf-mobile-top-bar">
            <Link to="/" className="pf-mobile-logo-link" title="Anugraha Fashions Home" onClick={() => navigate('/')}>
              <img src={logoImg} alt="Anugraha Fashions" className="pf-mobile-logo" />
            </Link>
          </header>

          {/* ── Compact Header Banner ── */}
          <div className="pf-header-banner">
            <div className="pf-header-text">
              <div className="pf-header-ornament" aria-hidden="true">
                <span className="pf-orn-line" />
                <span className="pf-orn-dot">✦</span>
                <span className="pf-orn-line" />
              </div>
              <h1 className="pf-title">
                {activeNav === 'orders' ? 'My Orders' : activeNav === 'addresses' ? 'My Addresses' : 'My Profile'}
              </h1>
              <p className="pf-subtitle">
                {activeNav === 'orders'
                  ? 'Track and review your handcrafted jewellery orders.'
                  : activeNav === 'addresses'
                  ? 'Manage your delivery and billing addresses.'
                  : 'Manage your details and cherish your jewellery journey.'}
              </p>
            </div>
            <div className="pf-header-photo-wrap" aria-hidden="true">
              <img
                src={heroBannerImg}
                alt="Anugraha Model"
                className="pf-header-photo"
              />
            </div>
          </div>

          {/* Section Breadcrumb/Back button if in subviews */}
          {activeNav !== 'profile' && (
            <div className="pf-subview-bar">
              <button
                type="button"
                className="pf-back-to-profile-btn"
                onClick={() => setActiveNav('profile')}
              >
                <ArrowLeft size={15} />
                <span>Back to My Profile</span>
              </button>
            </div>
          )}

          {/* ── Content Area ── */}
          <div className="pf-cards">

            {/* ══════════════════════════════
                1. PROFILE OVERVIEW VIEW
                ══════════════════════════════ */}
            {activeNav === 'profile' && (
              <>
                {/* ── Personal Information Card ── */}
                <section className="pf-card" aria-label="Personal Information">
                  <div className="pf-card-header">
                    <div className="pf-card-title-group">
                      <User size={18} strokeWidth={1.7} className="pf-card-icon" />
                      <h2 className="pf-card-title">Personal Information</h2>
                    </div>
                    {!isEditing && (
                      <button className="pf-edit-btn" type="button" onClick={startEdit}>
                        <Edit2 size={13} strokeWidth={1.8} />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    /* Edit Mode */
                    <div className="pf-personal-row">
                      <div className="pf-avatar">
                        <img
                          src={customer.avatar || avatarImg}
                          alt={customer.name || 'User Avatar'}
                          className="pf-avatar-img"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="pf-avatar-placeholder" style={{ display: 'none' }}>
                          <span className="pf-avatar-initials">{getInitials(editData.name)}</span>
                        </div>
                      </div>
                      <div className="pf-edit-fields">
                        <div className="pf-edit-group">
                          <label className="pf-edit-label" htmlFor="edit-name">Full Name</label>
                          <input
                            id="edit-name"
                            className="pf-edit-input"
                            value={editData.name}
                            onChange={e => setEditData(p => ({ ...p, name: e.target.value }))}
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="pf-edit-group">
                          <label className="pf-edit-label" htmlFor="edit-phone">Phone Number</label>
                          <input
                            id="edit-phone"
                            className="pf-edit-input"
                            value={editData.phone}
                            onChange={e => setEditData(p => ({ ...p, phone: e.target.value }))}
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                        <div className="pf-edit-actions">
                          <button className="pf-save-btn" type="button" onClick={saveEdit}>Save</button>
                          <button className="pf-cancel-btn" type="button" onClick={cancelEdit}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div className="pf-personal-row">
                      <div className="pf-avatar">
                        <img
                          src={customer.avatar || avatarImg}
                          alt={customer.name || 'User Avatar'}
                          className="pf-avatar-img"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="pf-avatar-placeholder" style={{ display: 'none' }}>
                          <span className="pf-avatar-initials">{getInitials(customer.name)}</span>
                        </div>
                      </div>
                      <div className="pf-info-fields">
                        <div className="pf-info-row">
                          <User size={15} strokeWidth={1.5} className="pf-info-icon" />
                          <div>
                            <span className="pf-field-label">Full Name</span>
                            <span className="pf-field-value">{customer.name || '—'}</span>
                          </div>
                        </div>
                        <div className="pf-info-row">
                          <Mail size={15} strokeWidth={1.5} className="pf-info-icon" />
                          <div>
                            <span className="pf-field-label">Email Address</span>
                            <span className="pf-field-value">{customer.email || '—'}</span>
                          </div>
                        </div>
                        <div className="pf-info-row">
                          <Phone size={15} strokeWidth={1.5} className="pf-info-icon" />
                          <div>
                            <span className="pf-field-label">Phone Number</span>
                            <span className="pf-field-value">{customer.phone || '—'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </section>

                {/* ── Default Address Card ── */}
                <section className="pf-card" aria-label="Default Address">
                  <div className="pf-card-header">
                    <div className="pf-card-title-group">
                      <MapPin size={18} strokeWidth={1.7} className="pf-card-icon" />
                      <h2 className="pf-card-title">Default Address</h2>
                    </div>
                    {!isEditingAddress && (
                      <button className="pf-edit-btn" type="button" onClick={startAddressEdit}>
                        <Edit2 size={13} strokeWidth={1.8} />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  {isEditingAddress ? (
                    /* Address Edit Mode */
                    <div className="pf-address-edit-box">
                      <div className="pf-address-edit-grid">
                        <div className="pf-edit-group pf-address-edit-full">
                          <label className="pf-edit-label" htmlFor="addr-line1">Street Address / Building</label>
                          <input
                            id="addr-line1"
                            className="pf-edit-input"
                            value={editAddress.addressLine1}
                            onChange={e => setEditAddress(p => ({ ...p, addressLine1: e.target.value }))}
                            placeholder="123, Anugraha Nagar, Main Road"
                          />
                        </div>
                        <div className="pf-edit-group">
                          <label className="pf-edit-label" htmlFor="addr-city">City</label>
                          <input
                            id="addr-city"
                            className="pf-edit-input"
                            value={editAddress.city}
                            onChange={e => setEditAddress(p => ({ ...p, city: e.target.value }))}
                            placeholder="Chennai"
                          />
                        </div>
                        <div className="pf-edit-group">
                          <label className="pf-edit-label" htmlFor="addr-state">State</label>
                          <input
                            id="addr-state"
                            className="pf-edit-input"
                            value={editAddress.state}
                            onChange={e => setEditAddress(p => ({ ...p, state: e.target.value }))}
                            placeholder="Tamil Nadu"
                          />
                        </div>
                        <div className="pf-edit-group pf-address-edit-full">
                          <label className="pf-edit-label" htmlFor="addr-pincode">Pincode</label>
                          <input
                            id="addr-pincode"
                            className="pf-edit-input"
                            value={editAddress.pincode}
                            onChange={e => setEditAddress(p => ({ ...p, pincode: e.target.value }))}
                            placeholder="600042"
                          />
                        </div>
                      </div>
                      <div className="pf-edit-actions">
                        <button className="pf-save-btn" type="button" onClick={saveAddressEdit}>Save Address</button>
                        <button className="pf-cancel-btn" type="button" onClick={cancelAddressEdit}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    /* Address View Mode */
                    <div className="pf-address-row">
                      <div className="pf-address-icon-box">
                        <Home size={22} strokeWidth={1.5} className="pf-address-home-icon" />
                      </div>
                      <div className="pf-address-text">
                        {savedAddress ? (
                          <>
                            <span className="pf-addr-line-main">
                              {savedAddress.addressLine1 || savedAddress.addressLine2 || "Address registered"}
                            </span>
                            <span className="pf-addr-line-sub">
                              {savedAddress.city ? `${savedAddress.city}, ` : ""}
                              {savedAddress.state ? `${savedAddress.state} - ` : ""}
                              {savedAddress.pincode || ""}
                            </span>
                          </>
                        ) : (
                          <span className="pf-empty-hint">
                            No default address saved yet. Click Edit to add your address.
                          </span>
                        )}
                      </div>
                      {savedAddress && <span className="pf-default-badge">Default</span>}
                    </div>
                  )}
                </section>

                {/* ── Recent Order Card ── */}
                <section className="pf-card" aria-label="Recent Order">
                  <div className="pf-card-header">
                    <div className="pf-card-title-group">
                      <ShoppingBag size={18} strokeWidth={1.7} className="pf-card-icon" />
                      <h2 className="pf-card-title">Recent Order</h2>
                    </div>
                    {allOrders.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setActiveNav('orders')}
                        className="pf-viewall-btn"
                      >
                        View All <span className="pf-viewall-arrow">→</span>
                      </button>
                    )}
                  </div>
                  {recentOrder ? (
                    <div className="pf-order-row">
                      <div className="pf-order-img-wrap">
                        <img
                          src={recentOrder?.items?.[0]?.image || recentOrder?.orderItems?.[0]?.image || jhumkaImg}
                          alt={recentOrder?.items?.[0]?.name || "Recent Order"}
                          className="pf-order-img"
                          onError={(e) => { e.target.src = jhumkaImg; }}
                        />
                      </div>
                      <div className="pf-order-details">
                        <p className="pf-order-name">
                          {recentOrder?.items?.[0]?.name || recentOrder?.orderItems?.[0]?.name || "Handcrafted Jewellery Order"}
                        </p>
                        <p className="pf-order-meta">
                          Order #{recentOrder?.orderId || recentOrder?._id?.slice(-8).toUpperCase()}
                        </p>
                        <p className="pf-order-meta">
                          {recentOrder?.createdAt
                            ? new Date(recentOrder.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })
                            : "Recent Purchase"}
                        </p>
                        <span className={`pf-status-badge ${
                          recentOrder?.orderStatus === "cancelled"
                            ? "pf-status-cancelled"
                            : recentOrder?.orderStatus === "delivered"
                            ? "pf-status-delivered"
                            : "pf-status-processing"
                        }`}>
                          {recentOrder?.orderStatus
                            ? (recentOrder.orderStatus.charAt(0).toUpperCase() + recentOrder.orderStatus.slice(1))
                            : "Delivered"}
                        </span>
                      </div>
                      <div className="pf-order-price">
                        ₹ {Number(recentOrder?.totalAmount || recentOrder?.totalPrice || 0).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ) : (
                    <div className="pf-empty-card-msg">
                      No orders placed yet. Your recent orders will appear here.
                    </div>
                  )}
                </section>
              </>
            )}

            {/* ══════════════════════════════
                2. ALL ORDERS VIEW
                ══════════════════════════════ */}
            {activeNav === 'orders' && (
              <section className="pf-orders-view" aria-label="My Orders List">
                {allOrders.length > 0 ? (
                  <div className="pf-orders-list">
                    {allOrders.map((order, idx) => {
                      const orderId = order.orderId || order._id?.slice(-8).toUpperCase();
                      const dateStr = order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })
                        : '—';
                      const items = order.items || order.orderItems || [];
                      const primaryItem = items[0] || {};
                      const status = (order.orderStatus || 'Delivered').toLowerCase();

                      return (
                        <div key={order._id || idx} className="pf-card pf-order-card-detailed">
                          <div className="pf-order-card-top">
                            <div>
                              <span className="pf-order-num-label">Order #{orderId}</span>
                              <span className="pf-order-date-text">{dateStr}</span>
                            </div>
                            <span className={`pf-status-badge ${
                              status === 'cancelled'
                                ? 'pf-status-cancelled'
                                : status === 'delivered'
                                ? 'pf-status-delivered'
                                : 'pf-status-processing'
                            }`}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                          </div>

                          <div className="pf-order-row" style={{ marginTop: '12px' }}>
                            <div className="pf-order-img-wrap">
                              <img
                                src={primaryItem.image || jhumkaImg}
                                alt={primaryItem.name || "Product"}
                                className="pf-order-img"
                                onError={(e) => { e.target.src = jhumkaImg; }}
                              />
                            </div>
                            <div className="pf-order-details">
                              <p className="pf-order-name">{primaryItem.name || 'Traditional Jewellery Piece'}</p>
                              {items.length > 1 && (
                                <p className="pf-order-more-items">+ {items.length - 1} more item{items.length > 2 ? 's' : ''}</p>
                              )}
                              <p className="pf-order-payment-type">
                                Payment: {order.paymentMethod || 'Online'}
                              </p>
                            </div>
                            <div className="pf-order-price">
                              ₹ {Number(order.totalAmount || order.totalPrice || 0).toLocaleString("en-IN")}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="pf-card pf-empty-state-card">
                    <ShoppingBag size={42} strokeWidth={1.3} className="pf-empty-icon" />
                    <h3 className="pf-empty-title">No Orders Yet</h3>
                    <p className="pf-empty-text">
                      You have not placed any orders yet. Discover our latest gold and diamond collections.
                    </p>
                    <Link to="/" className="pf-empty-action-btn">
                      Browse Collections
                    </Link>
                  </div>
                )}
              </section>
            )}

            {/* ══════════════════════════════
                3. SAVED ADDRESSES VIEW
                ══════════════════════════════ */}
            {activeNav === 'addresses' && (
              <section className="pf-addresses-view" aria-label="Saved Addresses">
                <div className="pf-card">
                  <div className="pf-card-header">
                    <div className="pf-card-title-group">
                      <MapPin size={18} strokeWidth={1.7} className="pf-card-icon" />
                      <h2 className="pf-card-title">Default Delivery Address</h2>
                    </div>
                    {!isEditingAddress && (
                      <button className="pf-edit-btn" type="button" onClick={startAddressEdit}>
                        <Edit2 size={13} strokeWidth={1.8} />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  {isEditingAddress ? (
                    <div className="pf-address-edit-box">
                      <div className="pf-address-edit-grid">
                        <div className="pf-edit-group pf-address-edit-full">
                          <label className="pf-edit-label" htmlFor="addr-line1-full">Street Address / Building</label>
                          <input
                            id="addr-line1-full"
                            className="pf-edit-input"
                            value={editAddress.addressLine1}
                            onChange={e => setEditAddress(p => ({ ...p, addressLine1: e.target.value }))}
                            placeholder="123, Anugraha Nagar, Main Road"
                          />
                        </div>
                        <div className="pf-edit-group">
                          <label className="pf-edit-label" htmlFor="addr-city-full">City</label>
                          <input
                            id="addr-city-full"
                            className="pf-edit-input"
                            value={editAddress.city}
                            onChange={e => setEditAddress(p => ({ ...p, city: e.target.value }))}
                            placeholder="Chennai"
                          />
                        </div>
                        <div className="pf-edit-group">
                          <label className="pf-edit-label" htmlFor="addr-state-full">State</label>
                          <input
                            id="addr-state-full"
                            className="pf-edit-input"
                            value={editAddress.state}
                            onChange={e => setEditAddress(p => ({ ...p, state: e.target.value }))}
                            placeholder="Tamil Nadu"
                          />
                        </div>
                        <div className="pf-edit-group pf-address-edit-full">
                          <label className="pf-edit-label" htmlFor="addr-pincode-full">Pincode</label>
                          <input
                            id="addr-pincode-full"
                            className="pf-edit-input"
                            value={editAddress.pincode}
                            onChange={e => setEditAddress(p => ({ ...p, pincode: e.target.value }))}
                            placeholder="600042"
                          />
                        </div>
                      </div>
                      <div className="pf-edit-actions">
                        <button className="pf-save-btn" type="button" onClick={saveAddressEdit}>Save Address</button>
                        <button className="pf-cancel-btn" type="button" onClick={cancelAddressEdit}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="pf-address-row">
                      <div className="pf-address-icon-box">
                        <Home size={22} strokeWidth={1.5} className="pf-address-home-icon" />
                      </div>
                      <div className="pf-address-text">
                        {savedAddress ? (
                          <>
                            <span className="pf-addr-line-main">
                              {savedAddress.addressLine1 || savedAddress.addressLine2 || "Address registered"}
                            </span>
                            <span className="pf-addr-line-sub">
                              {savedAddress.city ? `${savedAddress.city}, ` : ""}
                              {savedAddress.state ? `${savedAddress.state} - ` : ""}
                              {savedAddress.pincode || ""}
                            </span>
                          </>
                        ) : (
                          <span className="pf-empty-hint">
                            No default address saved yet. Click Edit to add your address.
                          </span>
                        )}
                      </div>
                      {savedAddress && <span className="pf-default-badge">Default</span>}
                    </div>
                  )}
                </div>
              </section>
            )}

          </div>{/* /pf-cards */}
        </main>
      </div>

      {/* ══════════════════════════════
          MOBILE BOTTOM NAVIGATION
          (Only visible on mobile screens)
          ══════════════════════════════ */}
      <nav className="pf-mobile-bottom-nav" aria-label="Mobile Navigation">
        {mobileNavItems.map(({ key, Icon, label }) => {
          const isActive = activeNav === key;
          return (
            <button
              key={key}
              type="button"
              className={`pf-mob-nav-btn${isActive ? ' is-active' : ''}`}
              onClick={() => handleNavClick(key)}
              aria-label={label}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.6} className="pf-mob-nav-icon" />
              <span className="pf-mob-nav-label">{label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}
