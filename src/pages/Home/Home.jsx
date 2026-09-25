import React from 'react';
import {
  Truck, ShieldCheck, RefreshCw, Search, User, Heart, ShoppingBag,
  ChevronRight, ChevronLeft, Star, Phone, Mail, CheckCircle, MapPin
} from 'lucide-react';

import necklaceImg from '../../assets/Images/home/Category/necklace.png';
import earringImg from '../../assets/Images/home/Category/earings.png';
import bangleImg from '../../assets/Images/home/Category/bangles.png';
import ringImg from '../../assets/Images/home/Category/rings.png';
import necklaceAvif from '../../assets/Images/home/Category/pendant.png';
import bridalImg from '../../assets/Images/home/Category/bridal.png';
import bridalPromoImg from '../../assets/Images/home/bridal.png';
import newArrivalPromoImg from '../../assets/Images/home/newarrival.png';
import festivePromoImg from '../../assets/Images/home/festiveoffers.png';
import giftsPromoImg from '../../assets/Images/home/gifts.png';
import hallmarkPromoImg from '../../assets/Images/home/halmark.png';
import necklaceBannerImg from '../../assets/Images/home/necklace_banner.png';
import footerNecklaceImg from '../../assets/Images/footer/necklace.png';
import footerEaringsImg from '../../assets/Images/footer/earings.png';
import footerBanglesImg from '../../assets/Images/footer/bangles.png';
import footerRingsImg from '../../assets/Images/footer/rings.png';
import footerPendantImg from '../../assets/Images/footer/pendant.png';
import footerBridalImg from '../../assets/Images/footer/bridal.png';
import heroBannerImg from '../../assets/Images/home/home_herobanner.png';
import heroBannerImg1 from '../../assets/Images/home/hero_banner1.png';
import heroBannerImg2 from '../../assets/Images/home/hero_banner2.png';

import './Home.css';

const slides = [
  {
    img: heroBannerImg,
    subtitle: 'TIMELESS BEAUTY.',
    title1: 'Elegance Crafted',
    midText: 'for ',
    title2: 'Every You',
    desc: 'Discover our exclusive collection of hallmarked jewellery that celebrates tradition and style.'
  },
  {
    img: heroBannerImg1,
    subtitle: 'EXQUISITE CRAFTSMANSHIP.',
    title1: 'A Legacy of',
    midText: '',
    title2: 'Purity',
    desc: 'Experience the finest artistry and intricate designs crafted for your perfect moments.'
  },
  {
    img: heroBannerImg2,
    subtitle: 'BRIDAL COLLECTION.',
    title1: 'Make Your Special Day',
    midText: '',
    title2: 'Shine',
    desc: 'Stunning bridal sets designed to make you the center of attention on your wedding day.'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
  <section className="home-hero">
    {slides.map((slide, index) => (
      <div key={index} className="home-hero-slide" style={{
        backgroundImage: `url(${slide.img})`,
        opacity: currentSlide === index ? 1 : 0,
        transform: currentSlide === index ? 'scale(1.05)' : 'scale(1)',
        zIndex: currentSlide === index ? 0 : -1
      }} />
    ))}
    
    <div className="home-hero-overlay"></div>
    {/* Subtle gold shimmer over the model area (approx right side) */}
    <div className="hero-glow-overlay"></div>

    <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
      {/* key={currentSlide} forces React to remount this div when slide changes, restarting CSS animations */}
      <div className="home-hero-content" key={currentSlide}>
        <p className="home-hero-subtitle">{slides[currentSlide].subtitle}</p>
        <h1 className="home-hero-title">
          <span className="home-hero-title-line">{slides[currentSlide].title1}</span><br />
          <span className="home-hero-title-line">
            {slides[currentSlide].midText}<span className="home-hero-title-accent">{slides[currentSlide].title2}</span>
          </span>
        </h1>
        <p className="home-hero-desc">
          {slides[currentSlide].desc}
        </p>
        <button className="home-hero-btn">
          EXPLORE COLLECTION <ChevronRight size={16} />
        </button>
      </div>
    </div>

    {/* Slider Controls */}
    <div onClick={prevSlide} className="home-hero-arrow home-hero-arrow--prev">
      <ChevronLeft size={24} />
    </div>
    <div onClick={nextSlide} className="home-hero-arrow home-hero-arrow--next">
      <ChevronRight size={24} />
    </div>

    <div className="home-hero-dots">
      {slides.map((_, idx) => (
        <div key={idx} onClick={() => setCurrentSlide(idx)} style={{ cursor: 'pointer', width: currentSlide === idx ? '20px' : '8px', height: currentSlide === idx ? '4px' : '8px', backgroundColor: currentSlide === idx ? 'var(--dark-bg)' : 'white', borderRadius: currentSlide === idx ? '2px' : '50%', opacity: currentSlide === idx ? 1 : 0.7, marginTop: currentSlide === idx ? '0' : '-2px', transition: 'all 0.3s ease' }}></div>
      ))}
    </div>
  </section>
  );
};

