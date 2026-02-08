const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById } = require("../controllers/productController");

/**
 * Product Routes
 */

// GET /api/products - Get all products (supports optional query params: minPrice, maxPrice)
router.get("/", getAllProducts);

// GET /api/products/:id - Get single product by ID
router.get("/:id", getProductById);

module.exports = router;
