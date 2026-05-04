const express = require("express");
const router = express.Router();

const {
  generateRecipe,
  createRecipe,
  getRecipes,
  deleteRecipe,
} = require("../controllers/recipeController");

// routes
router.post("/generate", generateRecipe);
router.post("/", createRecipe);
router.get("/", getRecipes);
router.delete("/:id",deleteRecipe);

module.exports = router;