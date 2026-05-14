const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * @desc Authentication middleware
 * Verifies JWT token and attaches
 * the logged-in user to request object
 */
const protect = async (
  req,
  res,
  next
) => {
  try {
    let token = null;

    /**
     * Token should be sent as:
     * Authorization: Bearer <token>
     */
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      token =
        req.headers.authorization
          .split(" ")[1]
          .replace(/"/g, "");
    }

    /**
     * Validate token existence
     */
    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Not authorized, no token provided",
      });
    }

    /**
     * Verify JWT token
     */
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    /**
     * Find logged-in user
     */
    const user =
      await User.findById(
        decoded.id
      ).select("-password");

    /**
     * Validate existing user
     */
    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "User not found",
      });
    }

    /**
     * Attach user to request object
     */
    req.user = user;

    next();
  } catch (error) {
    console.error(
      "JWT authentication failed:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired token",
    });
  }
};

module.exports = {
  protect,
};