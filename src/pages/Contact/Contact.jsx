import React from 'react';
import { Mail, MapPin, MessageCircle, Phone, ArrowUpRight, ChevronDown, ChevronRight, Flame } from 'lucide-react';
import helpImage from '../../assets/Images/contact/we_are_here_to_help.png';
import contactHeroImage from '../../assets/Images/contact/contact_banner.png';
import faqImage from '../../assets/Images/home/necklace_banner.png';
import { Newsletter } from '../Home/Home';
import './Contact.css';

const contactMethods = [
  { icon: Phone, label: 'CALL US', detail: '+91 98765 43210', note: 'Mon - Sat, 10 AM - 7 PM', href: 'tel:+919876543210' },
  { icon: Mail, label: 'EMAIL US', detail: 'support@anugrahafashions.com', note: 'We reply within 24 hours', href: 'mailto:support@anugrahafashions.com' },
  { icon: MapPin, label: 'VISIT OUR STORE', detail: '123, Anna Salai, Chennai', note: 'Tamil Nadu - 600002', href: 'https://maps.google.com/?q=123+Anna+Salai+Chennai' },
  { icon: MessageCircle, label: 'LIVE CHAT', detail: 'Get instant support', note: 'Mon - Sat, 10 AM - 7 PM', href: 'mailto:support@anugrahafashions.com' },
];

const questions = [
  { question: 'What are your store timings?', answer: 'Our store is open Monday to Saturday, 10:00 AM to 7:00 PM. We are closed on Sundays and public holidays.' },
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
        <div className="contact-hero-image" style={{ backgroundImage: `url(${contactHeroImage})` }} aria-hidden="true" />
        <div className="contact-hero-content">
          <p className="contact-hero-eyebrow">WE&rsquo;D LOVE TO HEAR FROM YOU</p>
          <h1>Get in Touch <span>with Anugraha Fashions</span></h1>
          <p>Have a question, a special request, or need help with your order? Our team is here to assist you with warmth and care.</p>
          <a href="#contact-form" className="contact-hero-button">SEND US A MESSAGE <ChevronRight size={15} /></a>
        </div>
      </section>

      <section ref={methodsRef} className={`contact-methods${methodsVisible ? ' is-visible' : ''}`} aria-label="Contact options">
        <div className="contact-methods-inner">
          {contactMethods.map(({ icon: Icon, label, detail, note, href }) => (
            <a className="contact-method" href={href} key={label}>
              <Icon className="contact-method-icon" size={25} strokeWidth={1.5} aria-hidden="true" />
              <span className="contact-method-copy">
                <span className="contact-method-label">{label}</span>
                <span className="contact-method-detail">{detail}</span>
                <span className="contact-method-note">{note}</span>
              </span>
              <ArrowUpRight className="contact-method-arrow" size={15} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <section className="contact-main container">
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

      <section className="contact-location container">
        <div className="contact-location-copy">
          <p className="contact-eyebrow">FIND US HERE</p>
          <h2>Our Store Location</h2>
          <p>Visit our flagship store in Chennai to explore our exquisite collections and find the perfect piece with us.</p>
          <div className="contact-address">
            <MapPin size={21} aria-hidden="true" />
            <p><strong>Anugraha Fashions</strong><br />123, Anna Salai<br />Chennai, Tamil Nadu - 600002, India</p>
          </div>
          <a className="contact-directions" href="https://maps.google.com/?q=123+Anna+Salai+Chennai" target="_blank" rel="noreferrer">GET DIRECTIONS <ArrowUpRight size={14} /></a>
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
        <div className={`contact-faq-inner container ${isFaqVisible ? 'is-visible' : ''}`}>
          <div className="contact-faq-heading">
            <div className="contact-faq-heading-content">
              <p className="contact-eyebrow">FREQUENTLY ASKED QUESTIONS</p>
              <h2>Quick Answers<br />for You</h2>
              <p>Can&rsquo;t find what you&rsquo;re looking for? Feel free to reach out to us directly. We&rsquo;re always happy to help!</p>
              <a className="contact-directions" href="mailto:support@anugrahafashions.com">CONTACT US <ArrowUpRight size={14} /></a>
            </div>
            <figure className="contact-faq-image">
              <img src={faqImage} alt="Anugraha jewellery faq banner" loading="lazy" />
            </figure>
          </div>
          <div className="contact-faq-list">
            {questions.map(({ question, answer }, index) => (
              <div 
                className={`contact-faq-item${openQuestion === index ? ' is-open' : ''}`} 
                key={question}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <button
                  className="contact-faq-question"
                  type="button"
                  aria-expanded={openQuestion === index}
                  aria-controls={`contact-answer-${index}`}
                  onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)}
                >
                  <span className="contact-faq-question-text">{question}</span>
                  <div className="contact-faq-icon-wrap">
                    <ChevronDown size={16} aria-hidden="true" />
                  </div>
                </button>
                <div className="contact-faq-answer" id={`contact-answer-${index}`}>
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}

export default Contact;