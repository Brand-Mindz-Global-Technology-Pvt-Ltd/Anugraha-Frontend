import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const cartItems = JSON.parse(
    localStorage.getItem("guestCart") || "[]"
  );

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("online");

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  // GST and shipping will be configured after client confirmation.
  const gst = 0;
  const shipping = 0;
  const total = subtotal + gst + shipping;

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (paymentMethod === "online") {
    navigate("/payment-processing");
  } else {
    alert("Cash on Delivery selected. Order placement will be added later.");
  }
};

  if (cartItems.length === 0) {
    return (
      <section className="checkout-page">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/")}>
          CONTINUE SHOPPING
        </button>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-heading">
        <h1>Checkout</h1>
        <p>Complete your details to place your order</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="checkout-layout">
          <div className="checkout-left">
            <div className="checkout-section">
              <h2>Customer Details</h2>

              <div className="checkout-form-grid">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={customer.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={customer.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={customer.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />
              </div>
            </div>

            <div className="checkout-section">
              <h2>Delivery Address</h2>

              <div className="checkout-form-grid">
                <textarea
                  name="address"
                  placeholder="House No, Street, Area"
                  value={customer.address}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={customer.city}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={customer.state}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={customer.pincode}
                  onChange={handleChange}
                  pattern="[0-9]{6}"
                  maxLength="6"
                  required
                />
              </div>
            </div>

            <div className="checkout-section">
              <h2>Payment Method</h2>
  <label className="checkout-payment-option phonepe-option">
    <input
      type="radio"
      name="payment"
      value="online"
      checked={paymentMethod === "online"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />

    <div className="phonepe-details">
      <strong>PhonePe</strong>
      <span>Pay securely using PhonePe</span>
    </div>
  </label>

  <p className="checkout-payment-note">
    UPI, Debit Card, Credit Card and Net Banking
  </p>

  <label className="checkout-payment-option">
    <input
      type="radio"
      name="payment"
      value="cod"
      checked={paymentMethod === "cod"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    Cash on Delivery
  </label>
</div>

          </div>

          <div className="checkout-summary">
            <h2>Order Summary</h2>

            {cartItems.map((item) => (
              <div className="checkout-product" key={item._id}>
                <img src={item.image} alt={item.name} />

                <div className="checkout-item-info">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <strong>
                    ₹{(
                      Number(item.price) * item.quantity
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>
            ))}

            <div>
              <span>Subtotal</span>
              <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
            </div>

            <div>
              <span>GST</span>
              <span>To be confirmed</span>
            </div>

            <div>
              <span>Shipping</span>
              <span>To be confirmed</span>
            </div>

            <hr />

            <div className="checkout-total">
              <strong>Total</strong>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>

            <p className="checkout-note">
              Final GST and shipping charges will be updated after
              business rules are confirmed.
            </p>

            <button type="submit" className="checkout-place-order">
              {paymentMethod === "online"
                ? "CONTINUE TO PAYMENT"
                : "PLACE ORDER"}
            </button>

            <button
              type="button"
              className="checkout-back-button"
              onClick={() => navigate("/cart")}
            >
              BACK TO CART
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Checkout;