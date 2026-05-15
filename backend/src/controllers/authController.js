const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../services/authService");

/**
 * Test authentication route.
 */
const testAuth = (req, res) => {
  res.json({
    message: "Auth route works",
  });
};

/**
 * Register new user.
 */
const register = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      fullName: req.body.fullName || req.body.name,
    };

    const result = await registerUser(payload);

    res.status(201).json({
      success: true,
      message: result.message,
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login existing user.
 */
const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: result.message,
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Return logged-in user profile.
 */
const profile = async (req, res, next) => {
  try {
    const user = await getUserProfile(req.user._id);

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  testAuth,
  register,
  login,
  profile,
};