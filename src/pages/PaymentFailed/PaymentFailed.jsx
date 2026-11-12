import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { XCircle, RefreshCw } from "lucide-react";
import "./PaymentFailed.css";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { reason, canFallbackToCod } = location.state || {};

  return (
    <div className="payment-failed-page">
      <div className="payment-failed-card">
        <div className="failed-icon">
          <XCircle size={65} color="#b91c1c" />
        </div>

        <h2>Payment Not Completed</h2>

        <p style={{ margin: "14px 0 20px", color: "#555", lineHeight: "1.6" }}>
          {reason ||
            "Sorry, your transaction could not be processed. Please try again or choose another payment method."}
        </p>

        {canFallbackToCod && (
          <div
            style={{
              background: "#fef3c7",
              border: "1px solid #fcd34d",
              color: "#92400e",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "13.5px",
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            <strong>Recommended:</strong> You can place this order safely using{" "}
            <strong>Cash on Delivery (COD)</strong> without any online gateway.
          </div>
        )}

        <button
          onClick={() => navigate("/checkout")}
          style={{
            background: "#6b1a1a",
            color: "#faf5eb",
            border: "none",
            padding: "13px 24px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          {canFallbackToCod ? "SWITCH TO CASH ON DELIVERY" : "TRY AGAIN"}
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
