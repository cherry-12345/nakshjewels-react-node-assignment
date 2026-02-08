/**
 * Product Slice Tests
 * Tests Redux state management for products with async operations
 */

import productReducer, {
  loadProducts,
} from "../store/slices/productSlice";
import { fetchProducts } from "../../services/api";

// Mock the API service
jest.mock("../../services/api");

describe("Product Slice", () => {
  const initialState = {
    items: [],
    loading: false,
    error: null,
  };

  const mockProducts = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      image: "test1.jpg",
      description: "Test 1",
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      image: "test2.jpg",
      description: "Test 2",
    },
  ];

  describe("Reducer", () => {
    it("should return initial state", () => {
      expect(productReducer(undefined, { type: "unknown" })).toEqual(
        initialState
      );
    });

    describe("loadProducts.pending", () => {
      it("should set loading to true and clear error", () => {
        const action = { type: loadProducts.pending.type };
        const state = productReducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
      });
    });

    describe("loadProducts.fulfilled", () => {
      it("should set products and clear loading", () => {
        const action = {
          type: loadProducts.fulfilled.type,
          payload: mockProducts,
        };
        const state = productReducer(
          { ...initialState, loading: true },
          action
        );

        expect(state.loading).toBe(false);
        expect(state.items).toEqual(mockProducts);
        expect(state.items).toHaveLength(2);
      });
    });

    describe("loadProducts.rejected", () => {
      it("should set error and clear loading", () => {
        const errorMessage = "Failed to load products";
        const action = {
          type: loadProducts.rejected.type,
          payload: errorMessage,
        };
        const state = productReducer(
          { ...initialState, loading: true },
          action
        );

        expect(state.loading).toBe(false);
        expect(state.error).toBe(errorMessage);
      });

      it("should use default error message if none provided", () => {
        const action = {
          type: loadProducts.rejected.type,
          payload: undefined,
        };
        const state = productReducer(
          { ...initialState, loading: true },
          action
        );

        expect(state.error).toBe("Something went wrong");
      });
    });
  });

  describe("Async Thunk - loadProducts", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should successfully load products", async () => {
      fetchProducts.mockResolvedValue(mockProducts);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = loadProducts();
      await thunk(dispatch, getState, undefined);

      const [pending, fulfilled] = dispatch.mock.calls;

      expect(pending[0].type).toBe(loadProducts.pending.type);
      expect(fulfilled[0].type).toBe(loadProducts.fulfilled.type);
      expect(fulfilled[0].payload).toEqual(mockProducts);
    });

    it("should handle API error", async () => {
      const errorMessage = "Network error";
      fetchProducts.mockRejectedValue({
        response: { data: { error: errorMessage } },
      });

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = loadProducts();
      await thunk(dispatch, getState, undefined);

      const [pending, rejected] = dispatch.mock.calls;

      expect(pending[0].type).toBe(loadProducts.pending.type);
      expect(rejected[0].type).toBe(loadProducts.rejected.type);
      expect(rejected[0].payload).toBe(errorMessage);
    });

    it("should use fallback error message if API error has no message", async () => {
      fetchProducts.mockRejectedValue(new Error());

      const dispatch = jest.fn();
      const getState = jest.fn();

      const thunk = loadProducts();
      await thunk(dispatch, getState, undefined);

      const rejected = dispatch.mock.calls[1][0];

      expect(rejected.payload).toBe("Failed to load products");
    });
  });

  describe("State Transitions", () => {
    it("should handle complete loading cycle", () => {
      // Start with initial state
      let state = initialState;

      // Trigger loading
      state = productReducer(state, {
        type: loadProducts.pending.type,
      });
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);

      // Complete loading successfully
      state = productReducer(state, {
        type: loadProducts.fulfilled.type,
        payload: mockProducts,
      });
      expect(state.loading).toBe(false);
      expect(state.items).toEqual(mockProducts);
      expect(state.error).toBe(null);
    });

    it("should handle failed loading after successful load", () => {
      // Start with loaded products
      let state = {
        items: mockProducts,
        loading: false,
        error: null,
      };

      // Trigger reload
      state = productReducer(state, {
        type: loadProducts.pending.type,
      });
      expect(state.loading).toBe(true);
      expect(state.items).toEqual(mockProducts); // Items still there

      // Fail to load
      state = productReducer(state, {
        type: loadProducts.rejected.type,
        payload: "Network error",
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBe("Network error");
      expect(state.items).toEqual(mockProducts); // Items still preserved
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty product list", () => {
      const action = {
        type: loadProducts.fulfilled.type,
        payload: [],
      };
      const state = productReducer(initialState, action);

      expect(state.items).toEqual([]);
      expect(state.loading).toBe(false);
    });

    it("should clear previous error on new request", () => {
      const stateWithError = {
        ...initialState,
        error: "Previous error",
      };

      const state = productReducer(stateWithError, {
        type: loadProducts.pending.type,
      });

      expect(state.error).toBe(null);
    });

    it("should preserve items during loading", () => {
      const stateWithItems = {
        items: mockProducts,
        loading: false,
        error: null,
      };

      const state = productReducer(stateWithItems, {
        type: loadProducts.pending.type,
      });

      expect(state.items).toEqual(mockProducts);
      expect(state.loading).toBe(true);
    });
  });
});
