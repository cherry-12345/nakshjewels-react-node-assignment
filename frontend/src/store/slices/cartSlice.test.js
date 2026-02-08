/**
 * Cart Slice Tests
 * Tests Redux state management for shopping cart
 */

import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  selectCartItems,
  selectCartSummary,
} from "../store/slices/cartSlice";

describe("Cart Slice", () => {
  const initialState = {
    items: [],
  };

  const mockProduct = {
    id: 1,
    name: "Test Product",
    price: 100,
    image: "test.jpg",
    description: "Test description",
  };

  describe("Reducer", () => {
    it("should return initial state", () => {
      expect(cartReducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    describe("addToCart", () => {
      it("should add new item to empty cart", () => {
        const state = cartReducer(initialState, addToCart(mockProduct));

        expect(state.items).toHaveLength(1);
        expect(state.items[0].id).toBe(1);
        expect(state.items[0].quantity).toBe(1);
      });

      it("should increment quantity for existing item", () => {
        const stateWithItem = {
          items: [{ ...mockProduct, quantity: 1 }],
        };

        const state = cartReducer(stateWithItem, addToCart(mockProduct));

        expect(state.items).toHaveLength(1);
        expect(state.items[0].quantity).toBe(2);
      });

      it("should not exceed max quantity of 99", () => {
        const stateWithMaxItem = {
          items: [{ ...mockProduct, quantity: 99 }],
        };

        const state = cartReducer(stateWithMaxItem, addToCart(mockProduct));

        expect(state.items[0].quantity).toBe(99);
      });
    });

    describe("removeFromCart", () => {
      it("should remove item from cart", () => {
        const stateWithItem = {
          items: [{ ...mockProduct, quantity: 2 }],
        };

        const state = cartReducer(stateWithItem, removeFromCart(1));

        expect(state.items).toHaveLength(0);
      });

      it("should not affect other items", () => {
        const stateWithItems = {
          items: [
            { ...mockProduct, quantity: 1 },
            { ...mockProduct, id: 2, quantity: 1 },
          ],
        };

        const state = cartReducer(stateWithItems, removeFromCart(1));

        expect(state.items).toHaveLength(1);
        expect(state.items[0].id).toBe(2);
      });
    });

    describe("updateQuantity", () => {
      it("should update item quantity", () => {
        const stateWithItem = {
          items: [{ ...mockProduct, quantity: 1 }],
        };

        const state = cartReducer(
          stateWithItem,
          updateQuantity({ id: 1, quantity: 5 })
        );

        expect(state.items[0].quantity).toBe(5);
      });

      it("should not update with invalid quantity (< 1)", () => {
        const stateWithItem = {
          items: [{ ...mockProduct, quantity: 5 }],
        };

        const state = cartReducer(
          stateWithItem,
          updateQuantity({ id: 1, quantity: 0 })
        );

        expect(state.items[0].quantity).toBe(5);
      });

      it("should not update with invalid quantity (> 99)", () => {
        const stateWithItem = {
          items: [{ ...mockProduct, quantity: 5 }],
        };

        const state = cartReducer(
          stateWithItem,
          updateQuantity({ id: 1, quantity: 100 })
        );

        expect(state.items[0].quantity).toBe(5);
      });

      it("should not affect non-existent item", () => {
        const stateWithItem = {
          items: [{ ...mockProduct, quantity: 5 }],
        };

        const state = cartReducer(
          stateWithItem,
          updateQuantity({ id: 999, quantity: 10 })
        );

        expect(state.items[0].quantity).toBe(5);
      });
    });
  });

  describe("Selectors", () => {
    const mockState = {
      cart: {
        items: [
          { ...mockProduct, id: 1, price: 100, quantity: 2 },
          { ...mockProduct, id: 2, price: 200, quantity: 1 },
        ],
      },
    };

    describe("selectCartItems", () => {
      it("should select cart items", () => {
        const items = selectCartItems(mockState);

        expect(items).toHaveLength(2);
        expect(items[0].id).toBe(1);
      });
    });

    describe("selectCartSummary", () => {
      it("should calculate correct item count", () => {
        const summary = selectCartSummary(mockState);

        expect(summary.itemCount).toBe(3); // 2 + 1
      });

      it("should calculate correct total", () => {
        const summary = selectCartSummary(mockState);

        expect(summary.total).toBe(400); // (100 * 2) + (200 * 1)
      });

      it("should return zero for empty cart", () => {
        const emptyState = { cart: { items: [] } };
        const summary = selectCartSummary(emptyState);

        expect(summary.itemCount).toBe(0);
        expect(summary.total).toBe(0);
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle adding same item multiple times", () => {
      let state = initialState;

      state = cartReducer(state, addToCart(mockProduct));
      state = cartReducer(state, addToCart(mockProduct));
      state = cartReducer(state, addToCart(mockProduct));

      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(3);
    });

    it("should handle removing non-existent item", () => {
      const stateWithItem = {
        items: [{ ...mockProduct, quantity: 1 }],
      };

      const state = cartReducer(stateWithItem, removeFromCart(999));

      expect(state.items).toHaveLength(1);
    });

    it("should handle quantity boundaries correctly", () => {
      const stateWithItem = {
        items: [{ ...mockProduct, quantity: 98 }],
      };

      // Should increment to 99
      let state = cartReducer(stateWithItem, addToCart(mockProduct));
      expect(state.items[0].quantity).toBe(99);

      // Should stay at 99
      state = cartReducer(state, addToCart(mockProduct));
      expect(state.items[0].quantity).toBe(99);
    });
  });
});
