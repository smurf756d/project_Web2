const express = require("express");
const { protect } = require("../../middleware/auth.middleware");

const {
  createMyRecipe,
  getMyRecipes,
  updateMyRecipe,
  deleteMyRecipe,
} = require("../../controllers/myRecipe.controller");

const router = express.Router();

router
  .route("/")
  .get(protect, getMyRecipes)
  .post(protect, createMyRecipe);

router
  .route("/:id")
  .put(protect, updateMyRecipe)
  .delete(protect, deleteMyRecipe);

module.exports = router;