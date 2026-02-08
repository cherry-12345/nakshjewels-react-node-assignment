import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../services/api";

/**
 * Product Slice - Redux state management for products
 * Handles fetching products from backend API with loading/error states
 */

/**
 * Async thunk to load products from backend API
 * Uses Redux Toolkit's createAsyncThunk for automatic loading/error state management
 */
export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchProducts();
      return data;
    } catch (error) {
      // Extract error message from API response or use fallback
      return rejectWithValue(
        error.response?.data?.error || "Failed to load products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // Array of product objects
    loading: false, // Loading state for async operations
    error: null, // Error message if request fails
  },
  reducers: {
    // No synchronous actions needed for products
    // All state updates happen through async thunk
  },
  extraReducers: (builder) => {
    builder
      // When loadProducts starts
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // When loadProducts succeeds
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      // When loadProducts fails
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default productSlice.reducer;
