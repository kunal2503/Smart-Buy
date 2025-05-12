require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cart");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { default: orderModel } = require('./models/orderModel');



const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes)
app.use("/api/orders",orderRoutes )
app.use("/api/users/profile", profileRoutes);

// Connect MongoDB
// process.env.MONGO_URL
mongoose.connect("mongodb://localhost:27017/smart_Buy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error(err));



// Default route
app.get("/", (req, res) => {
    res.send("Hello from the server");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
