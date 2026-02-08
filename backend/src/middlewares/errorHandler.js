const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
