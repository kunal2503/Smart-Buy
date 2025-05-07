const User = require("../models/user");
const Order = require("../models/orderModel");

/**
 * Get the current user's profile excluding password
 */
exports.getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error fetching user" });
  }
};

/**
 * Update the current user's profile and shipping info
 */
exports.updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, address, city, phoneNo, country, zip, state } = req.body;

    // Basic validation for required fields
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Update user basic info
    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        address: {
          address,
          city,
          state,
          zip,
          country,
          phoneNo,
        },
      },
      { new: true }
    );

    // Update shipping info in order
    await Order.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          shippingInfo: {
            address: address || "",
            city: city || "",
            state: state || "",
            zip: zip || "",
            country: country || "",
            phoneNo: phoneNo || "",
          },
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error updating user" });
  }
};

/**
 * Delete the current user's profile
 */
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error deleting user" });
  }
};
