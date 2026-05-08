const express = require("express");
const router = express.Router();

const validateGenerateRecipe = require("../middlewares/validateGenerateRecipe");

const {
  generateRecipe,
  createRecipe,
  getRecipes,
  deleteRecipe,
} = require("../controllers/generateRecipeController");

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe generation and saved recipes management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GenerateRecipeRequest:
 *       type: object
 *       required:
 *         - ingredients
 *         - diet
 *         - cookingTime
 *         - cuisine
 *       properties:
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           example: ["tomato", "potato", "onion"]
 *         diet:
 *           type: string
 *           example: Healthy
 *         cookingTime:
 *           type: string
 *           example: 0 - 30 mins
 *         cuisine:
 *           type: string
 *           example: Arabic
 *
 *     Recipe:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Arabic Tomato Recipe
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           example: ["tomato", "potato"]
 *         steps:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Wash ingredients", "Cook ingredients", "Serve warm"]
 *         cookingTime:
 *           type: string
 *           example: 0 - 30 mins
 *         calories:
 *           type: string
 *           example: 400 kcal
 *         diet:
 *           type: string
 *           example: Healthy
 *         cuisine:
 *           type: string
 *           example: Arabic
 */

/**
 * @swagger
 * /api/recipes/generate:
 *   post:
 *     summary: Generate a recipe based on ingredients and preferences
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenerateRecipeRequest'
 *     responses:
 *       200:
 *         description: Recipe generated successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */

//Generate recipe endpoint
router.post("/generate", validateGenerateRecipe, generateRecipe);

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Save a generated recipe
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       201:
 *         description: Recipe saved successfully
 *       400:
 *         description: Invalid recipe data
 *       500:
 *         description: Internal server error
 */
router.post("/", createRecipe);

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all saved recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of saved recipes
 *       500:
 *         description: Internal server error
 */
router.get("/", getRecipes);

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     summary: Delete a recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB recipe id
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteRecipe);

module.exports = router;