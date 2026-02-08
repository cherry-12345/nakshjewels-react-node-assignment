/**
 * Naksh Jewels E-Commerce API Server
 * Node.js + Express REST API for jewelry store
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const errorHandler = require("./src/middlewares/errorHandler");
const { NotFoundError } = require("./src/middlewares/errors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// 404 Handler - Must be after all other routes
app.use((req, res, next) => {
  next(new NotFoundError(`Route ${req.originalUrl} not found`));
});

// Global Error Handler - Must be last middleware
app.use(errorHandler);

// Start server only when not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`✓ Health check: http://localhost:${PORT}/health`);
  });
}

// Export app for testing
module.exports = app;
