const validate = require("../middleware/validate");
const express = require("express");

const {
  protect,
} = require("../middleware/authenticate");

const {
  validateCreateRecipe,
} = require("../utils/validators");

const {
  createMyRecipe,
  getMyRecipes,
  updateMyRecipe,
  deleteMyRecipe,
} = require("../controllers/myRecipe.controller");

const router = express.Router();

/**
 * @route   /api/v1/my-recipes
 */
router
  .route("/")
  .get(protect, getMyRecipes)
  .post(
    protect,
    validate(validateCreateRecipe),
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