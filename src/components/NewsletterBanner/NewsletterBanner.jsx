import React from 'react';
import ctaBg from '../../assets/Images/contact/Elegant Diwali Lamp and Golden Flourishes.png';
import './NewsletterBanner.css';

export default function NewsletterBanner() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function handleSubmit(e) {
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
  }

  return (
    <section
      ref={sectionRef}
      className={`nlb-section${isVisible ? ' nlb-visible' : ''}`}
      style={{ backgroundImage: `url("${ctaBg}")` }}
      aria-label="Newsletter subscription"
    >
      <div className="nlb-inner">
        <div className="nlb-copy nlb-anim-copy">
          <h2>Be the first to know</h2>
          <p>
            Subscribe to get updates on new arrivals,
            <br className="nlb-br" /> exclusive offers and more.
          </p>
        </div>

        <form className="nlb-form nlb-anim-form" onSubmit={handleSubmit} noValidate>
          <label className="nlb-sr" htmlFor="nlb-email">
            Email address
          </label>
          <input
            id="nlb-email"
            className="nlb-input"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus('');
            }}
            autoComplete="email"
          />
          <button type="submit" className="nlb-btn">
            SUBSCRIBE
          </button>
        </form>
        {status && (
          <p className="nlb-status" role="status">
            {status}
          </p>
        )}
      </div>
    </section>
  );
}
