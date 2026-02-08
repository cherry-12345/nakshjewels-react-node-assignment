const express = require("express");
const router = express.Router();
const { addToCart } = require("../controllers/cartController");
const { addToCartValidation } = require("../middlewares/validateCart");

// POST /api/cart - Add item to cart
router.post("/", addToCartValidation, addToCart);

module.exports = router;
