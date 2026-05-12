const express = require("express");

const {
  protect,
} = require("../../middleware/auth.middleware");

const {
  validateCreateRecipe,
} = require("../../validators/myRecipe.validator");

const {
  createMyRecipe,
  getMyRecipes,
  updateMyRecipe,
  deleteMyRecipe,
} = require("../../controllers/myRecipe.controller");

const router = express.Router();

/**
 * @route   /api/v1/my-recipes
 */
router
  .route("/")
  .get(protect, getMyRecipes)
  .post(
    protect,
    validateCreateRecipe,
    createMyRecipe
  );

/**
 * @route   /api/v1/my-recipes/:id
 */
router
  .route("/:id")
  .put(protect, updateMyRecipe)
  .delete(protect, deleteMyRecipe);

module.exports = router;