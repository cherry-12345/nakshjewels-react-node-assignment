/**
 * Centralized Error Handler Middleware
 * Handles all errors thrown in the application and sends consistent responses
 *
 * Error Response Format:
 * {
 *   success: false,
 *   error: string,
 *   errors: array (for validation errors),
 *   stack: string (only in development)
 * }
 */
const errorHandler = (err, req, res, _next) => {
  // Default to 500 Internal Server Error if no status code is set
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  // Log error for debugging (in production, use proper logging service)
  if (!isProduction) {
    console.error("Error:", err);
  }

  // Construct error response
  const errorResponse = {
    success: false,
    error: err.message || "Internal Server Error",
  };

  // Include validation errors if present (from ValidationError class)
  if (err.errors && Array.isArray(err.errors)) {
    errorResponse.errors = err.errors;
  }

  // Include stack trace only in development for debugging
  if (!isProduction && err.stack) {
    errorResponse.stack = err.stack;
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
