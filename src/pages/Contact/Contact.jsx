import React from 'react';
import { Mail, MapPin, MessageCircle, Phone, ArrowUpRight, ChevronDown } from 'lucide-react';
import helpImage from '../../assets/Images/contact/we_are_here_to_help.png';
import contactHeroImage from '../../assets/Images/contact/image.png';
import NewsletterBanner from '../../components/NewsletterBanner/NewsletterBanner';
import './Contact.css';

const contactMethods = [
  { icon: Phone, label: 'CALL US', detail: '+91 98765 43210', note: 'Mon - Sat, 10 AM - 7 PM', href: 'tel:+919876543210' },
  { icon: Mail, label: 'EMAIL US', detail: 'support@anugrahafashions.com', note: 'We reply within 24 hours', href: 'mailto:support@anugrahafashions.com' },
  { icon: MapPin, label: 'VISIT OUR STORE', detail: '123, Anna Salai, Chennai, Tamil Nadu - 600001', note: '', href: 'https://maps.google.com/?q=123+Anna+Salai+Chennai' },
  { icon: MessageCircle, label: 'LIVE CHAT', detail: 'Get instant support', note: 'Mon - Sat, 10 AM - 7 PM', href: 'mailto:support@anugrahafashions.com' },
];

const questions = [
  { question: 'What are your store timings?', answer: 'Our store is open from Monday to Saturday, 10:00 AM to 7:00 PM.\nWe are closed on Sundays and public holidays.' },
  { question: 'Do you offer international shipping?', answer: 'Yes, we ship to selected international destinations. Contact our team for delivery options and estimated shipping costs.' },
  { question: 'Can I request a custom jewellery design?', answer: 'Absolutely. Share your ideas with us and our jewellery specialists will help bring your design to life.' },
  { question: 'How can I track my order?', answer: 'Once your order has shipped, we will email you a tracking link. You can also contact us with your order number for an update.' },
  { question: 'What is your return and exchange policy?', answer: 'Eligible purchases can be returned or exchanged within 7 days of delivery, subject to our jewellery care and return conditions.' },
  { question: 'How do I care for my jewellery?', answer: 'Keep each piece in its pouch, away from moisture, perfume, and household chemicals. A soft dry cloth is best for gentle cleaning.' },
];


