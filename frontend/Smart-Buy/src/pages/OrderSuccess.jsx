import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ color: "green" }}>🎉 Order Placed Successfully!</h1>
      <p>Thank you for your purchase. Your order has been confirmed and is being processed.</p>

      <Link to="/" style={{ marginTop: "20px", display: "inline-block", backgroundColor: "#007bff", color: "#fff", padding: "10px 20px", borderRadius: "5px", textDecoration: "none" }}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default OrderSuccess;
