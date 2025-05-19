const User = require("../models/user");
const Order = require("../models/orderModel");
const Product = require("../models/product");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email"); // fixed populate field from userID to user
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.manageProducts = async (req, res) => {
  try {
    const { productId, name, price, description, stock } = req.body;

    let product;
    if (productId) {
      // Update existing product
      product = await Product.findByIdAndUpdate(
        productId,
        { name, price, description, stock },
        { new: true }
      );
    } else {
      // Add new product
      product = new Product({ name, price, description, stock });
      await product.save();
    }

    res.json({ message: "Product saved successfully", product });
  } catch (err) {
    console.error("Error managing products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user role or block/unblock user
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, isBlocked } = req.body;
    const updateData = {};
    if (role) updateData.role = role;
    if (typeof isBlocked === "boolean") updateData.isBlocked = isBlocked;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Analytics: get sales and user stats
exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const salesAmount = totalSales[0] ? totalSales[0].total : 0;
    const totalProducts =  await Product.countDocuments();

    res.json({
      totalUsers,
      totalOrders,
      totalSales: salesAmount,
      totalProducts
    });
  } catch (err) {
    console.error("Error fetching analytics:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
