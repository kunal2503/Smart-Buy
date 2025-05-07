const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cartModel")

// getCart example
/**
 * Controller to get the user's cart with populated product details.
 * Issue: Previously, product details (name, price, image) were missing because
 * the productId field was not populated, resulting in only ObjectId references
 * being sent to the frontend. This caused frontend errors and missing product info.
 * 
 * Fix: Added Mongoose populate('cart.productId') to fetch full product details
 * along with the cart items, enabling the frontend to display complete product info.
 */
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.productId');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // Filter out cart items with null productId (invalid references)
    const validCartItems = user.cart.filter(item => item.productId !== null);

    console.log('Populated Cart Items:', validCartItems); // Added logging for diagnosis

    res.status(200).json({ cartItems: validCartItems });
  } catch (error) {
    console.error('Cart Fetch Error:', error);
    res.status(500).json({ message: 'Server error while fetching cart' });
  }
};

/**
 * Controller to add a product to the user's cart.
 * Validates productId presence and existence.
 * Increments quantity if product already in cart, else adds new item.
 * Returns updated cart on success.
 * Logs detailed errors for diagnosis.
 */
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    if (!productId) {
      return res.status(400).json({ message: "ProductId is required" });
    }

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure cart is an array
if (!Array.isArray(user.cart)) {
  user.cart = [];
}

    // Find if the product is already in the cart
    const itemIndex = user.cart.findIndex(
      (item) => item.productId?.toString() === productId
    );

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += quantity; // Add the specified quantity
    } else {
      user.cart.push({ productId, quantity }); // Add the product with the specified quantity
    }

    await user.save();
    res
      .status(200)
      .json({ message: "Cart updated successfully", cart: user.cart });
  } catch (err) {
    console.error("Add to Cart Error:", err.message, err.stack);
    res.status(500).json({ message: "Server error adding to cart" });
  }
};


/**
 * Controller to remove an item from the user's cart.
 * Issue: The remove item functionality was failing with 500 Internal Server Error.
 * Possible causes included missing or undefined productId in request body,
 * or cart items with null productId causing errors during comparison.
 * 
 * Fixes:
 * - Added logging of productId received in request and user's cart before removal.
 * - Added defensive check to ensure item.productId exists before calling toString().
 * - Added checks for user authentication and existence before proceeding.
 * - Improved error logging to include error message and stack trace.
 * 
 * These changes help diagnose and prevent errors during cart item removal.
 */
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log('Remove from cart productId:', productId);

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log('User cart before removal:', user.cart);

    const itemIndex = user.cart.findIndex(
      (item) => item.productId && item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      //item exists in cart, update quantity
      if (user.cart[itemIndex].quantity > 1) {
        user.cart[itemIndex].quantity -= 1;
      } else {
        user.cart.splice(itemIndex, 1);
      }
      await user.save();
      res
        .status(200)
        .json({ message: "item remove successfully ", cart: user.cart });
    } else {
      res.status(404).json({ message: "item not found in cart" });
    }
  } catch (error) {
    console.error("Remove Cart Error:", error.message, error.stack);
    res.status(500).json({ message: "Server Error" });
  }
};
