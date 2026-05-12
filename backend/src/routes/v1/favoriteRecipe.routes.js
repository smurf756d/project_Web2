const express = require("express");

const {
  protect,
} = require("../../middleware/auth.middleware");

const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../../controllers/favoriteRecipe.controller");

const router = express.Router();

/**
 * @route   /api/v1/favorites
 */
router.get("/", protect, getFavorites);

/**
 * @route   /api/v1/favorites/:recipeId
 */
router
  .route("/:recipeId")
  .post(protect, addFavorite)
  .delete(protect, removeFavorite);

module.exports = router;