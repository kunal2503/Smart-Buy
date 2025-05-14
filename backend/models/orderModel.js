const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shippingInfo: {
    address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
      phoneNo: { type: String, required: true },
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      imageUrl:String,
      name: String,
      quantity: Number,
      price: Number,
      status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
      },
    },
  ],
  totalAmount: Number,
  paymentMethod: {
    type: String,
    // Updated enum to include all payment methods used in frontend to fix order save failure due to enum validation error
    enum: ['COD', 'Stripe', 'CreditCard', 'DebitCard', 'PayPal', 'NetBanking', 'UPI', 'Wallet', 'EMI'],
    default: 'COD',
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
  paidAt: Date,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
