import React, { useEffect, useRef, useState } from 'react';
import { Newsletter } from '../Home/Home';

import heroBannerImg from '../../assets/Images/about/about_banner.png';
import heroModelImg from '../../assets/Images/home/home_herobanner.png';
import whoWeAreImg from '../../assets/Images/about/who_we_are_necklace.jpg';
import heritageMainImg from '../../assets/Images/about/ourstory.png';
import heritageFloatImg from '../../assets/Images/about/heritage_necklace.jpg';
import founderImg from '../../assets/Images/about/Elegant Indian Saree Portrait.png';
import ctaBgImg from '../../assets/Images/about/Emerald Elegance with Ornate Gold Bangles.png';

// Instagram Gallery Images (3 authentic About assets reused across 6 cards)
import galleryImg1 from '../../assets/Images/about/Intertwined Gold Floral Rings.png';
import galleryImg2 from '../../assets/Images/about/Royal Indian Gold Jewelry Set.png';
import galleryImg3 from '../../assets/Images/about/Traditional Gold Jhumka Earrings.png';

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



export default function About() {
  const [heritageRef, heritageVisible] = useInView(0.15);
  const [timelineRef, timelineVisible] = useInView(0.2);
  const [missionRef, missionVisible] = useInView(0.2);
  const [founderRef, founderVisible] = useInView(0.2);
  const [valuesRef, valuesVisible] = useInView(0.15);
  const [ctaRef, ctaVisible] = useInView(0.15);
  const [instaRef, instaVisible] = useInView(0.15);

  const instagramGallery = [
    { src: galleryImg1, alt: 'Intertwined Gold Floral Rings' },
    { src: galleryImg2, alt: 'Royal Indian Gold Jewelry Set' },
    { src: galleryImg3, alt: 'Traditional Gold Jhumka Earrings' },
    { src: galleryImg1, alt: 'Handcrafted Floral Rings' },
    { src: galleryImg2, alt: 'Royal Indian Heritage Jewellery' },
    { src: galleryImg3, alt: 'Traditional Antique Jhumkas' },
  ];



  return (
    <main className="about-page">
      
      {/* ── HERO ── */}
      <section className="about-hero">
        {/* Full-width background: home_herobanner.png spans across the entire hero */}
        <div className="about-hero-bg">
          <div className="about-hero-img" style={{ backgroundImage: `url(${heroModelImg})` }}></div>
          <div className="about-hero-overlay"></div>
        </div>

        {/* Left: cream text panel */}
        <div className="about-hero-content">
          <p className="about-eyebrow animate-fade-up delay-1">OUR JOURNEY</p>
          <h1 className="about-hero-title">
            <span className="line animate-reveal-line delay-2">Timeless Jewellery,</span>
            <span className="line animate-reveal-line delay-3">
              Crafted <span className="about-hero-accent">with Heart</span>
            </span>
          </h1>
          <p className="about-hero-desc animate-fade-up delay-4">
            At Anugraha Fashions, we believe jewellery is more than an adornment &mdash; it&apos;s a celebration of you, your story and the moments that matter.
          </p>
          <a href="#about-story" className="about-hero-cta animate-fade-up delay-5">
            OUR STORY <span className="cta-arrow" aria-hidden="true">→</span>
          </a>
          <p className="about-hero-tagline animate-fade-up delay-5">
            <span className="tagline-rule" aria-hidden="true"></span>
            TRADITION MEETS TOMORROW
          </p>
        </div>

        {/* Far-right editorial aside — sits directly on the dark temple background */}
        <div className="about-hero-aside animate-fade-up delay-4">
          <span className="about-hero-aside-rule" aria-hidden="true"></span>
          <p className="about-hero-aside-text">
            MORE<br/>THAN<br/>JEWELLERY
          </p>
          <p className="about-hero-aside-sub">
            A LEGACY<br/>OF EMOTIONS
          </p>
        </div>
      </section>

      {/* ── SECTION 2: WHO WE ARE ── */}
      <section className="about-heritage-section" ref={heritageRef}>
        <div className={`container about-heritage-grid ${heritageVisible ? 'is-visible' : ''}`}>
          {/* Left: landscape jewellery image from exact reference design */}
          <div className="about-heritage-image-wrapper">
            <img
              src={whoWeAreImg}
              alt="Anugraha Fashions traditional handcrafted jewellery - Beauty Rooted in Tradition"
              className="about-heritage-landscape-img"
            />
          </div>

          {/* Right: copy & CTA */}
          <div className="about-heritage-content-wrapper">
            <p className="about-eyebrow about-eyebrow--gold">WHO WE ARE</p>
            <h2 className="about-heritage-title">
              A Heritage of Beauty,<br />A Promise for Tomorrow
            </h2>
            <p className="about-heritage-desc">
              Anugraha Fashions is a premium jewellery brand rooted in India&apos;s rich heritage, bringing you exquisitely crafted, hallmarked jewellery that blends timeless tradition with contemporary elegance. From everyday essentials to bridal heirlooms, our collections are designed to be part of your most precious moments.
            </p>
            <a href="#collections" className="about-heritage-cta">
              EXPLORE OUR COLLECTIONS <span className="cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: OUR STORY + MISSION & VISION ── */}
      <section className="about-story-section" id="about-story" ref={timelineRef}>
        <div className="container">
          {/* Centered Story Header & Narrative */}
          <div className={`about-story-editorial ${timelineVisible ? 'is-visible' : ''}`}>
            <p className="about-eyebrow about-eyebrow--gold about-story-eyebrow">OUR STORY</p>
            <h2 className="about-story-title">From Generations to You</h2>
            <div className="about-story-ornament" aria-hidden="true">
              <span className="story-ornament-line"></span>
              <span className="story-ornament-motif">❖</span>
              <span className="story-ornament-line"></span>
            </div>
            <p className="about-story-narrative">
              What began as a small dream to make beautiful, high-quality jewellery accessible to every woman has grown into Anugraha Fashions &ndash; a trusted brand loved by thousands. Inspired by our cultural roots and driven by a passion for craftsmanship, we continue to create jewellery that celebrates life&apos;s every chapter.
            </p>
          </div>
        </div>

        {/* Mission & Vision Dual Banner — FULL BLEED EDGE-TO-EDGE */}
        <div className={`about-mission-banner ${timelineVisible ? 'is-visible' : ''}`} ref={missionRef}>
          {/* Subtle Corner Mandala Watermarks */}
          <div className="mission-corner-mandala mission-corner-left" aria-hidden="true">
            <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0C40 20 60 60 80 80C100 100 140 120 160 160" stroke="#d4af37" strokeWidth="1" strokeDasharray="3 3"/>
              <path d="M0 40C30 50 50 80 80 110C110 140 140 150 160 160" stroke="#d4af37" strokeWidth="0.8"/>
              <circle cx="80" cy="80" r="30" stroke="#d4af37" strokeWidth="0.7"/>
              <circle cx="80" cy="80" r="15" stroke="#d4af37" strokeWidth="0.7"/>
              <path d="M20 0C50 30 70 70 80 120" stroke="#d4af37" strokeWidth="0.6"/>
              <path d="M0 20C30 50 70 70 120 80" stroke="#d4af37" strokeWidth="0.6"/>
            </svg>
          </div>
          <div className="mission-corner-mandala mission-corner-right" aria-hidden="true">
            <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M160 0C120 20 100 60 80 80C60 100 20 120 0 160" stroke="#d4af37" strokeWidth="1" strokeDasharray="3 3"/>
              <path d="M160 40C130 50 110 80 80 110C50 140 20 150 0 160" stroke="#d4af37" strokeWidth="0.8"/>
              <circle cx="80" cy="80" r="30" stroke="#d4af37" strokeWidth="0.7"/>
              <circle cx="80" cy="80" r="15" stroke="#d4af37" strokeWidth="0.7"/>
              <path d="M140 0C110 30 90 70 80 120" stroke="#d4af37" strokeWidth="0.6"/>
              <path d="M160 20C130 50 90 70 40 80" stroke="#d4af37" strokeWidth="0.6"/>
            </svg>
          </div>

          <div className="container about-mission-container">
            {/* Left Card: OUR MISSION */}
            <div className="mission-banner-card">
              <div className="mission-banner-icon-wrap">
                <svg className="mission-banner-icon" viewBox="0 0 48 48" fill="none" stroke="#d4af37" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="21" cy="27" r="15" />
                  <circle cx="21" cy="27" r="9" />
                  <circle cx="21" cy="27" r="3.5" fill="#d4af37" />
                  <path d="M39 9L25 23" />
                  <path d="M33 9H39V15" />
                </svg>
              </div>
              <div className="mission-banner-content">
                <h3 className="mission-banner-title">OUR MISSION</h3>
                <p className="mission-banner-desc">
                  To make authentic, high-quality jewellery a part of every woman&apos;s journey, while preserving our rich heritage and supporting traditional craftsmanship.
                </p>
              </div>
            </div>

            <div className="mission-banner-divider" aria-hidden="true"></div>

            {/* Right Card: OUR VISION */}
            <div className="mission-banner-card">
              <div className="mission-banner-icon-wrap">
                <svg className="mission-banner-icon" viewBox="0 0 48 48" fill="none" stroke="#d4af37" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 17L18 7H30L40 17L24 41L8 17Z" />
                  <line x1="8" y1="17" x2="40" y2="17" />
                  <line x1="18" y1="7" x2="24" y2="41" />
                  <line x1="30" y1="7" x2="24" y2="41" />
                  <line x1="18" y1="17" x2="24" y2="7" />
                  <line x1="30" y1="17" x2="24" y2="7" />
                </svg>
              </div>
              <div className="mission-banner-content">
                <h3 className="mission-banner-title">OUR VISION</h3>
                <p className="mission-banner-desc">
                  To be India&apos;s most loved jewellery brand, known for timeless designs, uncompromising quality and a legacy that inspires generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER SECTION ── */}
      <section className="about-founder-section" ref={founderRef}>
        <div className="container">
          <div className={`founder-grid ${founderVisible ? 'is-visible' : ''}`}>

            {/* LEFT: Portrait */}
            <div className="founder-image-col">
              <div className="founder-image-wrap">
                <img
                  src={founderImg}
                  alt="Priya S. — Founder, Anugraha Fashions"
                />
              </div>
            </div>

            {/* CENTER: Story & Quote */}
            <div className="founder-content-col">
              <p className="founder-eyebrow">ABOUT OUR FOUNDER</p>
              <h2>A Dream Woven in Gold</h2>
              <div className="founder-title-ornament" aria-hidden="true">
                <span className="ornament-line"></span>
                <span className="ornament-diamond">✦</span>
                <span className="ornament-line"></span>
              </div>
              <p className="founder-lead">
                Anugraha Fashions was founded by <strong>Priya S.</strong>, a passionate entrepreneur
                with a deep love for Indian artistry and a vision to make traditional jewellery
                meaningful for the modern woman. Her journey is rooted in the belief that
                every woman deserves to feel special &mdash; every day.
              </p>
              <div className="founder-quote-box">
                <span className="quote-icon" aria-hidden="true">&ldquo;</span>
                <div className="quote-content">
                  <p className="quote-text">
                    &ldquo;Jewellery is not just an accessory, it&apos;s a feeling &mdash;
                    a connection to who you are, where you come from, and the
                    moments you cherish.&rdquo;
                  </p>
                  <div className="quote-author">
                    <span className="author-name">&ndash; Priya S.</span>
                    <span className="author-title">FOUNDER, ANUGRAHA FASHIONS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Stats column */}
            <div className="founder-stats-col">
              {/* Stat 1: Heart */}
              <div className="founder-stat-item">
                <div className="founder-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="30" height="30">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <span className="founder-stat-number">10,000+</span>
                <span className="founder-stat-label">Happy Customers</span>
              </div>
              {/* Stat 2: Community */}
              <div className="founder-stat-item">
                <div className="founder-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span className="founder-stat-text-label">A Growing<br />Community</span>
              </div>
              {/* Stat 3: Heritage */}
              <div className="founder-stat-item">
                <div className="founder-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                    <path d="M12 21c0-4.5 3-7.5 6-8-1 4-3.5 6.5-6 8z" />
                    <path d="M12 21c0-4.5-3-7.5-6-8 1 4 3.5 6.5 6 8z" />
                    <path d="M12 21c-2-5-1.5-11 0-15 1.5 4 2 10 0 15z" />
                    <path d="M12 21c3-2 8-3.5 10-1-2-3.5-5.5-5.5-10-5" />
                    <path d="M12 21c-3-2-8-3.5-10-1 2-3.5 5.5-5.5 10-5" />
                  </svg>
                </div>
                <span className="founder-stat-text-label">Carrying Forward<br />Our Heritage</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── VALUES (INTERACTIVE CARDS) ── */}
      <section className="about-values-section" ref={valuesRef}>
        <div className="container">
          {/* Header */}
          <div className="values-header">
            <h3 className="values-title">OUR VALUES</h3>
            <div className="values-title-ornament" aria-hidden="true">
              <span className="ornament-line"></span>
              <span className="ornament-diamond">✦</span>
              <span className="ornament-line"></span>
            </div>
          </div>
          {/* Cards */}
          <div className={`values-grid ${valuesVisible ? 'is-visible' : ''}`}>

            {/* 1 — Authenticity */}
            <div className="value-interactive-card">
              <div className="value-card-inner">
                <div className="value-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
                <h4>AUTHENTICITY</h4>
                <p>100% hallmarked jewellery with complete transparency.</p>
              </div>
            </div>

            {/* 2 — Craftsmanship */}
            <div className="value-interactive-card">
              <div className="value-card-inner">
                <div className="value-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                    <circle cx="6" cy="6" r="3"/>
                    <circle cx="6" cy="18" r="3"/>
                    <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                    <line x1="14.47" y1="14.48" x2="20" y2="20"/>
                    <line x1="8.12" y1="8.12" x2="12" y2="12"/>
                  </svg>
                </div>
                <h4>CRAFTSMANSHIP</h4>
                <p>Finely crafted designs by skilled artisans.</p>
              </div>
            </div>

            {/* 3 — Customer Delight */}
            <div className="value-interactive-card">
              <div className="value-card-inner">
                <div className="value-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h4>CUSTOMER DELIGHT</h4>
                <p>Your happiness is at the heart of everything we do.</p>
              </div>
            </div>

            {/* 4 — Tradition With Innovation */}
            <div className="value-interactive-card">
              <div className="value-card-inner">
                <div className="value-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                    <path d="M12 21c0-4.5 3-7.5 6-8-1 4-3.5 6.5-6 8z"/>
                    <path d="M12 21c0-4.5-3-7.5-6-8 1 4 3.5 6.5 6 8z"/>
                    <path d="M12 21c-2-5-1.5-11 0-15 1.5 4 2 10 0 15z"/>
                    <path d="M12 21c3-2 8-3.5 10-1-2-3.5-5.5-5.5-10-5"/>
                    <path d="M12 21c-3-2-8-3.5-10-1 2-3.5 5.5-5.5 10-5"/>
                  </svg>
                </div>
                <h4>TRADITION WITH INNOVATION</h4>
                <p>Honouring our roots while embracing modern elegance.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION ONE: EMERALD GREEN CTA BANNER ── */}
      <section className="about-cta-section" ref={ctaRef}>
        <div 
          className={`about-cta-cinematic ${ctaVisible ? 'is-visible' : ''}`}
          style={{ backgroundImage: `url(${ctaBgImg})` }}
        >
          <div className="cta-cinematic-content">
            {/* 1. Left text block */}
            <div className="cta-copy">
              <h2 className="cta-title">
                DISCOVER JEWELLERY<br />THAT TELLS YOUR STORY
              </h2>
              <p className="cta-desc">
                Explore our exclusive collections, from everyday elegance to once-in-a-lifetime celebrations.
              </p>
            </div>

            {/* 2. Center button */}
            <div className="cta-action">
              <a href="/collections" className="cta-btn-explore">
                EXPLORE COLLECTIONS &nbsp;&rarr;
              </a>
            </div>

            {/* 3. Right slogan */}
            <div className="cta-aside">
              <p className="cta-aside-text">
                <span>EVERY</span> <span className="cta-br-break"><br /></span>
                <span>PIECE A</span> <span className="cta-br-break"><br /></span>
                <span>NEW STORY</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION TWO: COMPACT INSTAGRAM GALLERY STRIP ── */}
      <section className="about-instagram-strip-section" ref={instaRef}>
        <div className={`about-instagram-strip ${instaVisible ? 'is-visible' : ''}`}>
          {/* 1. Left content block */}
          <div className="insta-strip-brand">
            <p className="insta-strip-label">FOLLOW OUR JOURNEY</p>
            <a
              href="https://www.instagram.com/anugrahafashions"
              target="_blank"
              rel="noopener noreferrer"
              className="insta-strip-handle"
            >
              @anugrahafashions
            </a>
          </div>

          {/* 2. Six small square image cards in single horizontal sequence */}
          <div className="insta-strip-thumbnails">
            {instagramGallery.map((item, idx) => (
              <a
                key={idx}
                href="https://www.instagram.com/anugrahafashions"
                target="_blank"
                rel="noopener noreferrer"
                className="insta-thumb-card"
                title={item.alt}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <div className="insta-thumb-overlay" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* 3. Right-side compact outlined button */}
          <div className="insta-strip-action">
            <a
              href="https://www.instagram.com/anugrahafashions"
              target="_blank"
              rel="noopener noreferrer"
              className="insta-strip-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>VIEW MORE ON INSTAGRAM</span>
              <span className="btn-arrow">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
