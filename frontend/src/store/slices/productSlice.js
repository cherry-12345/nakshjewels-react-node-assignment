import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../services/api";

export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchProducts();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to load products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default productSlice.reducer;
