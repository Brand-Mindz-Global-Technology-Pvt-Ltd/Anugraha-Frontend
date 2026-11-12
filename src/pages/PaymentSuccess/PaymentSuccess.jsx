import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderData = location.state || {};
  const { orderId, totalAmount, paymentMethod, customerName } = orderData;

  return (
    <div className="payment-success-page">
      <div className="payment-success-card">
        <div className="success-icon">
          <CheckCircle size={65} color="#15803d" />
        </div>

        <h2>Order Confirmed!</h2>

        <p style={{ margin: "10px 0 18px", color: "#444", lineHeight: "1.6" }}>
          {customerName ? `Thank you, ${customerName}! ` : "Thank you! "}
          Your jewellery order has been placed and is being prepared with utmost care.
        </p>

        {orderId && (
          <div
            style={{
              background: "#faf6ed",
              border: "1px solid rgba(197, 160, 89, 0.35)",
              borderRadius: "10px",
              padding: "16px 20px",
              margin: "16px 0 24px",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "#666" }}>Order ID:</span>
              <strong style={{ fontSize: "14px", color: "#1c1b18", letterSpacing: "0.5px" }}>
                {orderId}
              </strong>
            </div>

            {totalAmount && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: "#666" }}>Total Payable:</span>
                <strong style={{ fontSize: "15px", color: "#8b642f" }}>
                  ₹{Number(totalAmount).toLocaleString("en-IN")}
                </strong>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "13px", color: "#666" }}>Payment Mode:</span>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#1c1b18" }}>
                {paymentMethod || "Cash on Delivery"}
              </span>
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={() => navigate("/profile")}
            style={{
              background: "#6b1a1a",
              color: "#faf5eb",
              border: "none",
              padding: "13px 24px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            VIEW IN MY PROFILE <ArrowRight size={16} />
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              background: "transparent",
              color: "#33251f",
              border: "1px solid #dfd7cb",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "13.5px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
