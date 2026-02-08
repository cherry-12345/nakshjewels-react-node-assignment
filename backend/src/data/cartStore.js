/**
 * In-memory cart storage
 * Structure: { userId: { productId: quantity } }
 *
 * In a real application, this would be a database (MongoDB, Redis, etc.)
 * For this assignment, in-memory storage is explicitly allowed.
 */

const cartStorage = new Map();

/**
 * Get cart for a specific user
 * @param {string} userId - User identifier
 * @returns {Object} User's cart items
 */
const getCart = (userId) => {
  if (!cartStorage.has(userId)) {
    cartStorage.set(userId, {});
  }
  return cartStorage.get(userId);
};

/**
 * Add or update item in user's cart
 * @param {string} userId - User identifier
 * @param {number} productId - Product ID
 * @param {number} quantity - Item quantity
 * @returns {Object} Updated cart
 */
const addToCart = (userId, productId, quantity) => {
  const cart = getCart(userId);

  // If item exists, add to existing quantity (max 99)
  if (cart[productId]) {
    cart[productId] = Math.min(cart[productId] + quantity, 99);
  } else {
    cart[productId] = quantity;
  }

  cartStorage.set(userId, cart);
  return cart;
};

/**
 * Update item quantity in user's cart
 * @param {string} userId - User identifier
 * @param {number} productId - Product ID
 * @param {number} quantity - New quantity
 * @returns {Object} Updated cart
 */
const updateCartItem = (userId, productId, quantity) => {
  const cart = getCart(userId);

  if (!cart[productId]) {
    throw new Error(`Product ${productId} not found in cart`);
  }

  cart[productId] = quantity;
  cartStorage.set(userId, cart);
  return cart;
};

/**
 * Remove item from user's cart
 * @param {string} userId - User identifier
 * @param {number} productId - Product ID
 * @returns {Object} Updated cart
 */
const removeFromCart = (userId, productId) => {
  const cart = getCart(userId);

  if (!cart[productId]) {
    throw new Error(`Product ${productId} not found in cart`);
  }

  delete cart[productId];
  cartStorage.set(userId, cart);
  return cart;
};

/**
 * Clear entire cart for a user
 * @param {string} userId - User identifier
 * @returns {Object} Empty cart
 */
const clearCart = (userId) => {
  cartStorage.set(userId, {});
  return {};
};

/**
 * Get cart item count for a user
 * @param {string} userId - User identifier
 * @returns {number} Total item count
 */
const getCartCount = (userId) => {
  const cart = getCart(userId);
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartCount,
};
