const products = require("../data/products");

const getAllProducts = (req, res) => {
  res.json({
    success: true,
    data: products,
  });
};

module.exports = { getAllProducts };
