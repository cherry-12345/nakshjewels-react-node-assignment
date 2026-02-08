const products = require("../data/products");
const { NotFoundError } = require("../middlewares/errors");

/**
 * GET /api/products
 * Get all products with optional filtering
 */
const getAllProducts = (req, res, next) => {
  try {
    // Optional: Add query parameter filtering (e.g., ?minPrice=1000&maxPrice=50000)
    const { minPrice, maxPrice } = req.query;

    let filteredProducts = products;

    // Apply price filters if provided
    if (minPrice || maxPrice) {
      filteredProducts = products.filter((product) => {
        const meetsMin = !minPrice || product.price >= parseInt(minPrice);
        const meetsMax = !maxPrice || product.price <= parseInt(maxPrice);
        return meetsMin && meetsMax;
      });
    }

    res.json({
      success: true,
      count: filteredProducts.length,
      data: filteredProducts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/products/:id
 * Get single product by ID
 */
const getProductById = (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);

    // Validate product ID
    if (isNaN(productId) || productId < 1) {
      throw new NotFoundError("Invalid product ID");
    }

    const product = products.find((p) => p.id === productId);

    if (!product) {
      throw new NotFoundError(`Product with ID ${productId} not found`);
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
