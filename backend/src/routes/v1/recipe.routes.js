const express = require("express");

const { protect } = require("../../middleware/auth.middleware");

const router = express.Router();

/**
 * @route   GET /api/v1/recipes
 * @desc    Get all recipes for logged-in user
 * @access  Private
 */
router.get("/", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected recipes route accessed",
    user: req.user,
  });
});

module.exports = router;