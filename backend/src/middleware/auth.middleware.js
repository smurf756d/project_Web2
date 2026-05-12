const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * @desc Middleware to protect private routes using JWT authentication
 */
const protect = async (req, res, next) => {
  try {
    let token = null;

    // Token should be sent as: Authorization: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token provided",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach logged-in user to request object for next controllers
    req.user = await User.findById(decoded.id).select(
      "-password"
    );

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user no longer exists",
      });
    }

    next();
  } catch (error) {
    console.error(
      "JWT authentication failed:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
    });
  }
};

module.exports = {
  protect,
};