const { validationResult } = require("express-validator");
const products = require("../data/products");

const addToCart = (req, res, next) => {
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
    const error = new Error(`Product with ID ${productId} not found`);
    error.statusCode = 404;
    return next(error);
  }

  res.json({
    success: true,
    message: "Item validated",
    data: { productId, quantity },
  });
};

module.exports = { addToCart };
