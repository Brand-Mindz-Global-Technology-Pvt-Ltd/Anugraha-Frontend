import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import "./PaymentFailed.css";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-failed-page">
      <div className="payment-failed-card">
        <div className="failed-icon">
          <XCircle size={65} />
        </div>

        <h2>Payment Failed!</h2>

        <p>
          Sorry, your payment could not be completed.
          Please try again or choose another payment method.
        </p>

        <span className="failed-note">
          Don't worry! You can try again.
        </span>

        <button onClick={() => navigate("/checkout")}>
          TRY AGAIN
        </button>

        <button
          className="failed-home-btn"
          onClick={() => navigate("/")}
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;