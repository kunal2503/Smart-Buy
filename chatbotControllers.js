const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const { getAIResponse } = require("../utils/openAi");

exports.getMessage = async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ reply: "Invalid or missing user ID." });
    }

    const orders = await Order.find({
      user: new mongoose.Types.ObjectId(userId)
    })
      .sort({ createdAt: -1 })
      .limit(5);

    if (!orders || orders.length === 0) {
      return res.json({
        reply: "You have no recent orders in your account because we couldn’t find any linked to your ID."
      });
    }

    const context = orders
      .map((o, i) => `Order #${o._id} - ₹${o.totalAmount} - ${o.cartItems[0]?.status || 'Unknown'}`)
      .join("; ");

    const prompt = `User's order history: ${context}\n\nUser says: "${message}"`;

    const reply = await getAIResponse(prompt);

    res.json({ reply });

  } catch (error) {
    console.error("Chatbot error:", error.message);
    res.status(500).json({ reply: "Something went wrong while processing your request. Please try again later." });
  }
};
