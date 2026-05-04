const express = require("express");
const router = express.Router();

const {
  generateRecipe,
  createRecipe,
  getRecipes,
} = require("../controllers/recipeController");

// routes
router.post("/generate", generateRecipe);
router.post("/", createRecipe);
router.get("/", getRecipes);

module.exports = router;