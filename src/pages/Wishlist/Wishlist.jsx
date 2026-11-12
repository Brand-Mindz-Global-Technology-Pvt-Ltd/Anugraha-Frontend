import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Sparkles,
  ArrowRight,
  User,
} from "lucide-react";
import {
  fetchCustomerWishlist,
  removeWishlistItem,
  isCustomerLoggedIn,
  getCustomerMongoId,
} from "../../services/wishlistService";
import api from "../../services/api";
import "./Wishlist.css";

// Delicate thin golden botanical leaf illustrations in #D9AC63
const BotanicalLeaves = ({ isRight = false }) => (
  <svg
    className={`wishlist-leaf-bg ${isRight ? "wishlist-leaf-right" : "wishlist-leaf-left"}`}
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

export default function Wishlist() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [addingToCartId, setAddingToCartId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(isCustomerLoggedIn());

  const baseUrl = (import.meta.env.VITE_API_URL || "").replace(
    /\/api\/v1\/?$/,
    ""
  );

  const loadWishlist = async () => {
    setLoading(true);
    const logged = isCustomerLoggedIn();
    setIsLoggedIn(logged);

    if (!logged) {
      setLoading(false);
      return;
    }

    try {
      const items = await fetchCustomerWishlist();
      setProducts(items || []);
    } catch (err) {
      console.error("Error loading wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();

    const handleWishlistUpdate = () => {
      try {
        const stored = JSON.parse(
          localStorage.getItem("customerWishlist") || "[]"
        );
        setProducts(stored);
      } catch {
        // no-op
      }
    };

    const handleAuthChange = () => {
      loadWishlist();
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    window.addEventListener("authChanged", handleAuthChange);
    window.addEventListener("storage", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
      window.removeEventListener("authChanged", handleAuthChange);
      window.removeEventListener("storage", handleWishlistUpdate);
    };
  }, []);

  const handleRemove = async (e, productId) => {
    e.stopPropagation();
    if (!productId || removingId) return;

    setRemovingId(productId);
    try {
      await removeWishlistItem(productId);
      setProducts((prev) =>
        prev.filter((item) => (item._id || item.id) !== productId)
      );
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove product from wishlist. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    const productId = product._id || product.id;
    if (!productId || addingToCartId) return;

    if (typeof product.stock === "number" && product.stock <= 0) {
      alert("This item is currently out of stock.");
      return;
    }

    setAddingToCartId(productId);

    try {
      const savedCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const existingIndex = savedCart.findIndex(
        (item) => (item._id || item.productId) === productId
      );
      const currentQty =
        existingIndex > -1 ? Number(savedCart[existingIndex].quantity || 1) : 0;

      if (
        typeof product.stock === "number" &&
        product.stock > 0 &&
        currentQty + 1 > product.stock
      ) {
        alert(
          `Only ${product.stock} items available in stock. You already have ${currentQty} in your cart.`
        );
        return;
      }

      // Backend sync for logged-in customer
      const customerMongoId = getCustomerMongoId();
      if (customerMongoId) {
        try {
          await api.post("/customers/cart/add-cart", {
            customerId: customerMongoId,
            productId: productId,
            quantity: 1,
          });
        } catch (backendErr) {
          console.warn("Backend add-cart fallback to local:", backendErr);
        }
      }

      const resolvedImg = getProductImage(product);

      let updatedCart;
      if (existingIndex > -1) {
        updatedCart = savedCart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: Number(item.quantity || 1) + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...savedCart,
          {
            _id: productId,
            slug: product.slug || "jewellery",
            name: product.name || "Jewellery Item",
            price: Number(product.price) || 0,
            image: resolvedImg,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
      alert(`"${product.name || "Product"}" added to your cart successfully!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart. Please try again.");
    } finally {
      setAddingToCartId(null);
    }
  };

  const getProductImage = (product) => {
    const rawImg = product.images || product.image;
    const firstImg = Array.isArray(rawImg) ? rawImg[0] : rawImg;
    if (!firstImg) {
      return "https://placehold.co/400x400/faf8f4/8b642f?text=Anugraha";
    }
    if (firstImg.startsWith("http") || firstImg.startsWith("data:")) {
      return firstImg;
    }
    return `${baseUrl}${firstImg.startsWith("/") ? "" : "/"}${firstImg}`;
  };

  return (
    <div className="wishlist-page">
      {/* Decorative Golden Botanical Leaves Background */}
      <BotanicalLeaves isRight={false} />
      <BotanicalLeaves isRight={true} />

      <div className="wishlist-wrapper">
        {/* Centered Heading Section */}
        <div className="wishlist-header-section">
          <div className="wishlist-treasure-badge">
            <span className="wishlist-badge-sparkle">✦</span>
            <span>SAVED TREASURES</span>
          </div>

          <h1 className="wishlist-main-title">My Wishlist</h1>

          <p className="wishlist-description">
            Curate your favourite gold &amp; diamond jewellery pieces and keep
            track of timeless elegance.
          </p>

          {/* Ornamental Divider */}
          <div className="wishlist-ornament" aria-hidden="true">
            <span className="wishlist-orn-line" />
            <span className="wishlist-orn-dot" />
            <span className="wishlist-orn-line" />
          </div>
        </div>

        {/* State 1: Not Logged In */}
        {!isLoggedIn && !loading && (
          <div className="wishlist-login-prompt">
            <div className="wishlist-prompt-card">
              <div className="wishlist-prompt-icon-wrap">
                <Heart size={30} className="wishlist-prompt-heart" />
              </div>
              <h2>Sign in to view your wishlist</h2>
              <p>
                Your saved pieces are stored securely in your customer account.
                Please sign in to view and manage your personalized collection.
              </p>
              <div className="wishlist-prompt-actions">
                <button
                  type="button"
                  className="wishlist-cta-btn"
                  onClick={() => navigate("/login")}
                >
                  <User size={15} />
                  <span>SIGN IN TO ANUGRAHA</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* State 2: Loading */}
        {loading && (
          <div className="wishlist-loading-state">
            <div className="wishlist-spinner" />
            <p>Loading your saved pieces...</p>
          </div>
        )}

        {/* State 3: Logged In & Empty */}
        {isLoggedIn && !loading && products.length === 0 && (
          <div className="wishlist-empty-state">
            <div className="wishlist-empty-card">
              <div className="wishlist-empty-icon-wrap">
                <Sparkles size={32} />
              </div>
              <h2 className="wishlist-empty-title">Your Wishlist Is Empty</h2>
              <p className="wishlist-empty-description">
                Discover beautiful jewellery pieces and save your favourites here.
              </p>
              <button
                type="button"
                className="wishlist-cta-btn"
                onClick={() => navigate("/")}
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* State 4: Logged In & Has Products */}
        {isLoggedIn && !loading && products.length > 0 && (
          <div className="wishlist-grid">
            {products.map((item) => {
              const productId = item._id || item.id;
              const productSlug = item.slug || "jewellery";
              const isRemoving = removingId === productId;
              const isAdding = addingToCartId === productId;
              const isOutOfStock =
                typeof item.stock === "number" && item.stock <= 0;

              return (
                <div
                  key={productId}
                  className="wishlist-product-card"
                  onClick={() =>
                    navigate(`/product/${productSlug}/${productId}`)
                  }
                >
                  {/* Card Image Container */}
                  <div className="wishlist-card-img-wrap">
                    <img
                      src={getProductImage(item)}
                      alt={item.name}
                      className="wishlist-card-img"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/400x400/faf8f4/8b642f?text=Anugraha";
                      }}
                    />

                    {/* Top-Left Wishlist Heart Badge (Solid Maroon Heart) */}
                    <div
                      className="wishlist-heart-badge"
                      title="Saved in Wishlist"
                      aria-hidden="true"
                    >
                      <Heart size={14} fill="#8b0000" color="#8b0000" />
                    </div>

                    {/* Top-Right Remove/Trash Button */}
                    <button
                      type="button"
                      className="wishlist-remove-btn"
                      onClick={(e) => handleRemove(e, productId)}
                      disabled={isRemoving}
                      title="Remove from wishlist"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Card Info Area */}
                  <div className="wishlist-card-info">
                    <h3 className="wishlist-item-name" title={item.name}>
                      {item.name}
                    </h3>

                    <div className="wishlist-price-row">
                      <span className="wishlist-item-price">
                        ₹{Number(item.price || 0).toLocaleString("en-IN")}
                      </span>
                      <span
                        className={`wishlist-stock-status ${
                          isOutOfStock ? "is-out" : "is-in"
                        }`}
                      >
                        {isOutOfStock ? "Out of Stock" : "In Stock"}
                      </span>
                    </div>

                    {/* ADD TO CART Button (Homepage Gold/Brown #a67c2e) */}
                    <button
                      type="button"
                      className="wishlist-add-cart-btn"
                      onClick={(e) => handleAddToCart(e, item)}
                      disabled={isAdding || isOutOfStock}
                    >
                      <ShoppingCart size={15} strokeWidth={2.2} />
                      <span>
                        {isAdding
                          ? "ADDING..."
                          : isOutOfStock
                          ? "OUT OF STOCK"
                          : "ADD TO CART"}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
