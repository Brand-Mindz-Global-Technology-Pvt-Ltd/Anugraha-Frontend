import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Target, Eye, Shield, Scissors, Heart, Sparkles } from 'lucide-react';
import { Newsletter } from '../Home/Home';

import heroBannerImg from '../../assets/Images/about/about_banner.png';
import heritageMainImg from '../../assets/Images/about/ourstory.png';
import heritageFloatImg from '../../assets/Images/about/heritage_necklace.jpg';
import founderImg from '../../assets/Images/about/founder_priya.jpg';
import ctaBgImg from '../../assets/Images/about/about_cta.png';

// Instagram Images
import insta1 from '../../assets/Images/about/bangles_banner.jpg';
import insta2 from '../../assets/Images/about/hero_about_woman.jpg';
import insta3 from '../../assets/Images/about/heritage_necklace.jpg';
import insta4 from '../../assets/Images/about/founder_priya.jpg';
import insta5 from '../../assets/Images/about/about_banner.png';

import './About.css';

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setVisible(true); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const timelineData = [
  { title: "Heritage", desc: "Rooted in decades of traditional artistry, our journey began with a deep appreciation for the craft of fine jewellery." },
  { title: "Craftsmanship", desc: "We partnered with master artisans to ensure every piece reflects impeccable detail and uncompromised quality." },
  { title: "Modern Design", desc: "Evolving with our patrons, we seamlessly blended our rich cultural motifs with contemporary aesthetics." },
  { title: "Today", desc: "A trusted legacy brand, bringing timeless elegance and joy to thousands of women worldwide." }
];

const valuesData = [
  { icon: Shield, label: 'Authenticity', desc: '100% hallmarked jewellery with complete transparency in every transaction.' },
  { icon: Scissors, label: 'Craftsmanship', desc: 'Finely crafted designs brought to life by exceptionally skilled artisans.' },
  { icon: Heart, label: 'Customer Delight', desc: 'Your happiness and satisfaction remain at the core of everything we do.' },
  { icon: Sparkles, label: 'Tradition & Innovation', desc: 'Honouring our deep roots while embracing modern, elegant design.' },
];

