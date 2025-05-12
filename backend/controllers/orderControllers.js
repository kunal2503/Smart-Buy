const Order = require("../models/orderModel");
const User = require("../models/user");

/**
 * Controller to place a new order.
 *
 * Issue fixed: Previously, order placement failed due to paymentMethod enum mismatch
 * between frontend options and backend schema. Updated backend schema to include all
 * frontend payment methods to fix validation error on save.
 */
/**
 * Controller to place a new order.
 *
 * Issue fixed: Previously, order placement failed due to paymentMethod enum mismatch
 * between frontend options and backend schema. Updated backend schema to include all
 * frontend payment methods to fix validation error on save.
 *
 * Added clearing of user's cart after successful order placement to fix issue where
 * cart items were not cleared after order submission.
 */

exports.getAllOrders = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from the authenticated request
    const orders = await Order.find({ user: userId }) // Find orders for the authenticated user
      .populate("user", "name email") // Populate user details
      .populate("cartItems.productId", "name price image") // Populate product details in cart items
      .exec(); // Execute the query

    res.status(200).json(orders); // Send the orders as a response
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
};
exports.placeOrder = async (req, res) => {
  try {
    const { shippingInfo, paymentMethod, cartItems, totalPrice } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Create the order using shippingInfo from request body
    const newOrder = new Order({
      user: userId,
      shippingInfo: {
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zip: shippingInfo.zip,
        country: shippingInfo.country,
        phoneNo: shippingInfo.phoneNo || "", // optional phoneNo
      },
      paymentMethod,
      cartItems,
      totalAmount: totalPrice,
    });

    await newOrder.save();

    // Remove only ordered items from the user's cart using productId comparison
    if (cartItems?.length) {
      user.cart = user.cart.filter(
        (cartItem) => !cartItems.some((orderedItem) => String(orderedItem.productId) === String(cartItem.productId))
      );
      await user.save();
    }

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order." });
  }
};
