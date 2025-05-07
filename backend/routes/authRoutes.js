const express = require("express");
const { signupUser, loginUser, getProfile ,changePassword, forgotPassword, resetPassword } = require("../controllers/authControllers");
const verifyToken = require("../middlewares/verifyTokens");
const router = express.Router();


router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/change-password",verifyToken,changePassword);
router.get("/profile", verifyToken, getProfile);

// Routes for forget password flow
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