export default function About() {
  const [heritageRef, heritageVisible] = useInView(0.15);
  const [timelineRef, timelineVisible] = useInView(0.2);
  const [missionRef, missionVisible] = useInView(0.2);
  const [founderRef, founderVisible] = useInView(0.2);
  const [valuesRef, valuesVisible] = useInView(0.15);
  const [instaRef, instaVisible] = useInView(0.1);

  // Counters for Founder section
  const [countVisible, setCountVisible] = useState(false);
  useEffect(() => {
    if (founderVisible) {
      setTimeout(() => setCountVisible(true), 400); // delay counters
    }
  }, [founderVisible]);

  return (
    <main className="about-page">
      
      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <div className="about-hero-img" style={{ backgroundImage: `url(${heroBannerImg})` }}></div>
          <div className="about-hero-overlay"></div>
        </div>
        <div className="container about-hero-content">
          <p className="about-eyebrow animate-fade-up delay-1">OUR JOURNEY</p>
          <h1 className="about-hero-title">
            <span className="line animate-reveal-line delay-2">Timeless Jewellery,</span>
            <span className="line animate-reveal-line delay-3">
              Crafted <span className="about-hero-accent">with Heart<span className="gold-underline"></span></span>
            </span>
          </h1>
          <p className="about-hero-desc animate-fade-up delay-4">
            At Anugraha Fashions, we believe jewellery is more than an adornment &mdash; it&apos;s a celebration of you, your story, and the moments that matter.
          </p>
        </div>
      </section>

      {/* ── HERITAGE (EDITORIAL) ── */}
      <section className="about-heritage-section container" ref={heritageRef}>
        <div className={`about-heritage-grid ${heritageVisible ? 'is-visible' : ''}`}>
          <div className="about-heritage-images">
            <img src={heritageMainImg} alt="Anugraha Fashions craftsmanship and heritage" className="heritage-main-img" />
            <img src={heritageFloatImg} alt="Craftsmanship Detail" className="heritage-float-img" />
          </div>
          <div className="about-heritage-content-wrapper">
            <div className="about-heritage-card">
              <p className="about-eyebrow about-eyebrow--gold">WHO WE ARE</p>
              <h2>A Heritage of Beauty,<br />A Promise for Tomorrow</h2>
              <p>
                Anugraha Fashions brings together timeless Indian craftsmanship and contemporary elegance, creating jewellery designed for life&apos;s most meaningful moments.
              </p>
              <a href="#" className="about-btn-jewelry">
                EXPLORE COLLECTIONS <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY TIMELINE ── */}
      <section className="about-timeline-section" id="about-story" ref={timelineRef}>
        <div className="container">
          <div className="about-section-header">
            <div className="about-story-eyebrow-wrap">
              <span className="about-story-rule" aria-hidden="true" />
              <p className="about-eyebrow">OUR STORY</p>
              <span className="about-story-rule" aria-hidden="true" />
            </div>
            <h2>From Generations to You</h2>
          </div>
          
          <div className={`about-timeline-wrapper ${timelineVisible ? 'is-visible' : ''}`}>
            <div className="timeline-line"></div>
            <div className="timeline-items">
              {timelineData.map((item, i) => (
                <div className="timeline-item" key={i} style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION (PREMIUM CARDS) ── */}
      <section className="about-mission-section" ref={missionRef}>
        <div className="container">
          <div className={`mission-grid ${missionVisible ? 'is-visible' : ''}`}>
            
            <div className="mission-card card-dark">
              <span className="mission-bg-number" aria-hidden="true">01</span>
              <div className="mission-card-content">
                <Target size={32} className="mission-icon" />
                <h3>Our Mission</h3>
                <p>To make authentic, high-quality jewellery a part of every woman&apos;s journey, while preserving our rich heritage and supporting traditional craftsmanship.</p>
              </div>
            </div>

            <div className="mission-card card-dark">
              <span className="mission-bg-number" aria-hidden="true">02</span>
              <div className="mission-card-content">
                <Eye size={32} className="mission-icon" />
                <h3>Our Vision</h3>
                <p>To be India&apos;s most loved jewellery brand, known for timeless designs, uncompromising quality and a legacy that inspires generations.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOUNDER SECTION ── */}
      <section className="about-founder-section" ref={founderRef}>
        <div className="container">
          <div className={`founder-grid ${founderVisible ? 'is-visible' : ''}`}>
            <div className="founder-image-col">
              <div className="founder-image-wrap">
                <img src={founderImg} alt="Founder Priya S." />
              </div>
            </div>
            <div className="founder-content-col">
              <p className="about-eyebrow about-eyebrow--gold">ABOUT OUR FOUNDER</p>
              <h2>A Dream Woven in Gold</h2>
              <p className="founder-lead">
                Anugraha Fashions was founded by <strong>Priya S.</strong>, a passionate entrepreneur with a deep love for Indian artistry and a vision to make traditional jewellery meaningful for the modern woman.
              </p>
              <p>
                Her journey is rooted in the belief that every woman deserves to feel special every single day.
              </p>
              <div className="founder-quote-box">
                <p className="quote-text">&ldquo;Jewellery is not just an accessory, it&apos;s a feeling &mdash; a connection to who you are, where you come from, and the moments you cherish.&rdquo;</p>
                <div className="quote-author">
                  <span className="author-name">Priya S.</span>
                  <span className="author-title">Founder, Anugraha Fashions</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`founder-stats-row ${countVisible ? 'is-visible' : ''}`}>
            <div className="stat-counter">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-counter">
              <span className="stat-number">Community</span>
              <span className="stat-label">A Growing Family</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-counter">
              <span className="stat-number">Heritage</span>
              <span className="stat-label">Carrying Forward Traditions</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES (INTERACTIVE CARDS) ── */}
      <section className="about-values-section" ref={valuesRef}>
        <div className="container">
          <div className="about-section-header">
            <div className="about-story-eyebrow-wrap">
              <span className="about-story-rule" aria-hidden="true" />
              <p className="about-eyebrow">OUR VALUES</p>
              <span className="about-story-rule" aria-hidden="true" />
            </div>
          </div>
          <div className={`values-grid ${valuesVisible ? 'is-visible' : ''}`}>
            {valuesData.map((val, i) => {
              const Icon = val.icon;
              return (
                <div className="value-interactive-card" key={val.label} style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="value-card-inner">
                    <div className="value-icon-box">
                      <Icon size={28} />
                    </div>
                    <h4>{val.label}</h4>
                    <p>{val.desc}</p>
                    <div className="value-hover-line"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER (CINEMATIC) ── */}
      <section className="about-cta-section container">
        <div className="about-cta-cinematic">
          <div className="cta-bg-layer" style={{ backgroundImage: `url(${ctaBgImg})` }}></div>
          <div className="cta-gradient-overlay"></div>
          
          <div className="cta-cinematic-content">
            <div className="cta-copy">
              <p className="about-eyebrow">DISCOVER JEWELLERY</p>
              <h2>THAT TELLS YOUR STORY</h2>
              <p>Explore our exclusive collections, from everyday elegance to once-in-a-lifetime celebrations.</p>
              <a href="#" className="about-btn-jewelry about-btn-jewelry--light">
                EXPLORE COLLECTIONS &rarr;
              </a>
            </div>
            <div className="cta-aside">
              <p>EVERY<br/>PIECE A<br/>NEW STORY</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM (EDITORIAL GALLERY) ── */}
      <section className="about-instagram-section" ref={instaRef}>
        <div className="container">
          <div className="insta-header">
            <p className="about-instagram-label">
              FOLLOW OUR JOURNEY &nbsp;
              <a href="#" className="about-instagram-handle">@anugrahafashions</a>
            </p>
          </div>
          
          <div className={`insta-editorial-grid ${instaVisible ? 'is-visible' : ''}`}>
            <div className="insta-item large">
              <img src={insta1} alt="Gallery Large" loading="lazy" />
              <div className="insta-overlay"></div>
            </div>
            <div className="insta-item small">
              <img src={insta2} alt="Gallery Small" loading="lazy" />
              <div className="insta-overlay"></div>
            </div>
            <div className="insta-item small">
              <img src={insta3} alt="Gallery Small" loading="lazy" />
              <div className="insta-overlay"></div>
            </div>
            <div className="insta-item small">
              <img src={insta4} alt="Gallery Small" loading="lazy" />
              <div className="insta-overlay"></div>
            </div>
            <div className="insta-item small">
              <img src={insta5} alt="Gallery Small" loading="lazy" />
              <div className="insta-overlay"></div>
            </div>
          </div>
          
          <div className="insta-footer">
             <a href="#" className="about-btn-jewelry">VIEW MORE ON INSTAGRAM</a>
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
