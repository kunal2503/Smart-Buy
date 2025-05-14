const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/orderModel");

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// Create order controller - creates Razorpay order and saves order in DB
exports.createOrder = async (req, res) => {
  const { cartItems, shippingInfo, paymentMethod, userID, totalAmount } = req.body;

  const options = {
    amount: totalAmount * 100, // amount in paise
    currency: "INR",
    receipt: `receipt_${+Date.now()}`,
  };

  try {
    const razorpayOrder = await instance.orders.create(options);

    const order = await Order.create({
      user: userID,
      shippingInfo,
      paymentMethod,
      cartItems,
      totalAmount,
      razorpay: {
        orderId: razorpayOrder.id,
      },
      isPaid: false,
    });

    res.status(200).json({ razorpayOrder, orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order creation failed" });
  }
};

// Verify payment controller - verifies Razorpay payment signature and updates order status
exports.verify = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  console.log("Received verification data:", { razorpay_order_id, razorpay_payment_id, razorpay_signature });

  // Use createHmac for signature verification with secret key
  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  console.log("Expected signature:", expectedSignature);

  if (expectedSignature !== razorpay_signature) {
    console.error("Signature mismatch: expected", expectedSignature, "but got", razorpay_signature);
    return res
      .status(400)
      .json({ success: false, message: "Payment verification failed" });
  }

  try {
    const order = await Order.findOneAndUpdate(
      { "razorpay.orderId": razorpay_order_id },
      {
        isPaid: true,
        paidAt: new Date(),
        razorpay: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
        },
      },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Payment verified", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Order update failed" });
  }
};
