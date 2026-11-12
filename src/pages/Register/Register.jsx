import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import registerImg from '../../assets/Images/login/anugraha_desktop.png';
import registerMobileImg from '../../assets/Images/login/anugraha mobile.png';
import logoImg from '../../assets/Images/logo.png';
import './Register.css';

export default function Register() {
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
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = (name, value, currentFormData = formData) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address';
        }
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[0-9+\s-]{10,15}$/.test(value.trim().replace(/\s+/g, ''))) {
          return 'Please enter a valid phone number';
        }
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== currentFormData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    if (touched[name]) {
      const error = validateField(name, value, updatedForm);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }

    if (name === 'password' && touched.confirmPassword) {
      const confirmErr = validateField('confirmPassword', formData.confirmPassword, updatedForm);
      setErrors((prev) => ({ ...prev, confirmPassword: confirmErr }));
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
      const error = validateField(key, formData[key], formData);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/customers/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      setSubmitSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (error) {
      alert(error.message || "Backend connection failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page-wrapper">
      {/* Main Registration Card with authentic background */}
      <div className="register-card">
        {/* Form panel placed inside the blank cream panel on the right */}
        <div className="register-form-panel">

        {/* Anugraha Fashions Logo */}
        <div className="register-brand-logo-wrap">
          <img
            src={logoImg}
            alt="Anugraha Fashions"
            className="register-brand-logo-img"
          />
        </div>

        {/* Ornamental Divider */}
        <div className="ornamental-divider" aria-hidden="true">
          <span className="ornament-line"></span>
          <span className="ornament-icon">✦</span>
          <span className="ornament-line"></span>
        </div>

        {/* Heading and Subtitle */}
        <h1 className="register-title">Register</h1>
        <p className="register-tagline">Join our journey of timeless jewellery.</p>

        {/* Success Notification */}
        {submitSuccess && (
          <div className="register-feedback success">
            <CheckCircle2 size={15} />
            <span>Registration successful! Redirecting to sign in...</span>
          </div>
        )}

        {/* Registration Form (5 Fields) */}
        <form className="register-form" onSubmit={handleSubmit} noValidate>

          {/* 1. Full Name */}
          <div className="form-field-group">
            <div className={`input-pill ${errors.fullName && touched.fullName ? 'has-error' : ''}`}>
              <span className="pill-icon"><User size={16} strokeWidth={1.5} /></span>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="name"
              />
            </div>
            {errors.fullName && touched.fullName && (
              <span className="field-error-text">{errors.fullName}</span>
            )}
          </div>

          {/* 2. Email Address */}
          <div className="form-field-group">
            <div className={`input-pill ${errors.email && touched.email ? 'has-error' : ''}`}>
              <span className="pill-icon"><Mail size={16} strokeWidth={1.5} /></span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
              />
            </div>
            {errors.email && touched.email && (
              <span className="field-error-text">{errors.email}</span>
            )}
          </div>

          {/* 3. Phone Number */}
          <div className="form-field-group">
            <div className={`input-pill ${errors.phone && touched.phone ? 'has-error' : ''}`}>
              <span className="pill-icon"><Phone size={16} strokeWidth={1.5} /></span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="tel"
              />
            </div>
            {errors.phone && touched.phone && (
              <span className="field-error-text">{errors.phone}</span>
            )}
          </div>

          {/* 4. Password */}
          <div className="form-field-group">
            <div className={`input-pill ${errors.password && touched.password ? 'has-error' : ''}`}>
              <span className="pill-icon"><Lock size={16} strokeWidth={1.5} /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <span className="field-error-text">{errors.password}</span>
            )}
          </div>

          {/* 5. Confirm Password */}
          <div className="form-field-group">
            <div className={`input-pill ${errors.confirmPassword && touched.confirmPassword ? 'has-error' : ''}`}>
              <span className="pill-icon"><Lock size={16} strokeWidth={1.5} /></span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <span className="field-error-text">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Register CTA Button */}
          <button type="submit" className="register-cta-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : <><span>Register</span><span className="cta-arrow">→</span></>}
          </button>
        </form>

        {/* Ornamental Divider */}
        <div className="ornamental-divider" aria-hidden="true">
          <span className="ornament-line"></span>
          <span className="ornament-icon">✦</span>
          <span className="ornament-line"></span>
        </div>

        {/* Sign In Link */}
        <div className="register-signin-footer">
          Already have an account?{' '}
          <Link to="/login" className="signin-link">Sign In</Link>
        </div>

      </div>
    </div>
  </div>
  );
}
