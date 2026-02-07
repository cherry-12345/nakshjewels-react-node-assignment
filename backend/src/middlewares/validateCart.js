const { body } = require("express-validator");

const cartValidationRules = [
  body("productId")
    .exists({ checkFalsy: true })
    .withMessage("productId is required")
    .isInt({ min: 1 })
    .withMessage("productId must be a positive integer"),
  body("quantity")
    .exists({ checkFalsy: true })
    .withMessage("quantity is required")
    .isInt({ min: 1, max: 99 })
    .withMessage("quantity must be an integer between 1 and 99"),
];

module.exports = { cartValidationRules };
