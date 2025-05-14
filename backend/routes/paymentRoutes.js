const express = require('express');
const router = express.Router();
const {createOrder,verify} = require("../controllers/paymentControllers");

router.post("/razorpay", createOrder); // Changed route to match frontend API call
router.post("/verify", verify);

module.exports= router;