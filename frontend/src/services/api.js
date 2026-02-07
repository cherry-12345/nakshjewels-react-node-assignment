import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data.data;
};

export const postCartItem = async (productId, quantity) => {
  const response = await api.post("/cart", { productId, quantity });
  return response.data;
};

export default api;
