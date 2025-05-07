const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyTokens");
const { getUser, updateUser , deleteUser} = require("../controllers/profileController");

router.get("/:id", verifyToken, getUser); // Added route to handle GET /api/profile/:id
router.put("/:id", verifyToken, updateUser); // Added route to handle PUT /api/profile/:id
router.delete("/:id", verifyToken, deleteUser); // Added route to handle DELETE /api/profile/:id

module.exports = router;
