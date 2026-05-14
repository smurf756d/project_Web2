/**
 * Global error handler.
 * MUST be last middleware!
 * Catches all errors and returns JSON responses
 */
const errorHandler = (err, req, res, next) => {
  // Skip if headers already sent
  if (res.headersSent) {
    console.error("[errorHandler] Headers already sent, cannot send error response");
    return;
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.error("❌ ERROR HANDLER CAUGHT:");
  console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.error("Method:", req.method);
  console.error("URL:", req.originalUrl);
  console.error("Status:", statusCode);
  console.error("Message:", message);
  console.error("Error Name:", err.name);
  if (process.env.NODE_ENV === 'development') {
    console.error("Stack:", err.stack);
  }
  console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  // Force JSON response - CRITICAL!
  res.setHeader('Content-Type', 'application/json');
  
  res.status(statusCode).json({
    success: false,
    message: message,
    errorCode: err.code,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
