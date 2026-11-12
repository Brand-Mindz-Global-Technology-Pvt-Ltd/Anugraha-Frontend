import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import loginImg from '../../assets/Images/login/anugraha_desktop.png';
import loginMobileImg from '../../assets/Images/login/anugraha mobile.png';
import logoImg from '../../assets/Images/logo.png';
import './Login.css';
import { fetchCustomerWishlist } from '../../services/wishlistService';

export default function Login() {
  const navigate = useNavigate();

  // Hide website Header, TopBar, and Footer to create standalone authentication page
  useEffect(() => {
    const header = document.querySelector('.app-header');
    const topbar = document.querySelector('.topbar');
    const footer = document.querySelector('.app-footer');

    const prevHeaderDisplay = header ? header.style.display : '';
    const prevTopbarDisplay = topbar ? topbar.style.display : '';
    const prevFooterDisplay = footer ? footer.style.display : '';

    if (header) header.style.display = 'none';
    if (topbar) topbar.style.display = 'none';
    if (footer) footer.style.display = 'none';

    return () => {
      if (header) header.style.display = prevHeaderDisplay;
      if (topbar) topbar.style.display = prevTopbarDisplay;
      if (footer) footer.style.display = prevFooterDisplay;
    };
  }, []);

  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'emailOrPhone':
        if (!value.trim()) return 'Email or phone number is required';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    setTouched({
      emailOrPhone: true,
      password: true,
    });

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const identifier = formData.emailOrPhone.trim();
      const isEmail = identifier.includes('@');

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/customers/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isEmail
              ? { email: identifier, password: formData.password }
              : { phone: identifier, password: formData.password }
          ),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      const customer = result.data;

      localStorage.setItem("customerToken", customer.token);
      localStorage.setItem("customerId", customer.customerId);
      localStorage.setItem("customerMongoId", customer.id);
      localStorage.setItem(
        "customerUser",
        JSON.stringify({
          id: customer.id,
          customerId: customer.customerId,
          name: customer.name,
          email: customer.email,
          phone: customer.phone || "",
        })
      );

      // Trigger global auth & wishlist updates
      window.dispatchEvent(new Event("authChanged"));
      window.dispatchEvent(new Event("wishlistUpdated"));

      // Pre-fetch customer wishlist in background
      fetchCustomerWishlist().catch(() => {});

      setSubmitSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      alert(error.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Main Login Card with authentic background */}
      <div className="login-card">
        {/* Form panel placed inside the blank cream panel on the right */}
        <div className="login-form-panel">
          {/* Centered Anugraha Fashions Logo */}
          <div className="login-brand-logo-wrap">
            <img
              src={logoImg}
              alt="Anugraha Fashions"
              className="login-brand-logo-img"
            />
          </div>

          {/* Ornamental Divider */}
          <div className="ornamental-divider" aria-hidden="true">
            <span className="ornament-line"></span>
            <span className="ornament-icon">✦</span>
            <span className="ornament-line"></span>
          </div>

          {/* Heading and Subtitle */}
          <h1 className="login-title">Login</h1>
          <p className="login-tagline">
            Continue your journey of timeless jewellery.
          </p>

          {/* Success Notification */}
          {submitSuccess && (
            <div className="login-feedback success">
              <CheckCircle2 size={15} />
              <span>Login successful! Welcome back...</span>
            </div>
          )}

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* 1. Email or Phone Number */}
            <div className="form-field-group">
              <div className={`input-pill ${errors.emailOrPhone && touched.emailOrPhone ? 'has-error' : ''}`}>
                <span className="pill-icon">
                  <Mail size={16} strokeWidth={1.5} />
                </span>
                <input
                  type="text"
                  name="emailOrPhone"
                  placeholder="Email or Phone Number"
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="username"
                />
              </div>
              {errors.emailOrPhone && touched.emailOrPhone && (
                <span className="field-error-text">{errors.emailOrPhone}</span>
              )}
            </div>

            {/* 2. Password */}
            <div className="form-field-group">
              <div className={`input-pill ${errors.password && touched.password ? 'has-error' : ''}`}>
                <span className="pill-icon">
                  <Lock size={16} strokeWidth={1.5} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff size={16} strokeWidth={1.5} />
                  ) : (
                    <Eye size={16} strokeWidth={1.5} />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <span className="field-error-text">{errors.password}</span>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="login-forgot-row">
              <a
                href="#forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  alert("For password reset assistance, please contact Anugraha support at support@anugrahafashions.com or call +91 98765 43210.");
                }}
                className="forgot-password-link"
              >
                Forgot Password?
              </a>
            </div>

            {/* Log In Action Button */}
            <button
              type="submit"
              className="login-cta-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Logging In...'
              ) : (
                <>
                  Login <span className="cta-arrow">→</span>
                </>
              )}
            </button>
          </form>

          {/* Ornamental Divider */}
          <div className="ornamental-divider" aria-hidden="true">
            <span className="ornament-line"></span>
            <span className="ornament-icon">✦</span>
            <span className="ornament-line"></span>
          </div>

          {/* Footer Text */}
          <div className="login-signup-footer">
            Don't have an account?{' '}
            <Link to="/register" className="signup-link">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

