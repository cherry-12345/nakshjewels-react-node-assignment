const { validationResult } = require("express-validator");
const products = require("../data/products");

const addToCart = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }

  const { productId, quantity } = req.body;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      error: `Product with ID ${productId} not found`,
    });
  }

  res.json({
    success: true,
    message: "Item validated and added to cart",
    data: { productId, quantity },
  });
};

module.exports = { addToCart };
