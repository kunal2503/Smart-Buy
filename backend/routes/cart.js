const express = require("express");
const Cart = require("../models/cartModel");
const verifyToken = require("../middlewares/verifyTokens");
const { addToCart, getCart, removeFromCart } = require("../controllers/cartControllers");

const router = express.Router();

router.get('/', verifyToken, getCart);
router.post('/add-to-cart', verifyToken, addToCart);
router.put('/remove-to-cart', verifyToken, removeFromCart);

module.exports = router;
