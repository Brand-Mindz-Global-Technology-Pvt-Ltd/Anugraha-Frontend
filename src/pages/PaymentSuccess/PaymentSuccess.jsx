import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-success-page">
      <div className="payment-success-card">
        <div className="success-icon">
          <CheckCircle size={65} />
        </div>

        <h2>Payment Successful!</h2>

        <p>
          Thank you for shopping with Anugraha Fashions.
          Your order confirmation will be available once
          the order is successfully placed.
        </p>

        <span className="success-note">
          Thank you for choosing us!
        </span>

        <button onClick={() => navigate("/")}>
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;