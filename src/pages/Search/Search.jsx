
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import api from "../../services/api";
import "./Search.css";

const Search = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("customerWishlist") || "[]");
    } catch {
      return [];
    }
  });

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchTerm.trim().length < 2) {
      alert("Please enter at least 2 characters");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);

      const response = await api.get("/customers/products/search", {
        params: { q: searchTerm.trim() },
      });

      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (e, product) => {
    e.stopPropagation();

    const alreadySaved = wishlist.some(
      (item) => item._id === product._id
    );

    const updatedWishlist = alreadySaved
      ? wishlist.filter((item) => item._id !== product._id)
      : [...wishlist, product];

    setWishlist(updatedWishlist);
    localStorage.setItem(
      "customerWishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <section className="search-page">
      <div className="search-page-heading">
        <span className="search-eyebrow">FIND YOUR PERFECT JEWELLERY</span>
        <h1>Search Products</h1>
        <p>Discover timeless jewellery for every special moment.</p>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search necklaces, earrings, bangles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "SEARCHING..." : "SEARCH"}
          </button>
        </form>
      </div>

      {loading && (
        <p className="search-message">Finding your jewellery...</p>
      )}

      {!loading && searched && products.length === 0 && (
        <p className="search-message">
          No products found. Try another search.
        </p>
      )}

      {!loading && products.length > 0 && (
        <div className="search-results">
          <div className="search-results-heading">
            <h2>Search Results</h2>
            <span>{products.length} Products Found</span>
          </div>

          <div className="search-products-grid">
            {products.map((product) => {
              const isWishlisted = wishlist.some(
                (item) => item._id === product._id
              );

              return (
                <div
                  className="search-product-card"
                  key={product._id}
                  onClick={() =>
                    navigate(`/product/${product.slug}/${product._id}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="search-product-image">
                    <img
                      src={
                        product.images?.[0]?.startsWith("http")
                          ? product.images[0]
                          : `http://localhost:5000${product.images?.[0] || ""}`
                      }
                      alt={product.name}
                    />

                    <button
                      type="button"
                      className="search-wishlist-button"
                      onClick={(e) => toggleWishlist(e, product)}
                      aria-label={
                        isWishlisted
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      <Heart
                        size={20}
                        fill={isWishlisted ? "#8b0000" : "none"}
                        color={isWishlisted ? "#8b0000" : "#333"}
                      />
                    </button>
                  </div>

                  <div className="search-product-info">
                    <h3>{product.name}</h3>
                    <p>
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!searched && !loading && (
        <div className="search-empty-state">
          <p>Start searching to explore our jewellery collection.</p>
        </div>
      )}
    </section>
  );
};

export default Search;
