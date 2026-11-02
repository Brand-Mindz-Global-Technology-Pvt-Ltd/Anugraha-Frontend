import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    setCartItems(savedCart);
  }, []);

  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("guestCart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity } : item
    );

    saveCart(updatedCart);
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item._id !== productId
    );

    saveCart(updatedCart);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <section className="cart-page">
      <div className="cart-heading">
        <h1>Shopping Cart</h1>
        <p>Your favourite jewellery, all in one place.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Discover something beautiful for yourself.</p>
          <button onClick={() => navigate("/")}>
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `http://localhost:5000${item.image || ""}`
                  }
                  alt={item.name}
                />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </p>

                  <div className="cart-quantity">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="cart-remove"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </div>

                <strong>
                  ₹
                  {(Number(item.price) * item.quantity).toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="cart-subtotal">
              <span>Subtotal</span>
              <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
            </div>

            <p>Shipping charges calculated at checkout.</p>

            <button
  className="checkout-button"
  onClick={() => navigate("/checkout")}
>
  PROCEED TO CHECKOUT
</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;