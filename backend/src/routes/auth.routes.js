const express = require("express");

const {
  register,
  login,
} = require("../controllers/auth.controller");

const router = express.Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login existing user
 * @access  Public
 */
router.post("/login", login);

module.exports = router;