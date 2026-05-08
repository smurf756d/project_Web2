const express = require("express");
const { protect } = require("../../middleware/auth.middleware");

const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../../controllers/favoriteRecipe.controller");

const router = express.Router();

router.get("/", protect, getFavorites);

router
  .route("/:recipeId")
  .post(protect, addFavorite)
  .delete(protect, removeFavorite);

module.exports = router;