import { createSlice } from "@reduxjs/toolkit";

/**
 * Cart Slice - Redux state management for shopping cart
 * Handles adding, removing, and updating cart items in client-side state
 *
 * Note: Cart state is managed on the frontend for this assignment.
 * In a production app, cart would be synced with backend API.
 */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array of cart items: { ...product, quantity }
  },
  reducers: {
    /**
     * Add product to cart
     * If product already exists, increment quantity (max 99)
     * Otherwise, add new item with quantity 1
     */
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        // Increment quantity but don't exceed 99
        existing.quantity = Math.min(existing.quantity + 1, 99);
      } else {
        // Add new item to cart
        state.items.push({ ...product, quantity: 1 });
      }
    },

    /**
     * Remove product from cart by ID
     */
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },

    /**
     * Update quantity of existing cart item
     * Quantity must be between 1 and 99
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      // Only update if item exists and quantity is valid
      if (item && quantity >= 1 && quantity <= 99) {
        item.quantity = quantity;
      }
    },
  },
});

// Export actions for use in components
export const { addToCart, removeFromCart, updateQuantity } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;

/**
 * Selector to get cart totals
 * Returns: { itemCount: number, total: number }
 */
export const selectCartSummary = (state) => {
  const items = state.cart.items;
  return {
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
};

export default cartSlice.reducer;
