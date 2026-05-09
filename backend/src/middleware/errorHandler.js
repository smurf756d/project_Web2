/**
 * Global error handler.
 * This keeps API error responses consistent.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message || "Internal server error",
    });
};

module.exports = errorHandler;