function Contact() {
  const [sent, setSent] = React.useState(false);
  const [openQuestion, setOpenQuestion] = React.useState(0);
  const [methodsVisible, setMethodsVisible] = React.useState(false);
  const methodsRef = React.useRef(null);

  const mainRef = React.useRef(null);
  const [isMainVisible, setIsMainVisible] = React.useState(false);

  const locationRef = React.useRef(null);
  const [isLocationVisible, setIsLocationVisible] = React.useState(false);

  const faqRef = React.useRef(null);
  const [isFaqVisible, setIsFaqVisible] = React.useState(false);

  React.useEffect(() => {
    const section = methodsRef.current;
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      setMethodsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMethodsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const mainSection = mainRef.current;
    if (!mainSection) return;

    if (!('IntersectionObserver' in window)) {
      setIsMainVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsMainVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observer.observe(mainSection);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const locationSection = locationRef.current;
    if (!locationSection) return;

    if (!('IntersectionObserver' in window)) {
      setIsLocationVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsLocationVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observer.observe(locationSection);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const faqSection = faqRef.current;
    if (!faqSection) return;

    if (!('IntersectionObserver' in window)) {
      setIsFaqVisible(true);
      return;
    }

    const faqObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsFaqVisible(true);
        faqObserver.disconnect();
      }
    }, { threshold: 0.15 });

    faqObserver.observe(faqSection);
    return () => faqObserver.disconnect();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-left">
          <div className="contact-hero-content">
            <p className="contact-hero-eyebrow">WE&rsquo;D LOVE TO HEAR FROM YOU</p>
            <h1><span className="contact-hero-title-line">Get in Touch</span> <span className="contact-hero-gold">with Anugraha Fashions</span></h1>
            <p className="contact-hero-description">Have a question, a special request, or need help with your order? Our team is here to assist you with warmth and care.</p>
            <a href="/collections" className="contact-hero-button">EXPLORE COLLECTIONS <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <div className="contact-hero-right">
          <img src={contactHeroImage} alt="Jewellery model" className="contact-hero-model" />
          <div className="contact-hero-overlay">
            <p className="contact-hero-overlay-text">YOUR<br />JOURNEY<br />IN JEWELLERY<br />MATTERS<br />TO US</p>
            <div className="contact-hero-ornament" aria-hidden="true">
              <span className="contact-ornament-line"></span>
              <svg className="contact-ornament-lotus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <path d="M12 21c-4-4-7-8.5-7-12a7 7 0 0 1 14 0c0 3.5-3 8-7 12z" />
                <path d="M12 21c-2-3-4-6.5-4-9a4 4 0 0 1 8 0c0 2.5-2 6-4 9z" />
                <path d="M7 13c-2.5 0-4-1.5-4-3.5a4 4 0 0 1 4-4c1 0 2 .5 2.5 1.5" />
                <path d="M17 13c2.5 0 4-1.5 4-3.5a4 4 0 0 0-4-4c-1 0-2 .5-2.5 1.5" />
              </svg>
              <span className="contact-ornament-line"></span>
            </div>
          </div>
        </div>
      </section>

      <section ref={methodsRef} className={`contact-methods${methodsVisible ? ' is-visible' : ''}`} aria-label="Contact options">
        <div className="contact-methods-inner">
          {contactMethods.map(({ icon: Icon, label, detail, note, href }, index) => (
            <div className="contact-method" key={label}>
              <Icon className="contact-method-icon" size={24} strokeWidth={1.5} aria-hidden="true" />
              <div className="contact-method-copy">
                <span className="contact-method-label">{label}</span>
                {label === 'VISIT OUR STORE' ? (
                  <span className="contact-method-detail">
                    123, Anna Salai, Chennai,<br />
                    Tamil Nadu - 600001
                  </span>
                ) : (
                  <span className="contact-method-detail">{detail}</span>
                )}
                {note && <span className="contact-method-note">{note}</span>}
              </div>
              {index < contactMethods.length - 1 && <div className="contact-method-divider" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      <section ref={mainRef} className={`contact-main container${isMainVisible ? ' is-visible' : ''}`}>
        <div className="contact-form-panel" id="contact-form">
          <p className="contact-eyebrow">SEND US A MESSAGE</p>
          <h1>We&rsquo;re Here to Help</h1>
          <div className="contact-heading-rule" aria-hidden="true"><span>✦</span></div>
          <p className="contact-intro">Have a question about a piece or need a little help? We&rsquo;d love to hear from you.</p>
          <form className="contact-form" onSubmit={handleSubmit} onChange={() => setSent(false)}>
            <label>
              Full Name <span aria-hidden="true">*</span>
              <input name="name" type="text" placeholder="Your full name" autoComplete="name" required />
            </label>
            <label>
              Email Address <span aria-hidden="true">*</span>
              <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
            </label>
            <label>
              Phone Number
              <input name="phone" type="tel" placeholder="+91 98765 43210" autoComplete="tel" />
            </label>
            <label>
              Enquiry Type <span aria-hidden="true">*</span>
              <select name="enquiry" defaultValue="" required>
                <option value="" disabled>Select an option</option>
                <option>Order support</option>
                <option>Product enquiry</option>
                <option>Custom design</option>
                <option>Returns and exchange</option>
                <option>Other</option>
              </select>
            </label>
            <label className="contact-message-field">
              Your Message <span aria-hidden="true">*</span>
              <textarea name="message" placeholder="Tell us how we can help you..." rows="4" required />
            </label>
            <label className="contact-consent">
              <input type="checkbox" required />
              <span>I agree to be contacted regarding my enquiry.</span>
            </label>
            <div className="contact-submit-row">
              <button className="contact-submit" type="submit">SEND MESSAGE <ArrowUpRight size={14} /></button>
              {sent && <p className="contact-success" role="status">Thank you. Your message is ready for our team.</p>}
            </div>
          </form>
        </div>
        <figure className="contact-image-panel">
          <img src={helpImage} alt="Anugraha jewellery display" />
          <figcaption><span>CRAFTED TO BE TREASURED</span><strong>Jewellery for your every moment</strong></figcaption>
        </figure>
      </section>

      <section ref={locationRef} className={`contact-location container${isLocationVisible ? ' is-visible' : ''}`}>
        <div className="contact-location-copy">
          <div className="contact-location-botanical" aria-hidden="true" />
          <div className="contact-location-content">
            <p className="contact-eyebrow">FIND US HERE</p>
            <h2>Our Store Location</h2>
            <div className="contact-location-ornament" aria-hidden="true">
              <span className="contact-loc-line" />
              <span className="contact-loc-lotus">🪷</span>
              <span className="contact-loc-line" />
            </div>
            <p className="contact-location-desc">Visit our flagship store in Chennai to explore our exquisite collections and find the perfect piece with us.</p>
            <div className="contact-location-rule" aria-hidden="true" />
            <div className="contact-address">
              <div className="contact-address-icon-wrap" aria-hidden="true">
                <MapPin size={18} />
              </div>
              <p><strong>Anugraha Fashions</strong><br />123, Anna Salai<br />Chennai, Tamil Nadu - 600001, India</p>
            </div>
            <a className="contact-directions" href="https://maps.google.com/?q=123+Anna+Salai+Chennai" target="_blank" rel="noreferrer">GET DIRECTIONS <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <div className="contact-map-wrap">
          <iframe
            title="Map showing Anugraha Fashions in Chennai"
            src="https://www.google.com/maps?q=Anna+Salai,+Chennai,+Tamil+Nadu&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="contact-map-label"><MapPin size={15} /> ANUGRAHA FASHIONS</div>
        </div>
      </section>

      <section className="contact-faq" ref={faqRef}>
        <div className={`contact-faq-inner${isFaqVisible ? ' is-visible' : ''}`}>

          {/* LEFT PANEL */}
          <div className="contact-faq-left">
            <div className="contact-faq-left-botanical-top" aria-hidden="true" />
            <div className="contact-faq-left-botanical-btm" aria-hidden="true" />
            <div className="contact-faq-heading-content">
              <p className="contact-eyebrow">FREQUENTLY ASKED QUESTIONS</p>
              <h2>Quick Answers<br />for You</h2>
              <div className="contact-faq-divider" aria-hidden="true">
                <span className="contact-faq-divider-line" />
                <span className="contact-faq-divider-lotus">🪷</span>
                <span className="contact-faq-divider-line" />
              </div>
              <p className="contact-faq-desc">
                Can&rsquo;t find what you&rsquo;re looking for?<br />
                Feel free to reach out to us directly &mdash;<br />
                we&rsquo;re always happy to help!
              </p>
              <a className="contact-faq-btn" href="#contact-form">
                CONTACT US &nbsp;<span className="faq-btn-arrow">&rarr;</span>
              </a>
            </div>
          </div>

          {/* RIGHT PANEL — accordion */}
          <div className="contact-faq-right">
            <div className="contact-faq-list">
              {questions.map(({ question, answer }, index) => (
                <div
                  className={`contact-faq-item${openQuestion === index ? ' is-open' : ''}`}
                  key={question}
                  style={{ animationDelay: `${100 + index * 60}ms` }}
                >
                  <button
                    className="contact-faq-question"
                    type="button"
                    aria-expanded={openQuestion === index}
                    aria-controls={`contact-answer-${index}`}
                    onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)}
                  >
                    <span className="contact-faq-question-text">
                      <span className="contact-faq-num">{index + 1}. </span>
                      {question}
                    </span>
                    <div className="contact-faq-chevron-wrap">
                      <ChevronDown size={13} className="contact-faq-chevron" aria-hidden="true" />
                    </div>
                  </button>
                  <div className="contact-faq-answer" id={`contact-answer-${index}`}>
                    <p>{answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <NewsletterBanner />

    </main>
  );
}

export default Contact;