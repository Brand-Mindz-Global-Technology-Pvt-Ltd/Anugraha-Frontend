import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import api from "../../services/api";
import "./Cart.css";

// Delicate thin golden botanical leaf illustrations in #D9AC63
const BotanicalLeaves = ({ isRight = false }) => (
  <svg
    className={`cart-leaf-bg ${isRight ? "cart-leaf-right" : "cart-leaf-left"}`}
    viewBox="0 0 280 260"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Main curving stem */}
    <path
      d="M10 10C50 48 115 78 185 88C225 93 260 88 272 82"
      stroke="#D9AC63"
      strokeWidth="1.25"
      strokeLinecap="round"
      opacity="0.85"
    />
    {/* Leaf 1 */}
    <path
      d="M72 52C66 22 92 8 122 14C128 38 102 62 72 52Z"
      stroke="#D9AC63"
      strokeWidth="1.1"
      opacity="0.8"
    />
    <path d="M72 52C94 34 107 24 122 14" stroke="#D9AC63" strokeWidth="0.8" opacity="0.6" />

    {/* Leaf 2 */}
    <path
      d="M118 70C134 40 168 38 188 52C178 78 148 88 118 70Z"
      stroke="#D9AC63"
      strokeWidth="1.1"
      opacity="0.8"
    />
    <path d="M118 70C148 58 168 50 188 52" stroke="#D9AC63" strokeWidth="0.8" opacity="0.6" />

    {/* Leaf 3 */}
    <path
      d="M165 85C195 68 234 76 248 102C228 118 190 112 165 85Z"
      stroke="#D9AC63"
      strokeWidth="1.1"
      opacity="0.8"
    />
    <path d="M165 85C200 87 224 95 248 102" stroke="#D9AC63" strokeWidth="0.8" opacity="0.6" />

    {/* Secondary arching stem */}
    <path
      d="M98 62C122 102 162 148 212 178"
      stroke="#D9AC63"
      strokeWidth="1.0"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Leaf 4 */}
    <path
      d="M132 112C122 138 136 162 166 162C176 138 156 118 132 112Z"
      stroke="#D9AC63"
      strokeWidth="1.1"
      opacity="0.75"
    />
    <path d="M132 112C147 132 157 147 166 162" stroke="#D9AC63" strokeWidth="0.8" opacity="0.55" />

    {/* Leaf 5 */}
    <path
      d="M172 150C188 172 222 182 242 168C236 142 202 132 172 150Z"
      stroke="#D9AC63"
      strokeWidth="1.1"
      opacity="0.75"
    />
    <path d="M172 150C200 160 222 166 242 168" stroke="#D9AC63" strokeWidth="0.8" opacity="0.55" />

    {/* Leaf 6 - Tip */}
    <path
      d="M212 178C236 192 262 188 272 172C256 158 232 162 212 178Z"
      stroke="#D9AC63"
      strokeWidth="1.1"
      opacity="0.8"
    />
    <path d="M212 178C236 180 256 178 272 172" stroke="#D9AC63" strokeWidth="0.8" opacity="0.6" />

    {/* Delicate bud */}
    <path
      d="M52 38C42 24 52 10 64 16"
      stroke="#D9AC63"
      strokeWidth="0.9"
      strokeLinecap="round"
      opacity="0.6"
    />
    <circle cx="66" cy="16" r="1.5" fill="#D9AC63" opacity="0.75" />
  </svg>
);

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    const base = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace("/api/v1", "")
      : "http://localhost:5000";
    return `${base}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  useEffect(() => {
    const loadCart = async () => {
      // 1. Initial load from localStorage
      const rawLocalCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const localCart = rawLocalCart.map((item) => {
        if (item.product && (!item.name || !item._id)) {
          return {
            _id: item.productId || item.product._id,
            slug: item.product.slug || item.slug || "jewellery",
            name: item.product.name || item.name || "Jewellery Item",
            price: Number(item.product.price ?? item.price ?? 0),
            image: item.product.image || item.image || "",
            quantity: Number(item.quantity || 1),
          };
        }
        return {
          ...item,
          _id: item._id || item.productId,
          quantity: Number(item.quantity || 1),
        };
      });
      setCartItems(localCart);

      // 2. If logged in, fetch from backend cart
      const user = JSON.parse(localStorage.getItem("customerUser") || "{}");
      const customerMongoId =
        localStorage.getItem("customerMongoId") || user.id || user._id;

      if (customerMongoId) {
        try {
          setLoading(true);
          const response = await api.get("/customers/cart/get-cart", {
            params: { customerId: customerMongoId },
          });

          if (
            response.data &&
            response.data.success &&
            response.data.data?.items
          ) {
            const backendItems = response.data.data.items;

            if (backendItems.length > 0) {
              const formatted = backendItems.map((item) => ({
                _id: item.product?._id || item.product,
                name: item.product?.name || item.nameSnapshot || "Jewellery Item",
                price: item.product?.price || item.price,
                image: getImageUrl(
                  item.product?.images?.[0] || item.imageSnapshot
                ),
                quantity: item.quantity,
                slug: item.product?.slug || "",
              }));

              setCartItems(formatted);
              localStorage.setItem("guestCart", JSON.stringify(formatted));
              window.dispatchEvent(new Event("cartUpdated"));
            } else if (localCart.length > 0) {
              // Sync localCart items to backend
              for (const itm of localCart) {
                try {
                  await api.post("/customers/cart/add-cart", {
                    customerId: customerMongoId,
                    productId: itm._id,
                    quantity: itm.quantity,
                  });
                } catch (e) {
                  console.warn("Failed to push local cart item to backend:", e);
                }
              }
            }
          }
        } catch (err) {
          console.warn("Backend cart fetch error, using local cart:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadCart();
  }, []);

  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity } : item
    );

    saveCart(updatedCart);

    // Sync with backend if logged in
    const user = JSON.parse(localStorage.getItem("customerUser") || "{}");
    const customerMongoId =
      localStorage.getItem("customerMongoId") || user.id || user._id;

    if (customerMongoId) {
      try {
        await api.put("/customers/cart/update-cart", {
          customerId: customerMongoId,
          productId,
          quantity,
        });
      } catch (err) {
        console.warn("Backend update-cart error:", err);
      }
    }
  };

  const removeItem = async (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    saveCart(updatedCart);

    // Sync with backend if logged in
    const user = JSON.parse(localStorage.getItem("customerUser") || "{}");
    const customerMongoId =
      localStorage.getItem("customerMongoId") || user.id || user._id;

    if (customerMongoId) {
      try {
        await api.delete("/customers/cart/remove-cart", {
          data: {
            customerId: customerMongoId,
            productId,
          },
        });
      } catch (err) {
        console.warn("Backend remove-cart error:", err);
      }
    }
  };

  const totalItemsCount = cartItems.reduce(
    (acc, itm) => acc + Number(itm.quantity || 1),
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <section className="cart-page">
      {/* Decorative Golden Botanical Leaves Background (#D9AC63) */}
      <BotanicalLeaves isRight={false} />
      <BotanicalLeaves isRight={true} />

      <div className="cart-wrapper">
        {/* Centered Heading Section */}
        <div className="cart-heading-section">
          <div className="cart-brand-badge">
            <span className="cart-badge-icon">✦</span>
            <span>ANUGRAHA FASHIONS</span>
          </div>

          <h1 className="cart-main-title">
            Shopping <span className="cart-title-gold">Cart</span>
          </h1>

          <p className="cart-subtitle">
            Your favourite jewellery, all in one place.
          </p>

          {/* Ornamental Divider */}
          <div className="cart-ornament" aria-hidden="true">
            <span className="cart-orn-line" />
            <span className="cart-orn-dot" />
            <span className="cart-orn-line" />
          </div>
        </div>

        {/* Loading State */}
        {loading && cartItems.length === 0 ? (
          <div className="cart-loading-state">
            <div className="cart-spinner" />
            <p>Loading your shopping cart...</p>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="cart-empty-container">
            <div className="cart-empty-card">
              <div className="cart-empty-icon-wrap">
                <Sparkles size={32} color="#956E2B" />
              </div>
              <h2 className="cart-empty-title">Your Cart is Empty</h2>
              <p className="cart-empty-description">
                Discover our exquisite handcrafted gold and diamond jewellery to
                add timeless elegance to your collection.
              </p>
              <button
                type="button"
                className="cart-checkout-btn cart-empty-btn"
                onClick={() => navigate("/")}
              >
                <ShoppingBag size={16} strokeWidth={2} />
                <span>EXPLORE COLLECTIONS</span>
              </button>
            </div>
          </div>
        ) : (
          /* Two-Column Cart Layout */
          <div className="cart-layout">
            {/* Left Column: Cart Items Card */}
            <div className="cart-items-card">
              {/* Header Strip with Item Count */}
              <div className="cart-items-header-strip">
                <ShoppingCart size={17} color="#956E2B" strokeWidth={2} />
                <span>
                  {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} in your cart
                </span>
              </div>

              {/* Items List */}
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div className="cart-item-row" key={item._id}>
                    {/* Product Image */}
                    <div
                      className="cart-item-img-box"
                      onClick={() =>
                        item.slug && navigate(`/product/${item.slug}/${item._id}`)
                      }
                      title={item.name}
                    >
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="cart-item-img"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/120x120/FAF8F5/8b642f?text=Anugraha";
                        }}
                      />
                    </div>

                    {/* Product Details & Controls */}
                    <div className="cart-item-details">
                      <h3
                        className="cart-item-name"
                        onClick={() =>
                          item.slug &&
                          navigate(`/product/${item.slug}/${item._id}`)
                        }
                      >
                        {item.name}
                      </h3>

                      <p className="cart-item-unit-price">
                        ₹{Number(item.price).toLocaleString("en-IN")}
                      </p>

                      <div className="cart-item-actions-row">
                        {/* Compact Quantity Selector */}
                        <div className="cart-qty-control">
                          <button
                            type="button"
                            className="cart-qty-btn"
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} strokeWidth={2.2} />
                          </button>

                          <span className="cart-qty-value">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            className="cart-qty-btn"
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} strokeWidth={2.2} />
                          </button>
                        </div>

                        {/* Remove Link */}
                        <button
                          type="button"
                          className="cart-item-remove-btn"
                          onClick={() => removeItem(item._id)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 size={13} className="cart-remove-icon" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Total Item Price */}
                    <div className="cart-item-total-price">
                      ₹
                      {(Number(item.price) * item.quantity).toLocaleString(
                        "en-IN"
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="cart-summary-card">
              <h2 className="cart-summary-title">Order Summary</h2>

              <div className="cart-summary-row">
                <span className="cart-summary-label">
                  Subtotal ({totalItemsCount}{" "}
                  {totalItemsCount === 1 ? "item" : "items"})
                </span>
                <span className="cart-summary-value">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="cart-summary-divider" />

              <div className="cart-summary-row">
                <span className="cart-summary-label">Shipping</span>
                <span className="cart-summary-shipping-free">FREE</span>
              </div>

              <p className="cart-summary-tax-note">
                All taxes &amp; shipping charges included.
              </p>

              {/* Primary: Proceed to Checkout Button */}
              <button
                type="button"
                className="cart-checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                <ShoppingBag size={17} strokeWidth={2} />
                <span>PROCEED TO CHECKOUT</span>
              </button>

              {/* Secondary: Continue Shopping Button */}
              <button
                type="button"
                className="cart-continue-btn"
                onClick={() => navigate("/")}
              >
                <ShoppingBag size={17} strokeWidth={1.8} />
                <span>CONTINUE SHOPPING</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Promise Strip: "THE ANUGRAHA PROMISE" */}
        <div className="cart-promise-strip" aria-hidden="true">
          <p className="cart-promise-badge">THE ANUGRAHA PROMISE</p>
          <p className="cart-promise-tagline">
            Crafted with purity. Designed to last.
          </p>
          <div className="cart-ornament">
            <span className="cart-orn-line" />
            <span className="cart-orn-dot" />
            <span className="cart-orn-line" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
