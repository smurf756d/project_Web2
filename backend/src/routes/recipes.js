const express = require("express");
const router = express.Router();

const {
  generateRecipe,
  createRecipe,
  getRecipes,
  deleteRecipe,
} = require("../controllers/recipeController");

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

router.post("/generate", generateRecipe);
router.post("/", createRecipe);
router.get("/", getRecipes);
router.delete("/:id", deleteRecipe);

module.exports = router;