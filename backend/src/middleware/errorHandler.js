/**
 * @desc Global error handling middleware
 * Handles application errors and returns
 * consistent API responses
 */
const errorHandler = (
  err,
  req,
  res,
  next
) => {
  /**
   * Log server error for debugging
   */
  console.error(
    "Server Error:",
    err.message
  );

  /**
   * Use provided status code
   * or default to 500
   */
  const statusCode =
    err.statusCode || 500;

  /**
   * Return standardized error response
   */
  res.status(statusCode).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
};

module.exports = errorHandler;