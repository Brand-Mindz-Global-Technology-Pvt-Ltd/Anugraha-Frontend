import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentProcessing.css";

const PaymentProcessing = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-processing-page">
      <div className="payment-processing-card">
        <div className="payment-loader"></div>

        <h2>Processing Your Payment</h2>

        <p>
          Please wait while we prepare your secure payment.
          Do not refresh or close this page.
        </p>

        <span className="payment-provider">Powered by PhonePe</span>

        <button onClick={() => navigate("/checkout")}>
          Back to Checkout
        </button>
      </div>
    </div>
  );
};

export default PaymentProcessing;