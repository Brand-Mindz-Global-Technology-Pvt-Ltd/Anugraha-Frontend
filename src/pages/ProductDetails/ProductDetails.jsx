
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import api from "../../services/api";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { slug, id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("customerWishlist") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(
          `/customers/products/${slug}/${id}`
        );

        if (response.data.success) {
          setProduct(response.data.data);
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

  // Sync wishlist changes from other pages
  useEffect(() => {
    const syncWishlist = () => {
      try {
        setWishlist(
          JSON.parse(localStorage.getItem("customerWishlist") || "[]")
        );
      } catch {
        setWishlist([]);
      }
    };

    window.addEventListener("wishlistUpdated", syncWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", syncWishlist);
    };
  }, []);

  const image = product?.images?.[0];

  const imageUrl = image?.startsWith("http")
    ? image
    : `http://localhost:5000${image || ""}`;

  const isWishlisted = wishlist.some(
    (item) => item._id === product?._id
  );

  const toggleWishlist = () => {
    if (!product) return;

    const alreadySaved = wishlist.some(
      (item) => item._id === product._id
    );

    const updatedWishlist = alreadySaved
      ? wishlist.filter((item) => item._id !== product._id)
      : [
          ...wishlist,
          {
            _id: product._id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: imageUrl,
          },
        ];

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "customerWishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const handleAddToCart = () => {
    if (!product) return;

    try {
      setAdding(true);

      const savedCart = JSON.parse(
        localStorage.getItem("guestCart") || "[]"
      );

      const existingItem = savedCart.find(
        (item) => item._id === product._id
      );

      const currentQuantity = existingItem
        ? existingItem.quantity
        : 0;

      if (currentQuantity + 1 > product.stock) {
        alert(`Only ${product.stock} items available in stock.`);
        return;
      }

      let updatedCart;

      if (existingItem) {
        updatedCart = savedCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...savedCart,
          {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: imageUrl,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem(
        "guestCart",
        JSON.stringify(updatedCart)
      );

      window.dispatchEvent(new Event("cartUpdated"));

      alert("Product added to cart successfully!");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Unable to add product to cart.");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <section className="product-details-page">
      <div className="product-details-image">
        <img src={imageUrl} alt={product.name} />
      </div>

      <div className="product-details-info">
        <h1>{product.name}</h1>

        <p className="product-details-price">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>

        {product.oldPrice && (
          <p className="product-details-old-price">
            ₹{Number(product.oldPrice).toLocaleString("en-IN")}
          </p>
        )}

        {product.description && (
          <p className="product-details-description">
            {product.description}
          </p>
        )}

        <p className="product-details-stock">
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <button
          type="button"
          className="product-details-wishlist-button"
          onClick={toggleWishlist}
        >
          <Heart
            size={20}
            fill={isWishlisted ? "#8b0000" : "none"}
            color={isWishlisted ? "#8b0000" : "#333"}
          />
          {isWishlisted ? "WISHLISTED" : "ADD TO WISHLIST"}
        </button>

        <button
          className="product-details-cart-button"
          onClick={handleAddToCart}
          disabled={product.stock <= 0 || adding}
        >
          {adding ? "ADDING..." : "ADD TO CART"}
        </button>

        <button
          className="product-details-cart-button"
          onClick={() => navigate("/cart")}
          style={{ marginTop: "12px" }}
        >
          VIEW CART
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;
