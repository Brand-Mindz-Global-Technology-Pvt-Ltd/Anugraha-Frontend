import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Eye,
  Zap,
  ShieldCheck,
  Truck,
  RefreshCw,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api from "../../services/api";
import { toggleWishlistItem, getCustomerMongoId, fetchCustomerWishlist } from "../../services/wishlistService";
import botanicalImg from "../../assets/Images/contact/contact-botanical-transparent.png";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { slug, id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [buying, setBuying] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("customerWishlist") || "[]");
    } catch {
      return [];
    }
  });

  const getImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    const base = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace("/api/v1", "")
      : "http://localhost:5000";
    return `${base}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get(`/customers/products/${slug}/${id}`);

        if (response.data && response.data.success) {
          setProduct(response.data.data);
          setActiveImageIndex(0);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error("Product details error:", err);
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug, id]);

  // Sync wishlist changes
  useEffect(() => {
    const syncWishlist = () => {
      try {
        setWishlist(JSON.parse(localStorage.getItem("customerWishlist") || "[]"));
      } catch {
        setWishlist([]);
      }
    };

    window.addEventListener("wishlistUpdated", syncWishlist);
    return () => window.removeEventListener("wishlistUpdated", syncWishlist);
  }, []);

  const isWishlisted = wishlist.some((item) => item._id === product?._id);

  const toggleWishlist = async () => {
    if (!product) return;

    // Optimistic local update first
    const alreadySaved = wishlist.some((item) => item._id === product._id);
    const updatedWishlist = alreadySaved
      ? wishlist.filter((item) => item._id !== product._id)
      : [
          ...wishlist,
          {
            _id: product._id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            images: product.images,
          },
        ];

    setWishlist(updatedWishlist);
    localStorage.setItem("customerWishlist", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));

    // Persist to backend if customer is logged in
    const customerId = getCustomerMongoId();
    if (customerId) {
      try {
        await toggleWishlistItem(product);
        // Sync the accurate backend wishlist back
        await fetchCustomerWishlist();
      } catch (err) {
        console.warn("Backend wishlist sync failed:", err);
      }
    }
  };

  const syncCartStorage = (qtyToAdd) => {
    const savedCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    const existingItem = savedCart.find((item) => item._id === product._id);

    let updatedCart;
    if (existingItem) {
      updatedCart = savedCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + qtyToAdd }
          : item
      );
    } else {
      updatedCart = [
        ...savedCart,
        {
          _id: product._id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: getImageUrl(product.images?.[0]),
          quantity: qtyToAdd,
        },
      ];
    }

    localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    return updatedCart;
  };

  const handleAddToCart = async () => {
    if (!product) return;

    if (product.stock <= 0) {
      alert("Sorry, this product is currently out of stock.");
      return;
    }

    try {
      setAdding(true);

      const savedCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const existingItem = savedCart.find((item) => item._id === product._id);
      const currentQty = existingItem ? existingItem.quantity : 0;

      if (currentQty + quantity > product.stock) {
        alert(
          `Only ${product.stock} items available in stock. You already have ${currentQty} in your cart.`
        );
        return;
      }

      // Backend sync if logged in
      const user = JSON.parse(localStorage.getItem("customerUser") || "{}");
      const customerMongoId = user.id || user._id;

      if (customerMongoId) {
        try {
          await api.post("/customers/cart/add-cart", {
            customerId: customerMongoId,
            productId: product._id,
            quantity: quantity,
          });
        } catch (backendErr) {
          console.warn("Backend add-cart fallback to local:", backendErr);
        }
      }

      syncCartStorage(quantity);
      alert(`"${product.name}" (qty: ${quantity}) added to your cart.`);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Unable to add product to cart.");
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;

    if (product.stock <= 0) {
      alert("Sorry, this product is currently out of stock.");
      return;
    }

    try {
      setBuying(true);

      // Backend sync if logged in
      const user = JSON.parse(localStorage.getItem("customerUser") || "{}");
      const customerMongoId = user.id || user._id;

      if (customerMongoId) {
        try {
          await api.post("/customers/cart/add-cart", {
            customerId: customerMongoId,
            productId: product._id,
            quantity: quantity,
          });
        } catch (backendErr) {
          console.warn("Backend add-cart fallback to local:", backendErr);
        }
      }

      syncCartStorage(quantity);
      navigate("/checkout");
    } catch (err) {
      console.error("Buy now error:", err);
      alert("Unable to proceed to checkout.");
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <section className="product-details-page-wrap">
        <div className="pd-loading">
          <div className="pd-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="product-details-page-wrap">
        <div className="pd-error">
          <h2>{error || "Product not found."}</h2>
          <button onClick={() => navigate("/")}>BROWSE COLLECTION</button>
        </div>
      </section>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const images = product.images && product.images.length > 0 ? product.images : [];
  const currentImage = images[activeImageIndex] || "";
  const currentImageUrl = getImageUrl(currentImage);

  const handlePrevImage = () => {
    if (images.length <= 1) return;
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    if (images.length <= 1) return;
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="product-details-page-wrap">
      {/* Corner Botanical Flourishes */}
      <div
        className="pd-botanical pd-botanical-tl"
        style={{ backgroundImage: `url(${botanicalImg})` }}
        aria-hidden="true"
      />
      <div
        className="pd-botanical pd-botanical-tr"
        style={{ backgroundImage: `url(${botanicalImg})` }}
        aria-hidden="true"
      />
      <div
        className="pd-botanical pd-botanical-bl"
        style={{ backgroundImage: `url(${botanicalImg})` }}
        aria-hidden="true"
      />
      <div
        className="pd-botanical pd-botanical-br"
        style={{ backgroundImage: `url(${botanicalImg})` }}
        aria-hidden="true"
      />

      <div className="product-details-container">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="pd-breadcrumb-link">
            <Home size={13} className="pd-breadcrumb-icon" />
            <span>Home</span>
          </Link>
          <span className="pd-breadcrumb-sep">&gt;</span>
          <span className="pd-breadcrumb-item">
            {product.category || "Jewellery"}
          </span>
          <span className="pd-breadcrumb-sep">&gt;</span>
          <span className="pd-breadcrumb-current">{product.name}</span>
        </nav>

        {/* Main Two-Column Layout */}
        <div className="product-details-layout">
          {/* Left Column: Gallery */}
          <div className="product-details-gallery">
            <div className="product-details-main-image-card">
              {Number(product.discount) > 0 ? (
                <span className="pd-img-discount-badge">
                  {product.discount}% OFF
                </span>
              ) : null}

              <img
                src={currentImageUrl}
                alt={product.name}
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/600x600/f8f5ef/8b642f?text=Anugraha";
                }}
              />
            </div>

            {/* Thumbnails Row */}
            {images.length > 0 && (
              <div className="pd-thumbnails-row">
                {images.length > 1 && (
                  <button
                    type="button"
                    className="pd-thumb-arrow"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}

                <div className="pd-thumbnails-list">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`pd-thumb-card ${
                        idx === activeImageIndex ? "is-active" : ""
                      }`}
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img
                        src={getImageUrl(img)}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/100x100/f8f5ef/8b642f?text=A";
                        }}
                      />
                    </button>
                  ))}
                </div>

                {images.length > 1 && (
                  <button
                    type="button"
                    className="pd-thumb-arrow"
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Info */}
          <div className="product-details-info">
            {/* Category Pill Tag */}
            <div className="pd-category-row">
              <span className="pd-category-pill">
                {product.category || "JEWELLERY"}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="pd-title">{product.name}</h1>

            {/* Price & Discount Row */}
            <div className="pd-price-row">
              <span className="pd-price">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </span>

              {Number(product.oldPrice) > Number(product.price) ? (
                <span className="pd-old-price">
                  ₹{Number(product.oldPrice).toLocaleString("en-IN")}
                </span>
              ) : null}

              {Number(product.discount) > 0 ? (
                <span className="pd-discount-pill">
                  {product.discount}% OFF
                </span>
              ) : null}
            </div>

            {/* Stock Status */}
            <div className="pd-stock-row">
              <span className={`pd-stock-dot ${isOutOfStock ? "out" : "in"}`}>
                ●
              </span>
              <span className={`pd-stock-text ${isOutOfStock ? "out" : "in"}`}>
                {isOutOfStock
                  ? "Out of Stock"
                  : `In Stock (${product.stock} available)`}
              </span>
            </div>

            {/* Elegant Divider with Lotus Motif */}
            <div className="pd-divider-wrap" aria-hidden="true">
              <span className="pd-divider-line"></span>
              <span className="pd-divider-motif">
                <svg
                  width="26"
                  height="22"
                  viewBox="0 0 24 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C12 2 9.5 7.5 9.5 11C9.5 13.5 10.7 15.5 12 16.5C13.3 15.5 14.5 13.5 14.5 11C14.5 7.5 12 2 12 2Z"
                    stroke="#c5a059"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <path
                    d="M12 16.5C9.5 15.5 5.5 12.5 5.5 9C5.5 6.5 7 5 7 5C7 5 6.8 9 9.5 12C10.7 13.3 12 16.5 12 16.5Z"
                    stroke="#c5a059"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <path
                    d="M12 16.5C14.5 15.5 18.5 12.5 18.5 9C18.5 6.5 17 5 17 5C17 5 17.2 9 14.5 12C13.3 13.3 12 16.5 12 16.5Z"
                    stroke="#c5a059"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <path
                    d="M12 16.5C7.5 16.5 3 14 3 11C3 9.5 4 8.5 4 8.5C4 8.5 4.5 12 8.5 13.8C10 14.5 12 16.5 12 16.5Z"
                    stroke="#c5a059"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <path
                    d="M12 16.5C16.5 16.5 21 14 21 11C21 9.5 20 8.5 20 8.5C20 8.5 19.5 12 15.5 13.8C14 14.5 12 16.5 12 16.5Z"
                    stroke="#c5a059"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <circle cx="12" cy="18" r="0.8" fill="#c5a059" />
                </svg>
              </span>
              <span className="pd-divider-line"></span>
            </div>

            {/* Product Tagline */}
            <p className="pd-tagline">
              A timeless piece of elegance, crafted to perfection.
            </p>

            {/* Quantity & Wishlist Control in One Row */}
            <div className="pd-qty-wishlist-row">
              <div className="pd-qty-group">
                <span className="pd-qty-label">Quantity:</span>
                <div className="pd-qty-stepper">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || adding || buying || isOutOfStock}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="pd-qty-value">{quantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                    disabled={
                      quantity >= product.stock ||
                      adding ||
                      buying ||
                      isOutOfStock
                    }
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pd-qty-wishlist-divider" aria-hidden="true"></div>

              <button
                type="button"
                className={`pd-inline-wishlist-btn ${
                  isWishlisted ? "is-wishlisted" : ""
                }`}
                onClick={toggleWishlist}
              >
                <Heart
                  size={16}
                  fill={isWishlisted ? "#8b0000" : "none"}
                  color={isWishlisted ? "#8b0000" : "#2a1c14"}
                />
                <span>{isWishlisted ? "In Wishlist" : "Add to Wishlist"}</span>
              </button>
            </div>

            {/* Three Compact Action Buttons */}
            <div className="pd-button-row">
              <button
                type="button"
                className="pd-action-btn pd-action-cart"
                onClick={handleAddToCart}
                disabled={isOutOfStock || adding || buying}
              >
                <ShoppingBag size={15} />
                <span>{adding ? "Adding..." : "Add to Cart"}</span>
              </button>

              <button
                type="button"
                className="pd-action-btn pd-action-viewcart"
                onClick={() => navigate("/cart")}
              >
                <Eye size={15} />
                <span>View Cart</span>
              </button>

              <button
                type="button"
                className="pd-action-btn pd-action-buynow"
                onClick={handleBuyNow}
                disabled={isOutOfStock || adding || buying}
              >
                <Zap size={14} fill="#faf5eb" />
                <span>{buying ? "Processing..." : "Buy Now"}</span>
              </button>
            </div>

            {/* Bottom Benefits Card */}
            <div className="pd-benefits-card">
              <div className="pd-benefit-item">
                <ShieldCheck
                  size={20}
                  strokeWidth={1.8}
                  className="pd-benefit-icon"
                />
                <div className="pd-benefit-text">
                  <span>Certified</span>
                  <span>Hallmarked Jewellery</span>
                </div>
              </div>

              <div className="pd-benefit-divider" aria-hidden="true"></div>

              <div className="pd-benefit-item">
                <Truck
                  size={20}
                  strokeWidth={1.8}
                  className="pd-benefit-icon"
                />
                <div className="pd-benefit-text">
                  <span>Free Insured</span>
                  <span>Delivery</span>
                </div>
              </div>

              <div className="pd-benefit-divider" aria-hidden="true"></div>

              <div className="pd-benefit-item">
                <RefreshCw
                  size={20}
                  strokeWidth={1.8}
                  className="pd-benefit-icon"
                />
                <div className="pd-benefit-text">
                  <span>7 Days Easy</span>
                  <span>Exchange</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Maroon Wave with Delicate Antique-Gold Line */}
      <div className="pd-bottom-accent" aria-hidden="true">
        <svg
          viewBox="0 0 1440 70"
          fill="none"
          preserveAspectRatio="none"
          className="pd-bottom-wave-svg"
        >
          {/* Main Dark Maroon Wave */}
          <path
            d="M0,25 C320,60 560,10 880,38 C1160,65 1320,20 1440,35 L1440,70 L0,70 Z"
            fill="#4a0e0e"
          />
          {/* Delicate Antique-Gold Line directly along upper curve */}
          <path
            d="M0,25 C320,60 560,10 880,38 C1160,65 1320,20 1440,35"
            stroke="#c5a059"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
};

export default ProductDetails;
