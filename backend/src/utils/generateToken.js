const jwt = require("jsonwebtoken");

/**
 * Generates JWT token for authenticated users.
 * The token contains user identity and role information.
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

module.exports = generateToken;