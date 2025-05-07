const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts,singleProduct } = require('../controllers/productControllers');
const verifyToken = require('../middlewares/verifyTokens');
const authenticate = require("../middlewares/authenticate")



router.post("/add-products",verifyToken, addProduct);
router.get("/all-products",  getAllProducts);
router.get("/", getAllProducts); // Added route to handle GET /api/products/
router.get("/:id", singleProduct); // Added route to handle GET /api/products/:id

module.exports = router;
