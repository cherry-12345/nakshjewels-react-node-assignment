const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const {
  addToCartValidation,
  updateCartValidation,
  removeFromCartValidation,
} = require("../middlewares/validateCart");

/**
 * Cart Routes
 * All routes support multi-user via x-user-id header (for demo purposes)
 */

// GET /api/cart - Get all cart items with details
router.get("/", getCart);

// POST /api/cart - Add item to cart
router.post("/", addToCartValidation, addToCart);

// PUT /api/cart/:productId - Update cart item quantity
router.put("/:productId", updateCartValidation, updateCartItem);

// DELETE /api/cart/:productId - Remove specific item from cart
router.delete("/:productId", removeFromCartValidation, removeFromCart);

// DELETE /api/cart - Clear entire cart
router.delete("/", clearCart);

module.exports = router;
