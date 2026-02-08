const { body, param } = require("express-validator");

/**
 * Validation rules for adding items to cart
 * Handles edge cases: null, undefined, negative numbers, strings, floats, etc.
 */
const addToCartValidation = [
  body("productId")
    .exists({ checkFalsy: true })
    .withMessage("productId is required")
    .isInt({ min: 1 })
    .withMessage("productId must be a positive integer")
    .toInt(), // Convert string to int if valid
  body("quantity")
    .exists({ checkFalsy: true })
    .withMessage("quantity is required")
    .isInt({ min: 1, max: 99 })
    .withMessage("quantity must be an integer between 1 and 99")
    .toInt(), // Convert string to int if valid
];

/**
 * Validation rules for updating cart item quantity
 */
const updateCartValidation = [
  param("productId")
    .exists()
    .withMessage("productId parameter is required")
    .isInt({ min: 1 })
    .withMessage("productId must be a positive integer")
    .toInt(),
  body("quantity")
    .exists({ checkFalsy: true })
    .withMessage("quantity is required")
    .isInt({ min: 1, max: 99 })
    .withMessage("quantity must be an integer between 1 and 99")
    .toInt(),
];

/**
 * Validation rules for removing cart item
 */
const removeFromCartValidation = [
  param("productId")
    .exists()
    .withMessage("productId parameter is required")
    .isInt({ min: 1 })
    .withMessage("productId must be a positive integer")
    .toInt(),
];

module.exports = {
  addToCartValidation,
  updateCartValidation,
  removeFromCartValidation,
};
