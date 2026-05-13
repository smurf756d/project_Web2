const express = require("express");
const router = express.Router();

const {
  generateRecipe,
  createRecipe,
  getRecipes,
  deleteRecipe,
} = require("../controllers/recipeController");

const validate = require("../middleware/validate");

const recipeValidator = (body) => {
  const errors = [];
  const { title, ingredients, steps } = body || {};

  if (!title || title.trim() === "") {
    errors.push("Recipe title is required");
  }

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    errors.push("At least one ingredient is required");
  }

  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    errors.push("Recipe steps are required");
  }

  return errors;
};

const generateRecipeValidator = (body) => {
  const errors = [];
  const { ingredients } = body || {};

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    errors.push("Please provide at least one ingredient to generate a recipe");
  }

  return errors;
};

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe management and generation endpoints
 */

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of recipes returned successfully
 */

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     responses:
 *       201:
 *         description: Recipe created successfully
 */

/**
 * @swagger
 * /api/recipes/generate:
 *   post:
 *     summary: Generate a recipe
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Recipe generated successfully
 */

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 */

router.post("/generate", validate(generateRecipeValidator), generateRecipe);

router.post("/", validate(recipeValidator), createRecipe);
router.get("/", getRecipes);
router.delete("/:id", deleteRecipe);

module.exports = router;