const FeaturesBanner = () => {
  const features = [
    { icon: <ShieldCheck size={28} strokeWidth={1.5} />, title: 'CERTIFIED JEWELLERY', sub: '100% Hallmarked' },
    { icon: <Truck size={28} strokeWidth={1.5} />, title: 'FREE SHIPPING', sub: 'On Orders Above ₹999' },
    { icon: <CheckCircle size={28} strokeWidth={1.5} />, title: 'SECURE PAYMENTS', sub: '100% Safe & Secure' },
    { icon: <RefreshCw size={28} strokeWidth={1.5} />, title: 'EASY RETURNS', sub: '7 Days Easy Return' },
    { icon: <Phone size={28} strokeWidth={1.5} />, title: 'CUSTOMER SUPPORT', sub: '+91 98765 43210' },
  ];

  return (
    <div className="container features-banner-wrapper">
      <div className="features-banner">
        {features.map((f, i) => (
          <div key={i} className="features-banner-item">
            <div style={{ color: 'var(--primary-gold)' }}>{f.icon}</div>
            <div>
              <h4 className="features-banner-title">{f.title}</h4>
              <p className="features-banner-sub">{f.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SectionHeading = ({ title }) => (
  <div style={{ textAlign: 'center', margin: '3.5rem 0 2rem 0' }}>
    <h2 className="section-heading-title" style={{ fontSize: '1.8rem', letterSpacing: '2px', color: 'var(--text-dark)' }}>{title}</h2>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
      <div style={{ height: '1px', width: '40px', backgroundColor: 'var(--primary-gold)' }}></div>
      <div style={{ width: '6px', height: '6px', transform: 'rotate(45deg)', backgroundColor: 'var(--primary-gold)' }}></div>
      <div style={{ height: '1px', width: '40px', backgroundColor: 'var(--primary-gold)' }}></div>
    </div>
  </div>
);

const CategoryCard = ({ name, img, bg, textDark, index }) => {
  const uid = name.replace(/\s+/g, '-');
  const clipId = `arch-clip-${uid}`;
  const glowId = `arch-glow-${uid}`;
  const shadowId = `arch-shadow-${uid}`;

  return (
    <div
      className="category-card-wrapper"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Card frame – aspect ratio controls height */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '135%' }}>
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}
          viewBox="0 0 100 135"
          preserveAspectRatio="none"
        >
          <defs>
            {/* ── Mughal pointed arch clip ── */}
            <clipPath id={clipId}>
              <path d="M 50 1 C 63 14, 96 20, 96 44 L 96 126 Q 96 133 89 133 L 11 133 Q 4 133 4 126 L 4 44 C 4 20, 37 14, 50 1 Z" />
            </clipPath>

            {/* ── Velvet Texture Filter ── */}
            <filter id={`velvet-${uid}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.3 0" />
            </filter>

            {/* ── Vignette radial gradient (Center light, Dark edges) ── */}
            <radialGradient id={glowId} cx="50%" cy="45%" r="80%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.15} />
              <stop offset="35%" stopColor={bg} stopOpacity={0.0} />
              <stop offset="100%" stopColor="#000000" stopOpacity={0.65} />
            </radialGradient>

            {/* ── Gold glow filter for border ── */}
            <filter id={shadowId} x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
              <feFlood floodColor="#e2b96f" floodOpacity="0.6" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ── Clipped fills ── */}
          <g clipPath={`url(#${clipId})`}>
            {/* Jewel-tone arch area */}
            <rect x="0" y="0" width="100" height="100" fill={bg} />
            {/* Velvet Noise Texture */}
            <rect x="0" y="0" width="100" height="100" filter={`url(#velvet-${uid})`} />
            {/* Vignette / Sheen layer */}
            <rect x="0" y="0" width="100" height="100" fill={`url(#${glowId})`} />
            {/* Cream-white label area */}
            <rect x="0" y="100" width="100" height="33" fill="#faf8f4" />
            {/* Thin gold separator line */}
            <line x1="12" y1="100" x2="88" y2="100" stroke="#c9a84c" strokeWidth="0.35" opacity="0.7" />
          </g>

          {/* ── Outer gold border (with glow filter) ── */}
          <path
            className="category-border"
            d="M 50 1 C 63 14, 96 20, 96 44 L 96 126 Q 96 133 89 133 L 11 133 Q 4 133 4 126 L 4 44 C 4 20, 37 14, 50 1 Z"
            fill="none"
            stroke="#c9a84c"
            strokeWidth="1"
            opacity="1"
            filter={`url(#${shadowId})`}
          />

          {/* ── Inner border (inset) ── */}
          <path
            d="M 50 5 C 62 17, 92 22, 92 45 L 92 124 Q 92 129 87 129 L 13 129 Q 8 129 8 124 L 8 45 C 8 22, 38 17, 50 5 Z"
            fill="none"
            stroke="#e2c97e"
            strokeWidth="0.3"
            opacity="0.55"
          />

          {/* ── Apex ornament: diamond + flanking lines ── */}
          <polygon points="50,0 52,3.5 50,7 48,3.5" fill="#c9a84c" opacity="0.9" />
          <line x1="42" y1="3" x2="47" y2="3" stroke="#c9a84c" strokeWidth="0.3" opacity="0.6" />
          <line x1="53" y1="3" x2="58" y2="3" stroke="#c9a84c" strokeWidth="0.3" opacity="0.6" />

          {/* ── Decorative inner arch echo (top inside border) ── */}
          <path
            d="M 50 10 C 62 20, 88 25, 88 45"
            fill="none" stroke="#c9a84c" strokeWidth="0.25" opacity="0.35"
          />
          <path
            d="M 50 10 C 38 20, 12 25, 12 45"
            fill="none" stroke="#c9a84c" strokeWidth="0.25" opacity="0.35"
          />

          {/* ── Bottom corner round accents ── */}
          <circle cx="4" cy="128" r="1.2" fill="#c9a84c" opacity="0.75" />
          <circle cx="96" cy="128" r="1.2" fill="#c9a84c" opacity="0.75" />
        </svg>

        {/* ── Jewelry image ── */}
        <div style={{
          position: 'absolute',
          top: '9%',
          left: '10%',
          width: '90%',
          height: '70%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2
        }}>
          <img
            className="category-img-animate"
            src={img}
            alt={name}
            style={{
              width: '78%',
              height: '100%',
              objectFit: 'contain',
              mixBlendMode: textDark ? 'multiply' : 'luminosity',
              filter: textDark
                ? 'none'
                : 'brightness(1.15) contrast(1.08) drop-shadow(0 2px 8px rgba(0,0,0,0.25))'
            }}
          />
        </div>

        {/* ── Text label ── */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          height: '25%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3,
          paddingBottom: '3%'
        }}>
          <h3 style={{
            fontSize: '0.65rem',
            fontWeight: '700',
            marginBottom: '0.25rem',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '1.5px',
            color: '#1a1208',
            textAlign: 'center'
          }}>{name}</h3>
          <p className="shop-now-text" style={{
            fontSize: '0.52rem',
            color: '#b8913a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.1rem',
            fontWeight: '700',
            letterSpacing: '0.8px'
          }}>
            SHOP NOW <ChevronRight size={8} strokeWidth={3} />
          </p>
        </div>
      </div>
    </div>
  );
};

const ShopByCategory = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 } // Trigger when 15% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const categories = [
    { name: 'NECKLACES', img: necklaceImg, bg: '#01411C', textDark: false }, // Dark Green
    { name: 'EARRINGS', img: earringImg, bg: '#000080', textDark: false }, // Blue
    { name: 'BANGLES', img: bangleImg, bg: '#eec0c8', textDark: true }, // Pink
    { name: 'RINGS', img: ringImg, bg: '#8B0000', textDark: false }, // Brown
    { name: 'PENDANTS', img: necklaceAvif, bg: '#800080', textDark: false }, // 5th Blue/Purple
    { name: 'BRIDAL SETS', img: bridalImg, bg: '#AA0000', textDark: false }, // Maroon
  ];

  return (
    <section className="container" ref={sectionRef}>
      <SectionHeading title="SHOP BY CATEGORY" />
      <div className={`category-grid ${isVisible ? 'animate-in' : ''}`}>
        {categories.map((cat, i) => <CategoryCard key={i} index={i} {...cat} />)}
      </div>
    </section>
  );
};

const PromoBanners = () => (
  <section className="container promo-section">

    {/* ── Top Row: 2 banners ── */}
    <div className="promo-top-row">

      {/* BRIDAL COLLECTION */}
      <div className="promo-card promo-card--bridal" style={{ backgroundImage: `url(${bridalPromoImg})` }}>
        {/* Left text block */}
        <div style={{ padding: '2.2rem 2rem', zIndex: 2, flex: '0 0 auto', maxWidth: '52%' }}>
          <h2 style={{
            color: '#f0d080',
            fontSize: '1.6rem',
            fontWeight: '700',
            lineHeight: '1.15',
            marginBottom: '0.75rem',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '1px'
          }}>
            BRIDAL<br />COLLECTION
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.78rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
            Designed for your<br />most precious moments.
          </p>
          <button style={{
            color: '#f0d080',
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            padding: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}>
            EXPLORE NOW <ChevronRight size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* NEW ARRIVALS */}
      <div className="promo-card promo-card--new-arrivals" style={{ backgroundImage: `url(${newArrivalPromoImg})` }}>
        {/* Text */}
        <div style={{ padding: '2.2rem 2rem', zIndex: 2, maxWidth: '55%' }}>
          <h2 style={{
            color: '#1a1208',
            fontSize: '1.5rem',
            fontWeight: '700',
            lineHeight: '1.15',
            marginBottom: '0.7rem',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '0.5px'
          }}>
            NEW<br />ARRIVALS
          </h2>
          <p style={{ color: '#7a6a50', fontSize: '0.78rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
            Be the first to own<br />our latest designs.
          </p>
          <button style={{
            color: '#8b6914',
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            padding: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}>
            SHOP NOW <ChevronRight size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>

    {/* ── Bottom Row: 3 banners ── */}
    <div className="promo-bottom-row">

      {/* FESTIVE OFFERS */}
      <div className="promo-card promo-card--small promo-card--festive" style={{ backgroundImage: `url(${festivePromoImg})` }}>
        <div style={{ zIndex: 1 }}>
          <p style={{ color: '#8b3a3a', fontSize: '0.6rem', fontWeight: '700', letterSpacing: '2px', marginBottom: '0.4rem' }}>LIMITED TIME</p>
          <h3 style={{
            color: '#3d1a1a',
            fontSize: '1.2rem',
            fontWeight: '700',
            lineHeight: '1.2',
            marginBottom: '0.6rem',
            fontFamily: 'var(--font-serif)'
          }}>
            FESTIVE<br />OFFERS
          </h3>
          <p style={{ color: '#7a6050', fontSize: '0.72rem', lineHeight: '1.5', marginBottom: '0.9rem' }}>
            Shine brighter this<br />season with our offers.
          </p>
          <button style={{
            color: '#8b3a3a',
            fontSize: '0.68rem',
            fontWeight: '700',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}>
            EXPLORE NOW <ChevronRight size={12} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* GIFT OF TIMELESS LOVE */}
      <div className="promo-card promo-card--small promo-card--gifts" style={{ backgroundImage: `url(${giftsPromoImg})` }}>
        <div style={{ zIndex: 1, maxWidth: '58%' }}>
          <h3 style={{
            color: '#2c1a0e',
            fontSize: '1.2rem',
            fontWeight: '700',
            lineHeight: '1.2',
            marginBottom: '0.6rem',
            fontFamily: 'var(--font-serif)'
          }}>
            GIFT OF<br />TIMELESS LOVE
          </h3>
          <p style={{ color: '#6b4e38', fontSize: '0.72rem', lineHeight: '1.5', marginBottom: '0.9rem' }}>
            Perfect jewellery for your<br />special ones.
          </p>
          <button style={{
            color: '#2c1a0e',
            fontSize: '0.68rem',
            fontWeight: '700',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}>
            SHOP GIFT SETS <ChevronRight size={12} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* 100% HALLMARKED AUTHENTICITY */}
      <div className="promo-card promo-card--small promo-card--hallmark" style={{ backgroundImage: `url(${hallmarkPromoImg})` }}>
        <div style={{ zIndex: 1, maxWidth: '58%' }}>
          <h3 style={{
            color: '#ffffff',
            fontSize: '1.1rem',
            fontWeight: '700',
            lineHeight: '1.25',
            marginBottom: '0.6rem',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '0.3px'
          }}>
            100% HALLMARKED<br />AUTHENTICITY
          </h3>
          <p style={{ color: '#b0a090', fontSize: '0.72rem', lineHeight: '1.5', marginBottom: '0.9rem' }}>
            Quality you can trust,<br />beauty you can cherish.
          </p>
          <button style={{
            color: '#c9a84c',
            fontSize: '0.68rem',
            fontWeight: '700',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}>
            LEARN MORE <ChevronRight size={12} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  </section>
);


const ProductCard = ({ img, title, weight, price, index }) => (
  <div className="product-card" style={{ animationDelay: `${index * 0.15}s` }}>
    <div className="product-card-img-container">
      <span className="product-badge">NEW</span>
      <img src={img} alt={title} className="product-img" />
      <button className="product-wishlist-btn">
        <Heart size={18} strokeWidth={2.5} />
      </button>
    </div>
    <div className="product-card-info">
      <h4 className="product-title">{title}</h4>
      <p className="product-price">₹{price}</p>
    </div>
    <button className="product-add-cart-btn">
      ADD TO CART
    </button>
  </div>
);

const NewArrivals = () => {
  const scrollRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const products = [
    { title: 'Floral Gold Pendant', price: '4320', img: '/gold_necklace.jpg' },
    { title: 'Heritage Jhumka Earrings', price: '7140', img: '/gold_necklace.jpg' },
    { title: 'Traditional Gold Bangles', price: '2500', img: '/gold_bangles.jpg' },
    { title: 'Classic Gold Ring', price: '2780', img: '/gold_bangles.jpg' },
    { title: 'Pearl Drop Pendant', price: '3250', img: '/gold_necklace.jpg' },
    { title: 'Royal Necklace Set', price: '3600', img: '/gold_necklace.jpg' },
  ];

  return (
    <section className="new-arrivals-section" ref={sectionRef}>
      <div className="container" style={{ position: 'relative' }}>
        <SectionHeading title="NEW ARRIVALS" />

        <div
          ref={scrollRef}
          className={`new-arrivals-scroll ${isVisible ? 'animate-in' : ''}`}
        >
          {products.map((p, i) => (
            <div key={i} className="new-arrivals-item">
              <ProductCard index={i} {...p} />
            </div>
          ))}
        </div>

        <div
          onClick={() => scroll('left')}
          className="new-arrivals-arrow new-arrivals-arrow--left">
          <ChevronLeft size={20} />
        </div>
        <div
          onClick={() => scroll('right')}
          className="new-arrivals-arrow new-arrivals-arrow--right">
          <ChevronRight size={20} />
        </div>
      </div>
    </section>
  );
};

const TrustBanner = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }} ref={sectionRef}>
      
      {/* ── Section Introduction ── */}
      <div className={`trust-intro ${isVisible ? 'trust-visible' : ''}`}>
        <h3 className="trust-intro-title">THE ANUGRAHA PROMISE</h3>
        <p className="trust-intro-sub">Crafted with purity. Designed to last.</p>
        <div className="trust-intro-divider">
          <div className="trust-line-left"></div>
          <div className="trust-diamond">◆</div>
          <div className="trust-line-right"></div>
        </div>
      </div>

      <div className={`trust-banner ${isVisible ? 'trust-visible' : ''}`}>
        {/* ── Left Features ── */}
        <div className="trust-banner-features">
          <div className="trust-feature-item trust-anim-f1">
            <div className="trust-feature-icon"><Star size={24} strokeWidth={1.5} /></div>
            <div className="trust-feature-text">
              <h4>PREMIUM QUALITY</h4>
              <p>Finest craftsmanship<br />for a lifetime.</p>
            </div>
          </div>
          <div className="trust-feature-item trust-anim-f3">
            <div className="trust-feature-icon"><RefreshCw size={24} strokeWidth={1.5} /></div>
            <div className="trust-feature-text">
              <h4>EASY EXCHANGE</h4>
              <p>Hassle-free exchange<br />within 7 days.</p>
            </div>
          </div>
        </div>

        {/* ── Center: necklace image + dark text panel ── */}
        <div className="trust-banner-center">
          <div className="trust-banner-center-img">
            <img
              className="trust-necklace-img"
              src={necklaceBannerImg}
              alt="Anugraha Necklace"
            />
            {/* Dark sliding overlay reveal */}
            <div className="trust-overlay-reveal"></div>
          </div>

          <div className="trust-banner-center-text">
            <h2>WHY CHOOSE<br />ANUGRAHA FASHIONS?</h2>
            <p>Timeless designs, trusted quality<br />and a legacy of purity.</p>
            <div className="trust-ornament">❦ ❦ ❦</div>
          </div>
        </div>

        {/* ── Right Features ── */}
        <div className="trust-banner-features">
          <div className="trust-feature-item trust-anim-f2">
            <div className="trust-feature-icon"><ShieldCheck size={24} strokeWidth={1.5} /></div>
            <div className="trust-feature-text">
              <h4>SECURE PACKAGING</h4>
              <p>Delivered with care<br />and protection.</p>
            </div>
          </div>
          <div className="trust-feature-item trust-anim-f4">
            <div className="trust-feature-icon"><User size={24} strokeWidth={1.5} /></div>
            <div className="trust-feature-text">
              <h4>TRUSTED BY THOUSANDS</h4>
              <p>10,000+ happy<br />customers.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const SocialAndTestimonial = () => {
  const [parallaxY, setParallaxY] = React.useState(0);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            // Check if section is in viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              // Calculate offset (image moves slower than the page scroll)
              const offset = (window.innerHeight - rect.top) * 0.15;
              setParallaxY(offset);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="container" style={{ marginBottom: '2rem' }} ref={sectionRef}>
      <div className="social-testimonial">

        {/* ── Left: Follow Our Journey (Instagram) ── */}
        <div className="social-left">
          <h3 style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.2rem', letterSpacing: '1.5px', color: '#2c1a0e' }}>FOLLOW OUR JOURNEY</h3>
          <p style={{ fontSize: '0.7rem', color: '#9a8a78', marginBottom: '1rem' }}>@anugrahafashions</p>
          <div className="social-insta-grid">
            <img src={footerNecklaceImg}  alt="Insta 1" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '5px' }} />
            <img src={footerEaringsImg}   alt="Insta 2" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '5px' }} />
            <img src={footerBanglesImg}   alt="Insta 3" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '5px' }} />
            <img src={footerRingsImg}     alt="Insta 4" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '5px' }} />
            <img src={footerPendantImg}   alt="Insta 5" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '5px' }} />
            <img src={footerBridalImg}    alt="Insta 6" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '5px' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {/* Instagram icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c1a0e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="#2c1a0e" stroke="none" />
            </svg>
            <a href="https://instagram.com/anugrahafashions" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.68rem', fontWeight: '700', letterSpacing: '1px', color: '#2c1a0e', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              VIEW MORE ON INSTAGRAM <span style={{ fontSize: '0.8rem' }}>→</span>
            </a>
          </div>
        </div>

        {/* ── Center: Testimonial ── */}
        <div className="social-testimonial-center">
          <div style={{ color: 'var(--primary-gold)', fontSize: '3.5rem', lineHeight: 0.6, marginBottom: '1rem', fontFamily: 'Georgia, serif', fontWeight: 'bold' }}>"</div>
          <h3 style={{ color: 'var(--primary-gold-dark)', fontSize: '0.85rem', marginBottom: '1rem', letterSpacing: '2px', fontWeight: '700' }}>WHAT OUR CUSTOMERS SAY</h3>
          <p style={{ fontSize: '0.78rem', fontStyle: 'italic', color: '#4a3a2a', marginBottom: '0.8rem', lineHeight: '1.8', maxWidth: '320px' }}>
            The jewellery is absolutely stunning!<br />The quality and packaging exceeded my expectations.
          </p>
          <p style={{ fontSize: '0.72rem', fontWeight: '600', color: '#9a8a78', marginBottom: '0.8rem' }}>~ Priya S.</p>
          <div style={{ display: 'flex', gap: '0.2rem', color: 'var(--primary-gold)', marginBottom: '1rem' }}>
            <Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" />
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <div style={{ width: '18px', height: '5px', backgroundColor: 'var(--primary-gold)', borderRadius: '3px' }}></div>
            <div style={{ width: '6px', height: '6px', backgroundColor: '#ccc', borderRadius: '50%' }}></div>
            <div style={{ width: '6px', height: '6px', backgroundColor: '#ccc', borderRadius: '50%' }}></div>
          </div>
        </div>

        {/* ── Right: Model Image ── */}
        <div className="social-right" style={{ position: 'relative', overflow: 'hidden' }}>
          <img 
            src={footerBridalImg} 
            alt="Happy Customer" 
            style={{ 
              position: 'absolute', 
              top: '-15%', 
              left: 0, 
              width: '100%', 
              height: '130%', 
              objectFit: 'cover', 
              objectPosition: 'center top',
              transform: `translateY(${parallaxY}px)`,
              willChange: 'transform'
            }} 
          />
          {/* Gradient fade from testimonial bg into the image */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '50px', background: 'linear-gradient(to right, #fcf9f2, transparent)', zIndex: 1 }}></div>
        </div>

      </div>
    </section>
  );
};

const Newsletter = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
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

  return (
    <section className="newsletter-section" ref={sectionRef}>
      {/* Subtle Background Pattern Placeholder */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

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

        <div className="newsletter-form news-anim-form">
          <input type="email" placeholder="Enter your email address" className="newsletter-input" />
          <button className="newsletter-btn">
            SUBSCRIBE
            <div className="newsletter-btn-shimmer"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturesBanner />
      <ShopByCategory />
      <PromoBanners />
      <NewArrivals />
      <TrustBanner />
      <SocialAndTestimonial />
      <Newsletter />
    </div>
  );
}
