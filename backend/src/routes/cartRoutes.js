const express = require("express");
const router = express.Router();
const { addToCart } = require("../controllers/cartController");
const { cartValidationRules } = require("../middlewares/validateCart");

// POST /api/cart — validate and accept cart item
router.post("/", cartValidationRules, addToCart);

module.exports = router;
