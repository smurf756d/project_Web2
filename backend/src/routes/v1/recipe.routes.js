const express = require("express");

const {
  getMyRecipes,
  createMyRecipe,
  updateMyRecipe,
  deleteMyRecipe,
} = require("../../controllers/myRecipe.controller");

const {
  protect,
} = require("../../middleware/auth.middleware");

const router = express.Router();

/**
 * @route GET /api/v1/my-recipes
 */
router.get("/", protect, getMyRecipes);

/**
 * @route POST /api/v1/my-recipes
 */
router.post("/", protect, createMyRecipe);

/**
 * @route PUT /api/v1/my-recipes/:id
 */
router.put("/:id", protect, updateMyRecipe);

/**
 * @route DELETE /api/v1/my-recipes/:id
 */
router.delete("/:id", protect, deleteMyRecipe);

module.exports = router;