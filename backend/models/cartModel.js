const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Add this to enable .populate()
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
