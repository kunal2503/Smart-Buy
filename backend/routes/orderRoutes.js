const express = require('express');
const verifyToken = require('../middlewares/verifyTokens');
const {placeOrder,getAllOrders} = require('../controllers/orderControllers');
const router = express.Router();

// Route to place a new order, protected by verifyToken middleware
router.post('/',verifyToken,placeOrder);
router.get("/",verifyToken,getAllOrders);

module.exports = router; 
