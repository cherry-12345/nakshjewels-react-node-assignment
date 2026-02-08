const { validationResult } = require("express-validator");
const products = require("../data/products");
const cartStore = require("../data/cartStore");
const { NotFoundError, BadRequestError } = require("../middlewares/errors");

/**
 * Helper function to handle validation errors
 * @param {Object} errors - Validation errors from express-validator
 * @param {Object} res - Express response object
 */
const handleValidationErrors = (errors, res) => {
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      error: "Validation failed",
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  return null;
};

/**
 * GET /api/cart
 * Get all items in user's cart with full product details
 */
const getCart = (req, res, next) => {
  try {
    // In a real app, userId would come from authentication token
    // For this assignment, we use a default user
    const userId = req.headers["x-user-id"] || "default-user";

    const cart = cartStore.getCart(userId);

    // Enrich cart with product details
    const cartWithDetails = Object.entries(cart).map(([productId, quantity]) => {
      const product = products.find((p) => p.id === parseInt(productId));
      return {
        ...product,
        quantity,
        subtotal: product.price * quantity,
      };
    });

    // Calculate cart totals
    const total = cartWithDetails.reduce((sum, item) => sum + item.subtotal, 0);
    const itemCount = cartStore.getCartCount(userId);

    res.json({
      success: true,
      data: {
        items: cartWithDetails,
        summary: {
          itemCount,
          total,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/cart
 * Add item to cart (or update quantity if item already exists)
 */
const addToCart = (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    const validationResponse = handleValidationErrors(errors, res);
    if (validationResponse) return validationResponse;

    const { productId, quantity } = req.body;
    const userId = req.headers["x-user-id"] || "default-user";

    // Verify product exists
    const product = products.find((p) => p.id === productId);
    if (!product) {
      throw new NotFoundError(`Product with ID ${productId} not found`);
    }

    // Add to cart
    cartStore.addToCart(userId, productId, quantity);

    res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
      data: {
        productId,
        quantity,
        itemCount: cartStore.getCartCount(userId),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/cart/:productId
 * Update quantity of specific cart item
 */
const updateCartItem = (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    const validationResponse = handleValidationErrors(errors, res);
    if (validationResponse) return validationResponse;

    const productId = parseInt(req.params.productId);
    const { quantity } = req.body;
    const userId = req.headers["x-user-id"] || "default-user";

    // Verify product exists in inventory
    const product = products.find((p) => p.id === productId);
    if (!product) {
      throw new NotFoundError(`Product with ID ${productId} not found`);
    }

    // Update cart item
    cartStore.updateCartItem(userId, productId, quantity);

    res.json({
      success: true,
      message: "Cart item updated successfully",
      data: {
        productId,
        quantity,
        itemCount: cartStore.getCartCount(userId),
      },
    });
  } catch (error) {
    // Handle cart-specific errors (item not in cart)
    if (error.message.includes("not found in cart")) {
      return next(new NotFoundError(error.message));
    }
    next(error);
  }
};

/**
 * DELETE /api/cart/:productId
 * Remove item from cart
 */
const removeFromCart = (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    const validationResponse = handleValidationErrors(errors, res);
    if (validationResponse) return validationResponse;

    const productId = parseInt(req.params.productId);
    const userId = req.headers["x-user-id"] || "default-user";

    // Remove from cart
    cartStore.removeFromCart(userId, productId);

    res.json({
      success: true,
      message: "Item removed from cart successfully",
      data: {
        productId,
        itemCount: cartStore.getCartCount(userId),
      },
    });
  } catch (error) {
    // Handle cart-specific errors (item not in cart)
    if (error.message.includes("not found in cart")) {
      return next(new NotFoundError(error.message));
    }
    next(error);
  }
};

/**
 * DELETE /api/cart
 * Clear entire cart
 */
const clearCart = (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"] || "default-user";

    cartStore.clearCart(userId);

    res.json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
