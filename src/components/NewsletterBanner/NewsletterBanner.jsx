import React, { useState, useEffect, useRef } from 'react';
import './NewsletterBanner.css';

export default function NewsletterBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Please enter a valid email address.');
      return;
    }
    setStatus('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <section className="newsletter-section" ref={sectionRef} aria-label="Newsletter Subscription">
      {/* Subtle Background Pattern Placeholder */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }}></div>

      <div className={`container newsletter-inner ${isVisible ? 'news-visible' : ''}`}>
        <div className="newsletter-left">
          <div className="news-anim-icon" style={{ color: 'var(--primary-gold)' }}>
            {/* Diya placeholder */}
            <div style={{ fontSize: '3rem' }}>🪔</div>
          </div>
          <div className="news-anim-text">
            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-gold)', marginBottom: '0.5rem' }}>Be the first to know</h2>
            <p style={{ fontSize: '0.85rem', color: '#ccc' }}>Subscribe to get updates on new arrivals,<br />exclusive offers and more.</p>
          </div>
        </div>

        {/* Decorative Divider to fill empty space */}
        <div className="newsletter-divider news-anim-divider">
          <span style={{ color: 'var(--primary-gold)', opacity: 0.5, fontSize: '0.6rem' }}>◆</span>
        </div>

        <form className="newsletter-form news-anim-form" onSubmit={handleSubmit} noValidate>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="newsletter-input" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status) setStatus('');
            }}
            aria-label="Email address"
          />
          <button type="submit" className="newsletter-btn">
            SUBSCRIBE
            <div className="newsletter-btn-shimmer"></div>
          </button>
          {status && (
            <p className={`newsletter-status-feedback ${status.includes('Thank') ? 'is-success' : 'is-error'}`} role="status">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export { NewsletterBanner as Newsletter };
