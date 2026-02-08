/**
 * Custom Error Classes for better error handling and consistency
 */

/**
 * Base Application Error
 * All custom errors extend this class
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguishes operational errors from bugs
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 400 Bad Request - Invalid input from client
 */
class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

/**
 * 404 Not Found - Resource doesn't exist
 */
class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

/**
 * 422 Unprocessable Entity - Validation failed
 */
class ValidationError extends AppError {
  constructor(message = "Validation failed", errors = []) {
    super(message, 422);
    this.errors = errors;
  }
}

/**
 * 500 Internal Server Error - Unexpected errors
 */
class InternalServerError extends AppError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

module.exports = {
  AppError,
  BadRequestError,
  NotFoundError,
  ValidationError,
  InternalServerError,
};
