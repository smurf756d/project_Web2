const express = require("express");
const router = express.Router();

const validate = require("../middleware/validate");

const {
    validateGenerateRecipe,
} = require("../utils/validators");

const {
  generateRecipe,
  refineRecipe,
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  patchRecipe,
  deleteRecipe,
  deleteAllRecipes,
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
 *     Recipe:
 *       type: object
 *       required:
 *         - title
 *         - ingredients
 *         - steps
 *         - cookingTime
 *         - calories
 *         - diet
 *         - cuisine
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
 */
router.post(
    "/generate",
    validate(validateGenerateRecipe),
    generateRecipe
);

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
 */

/**
 * @swagger
 * /api/recipes/refine:
 *   post:
 *     summary: Refine a generated recipe based on user feedback
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipe
 *               - userMessage
 *             properties:
 *               recipe:
 *                 $ref: '#/components/schemas/Recipe'
 *               userMessage:
 *                 type: string
 *                 example: "I do not have rice, replace it with pasta"
 *     responses:
 *       200:
 *         description: Recipe refined successfully
 *       400:
 *         description: Invalid refine request
 */
router.post("/refine", refineRecipe);

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
 */
router.get("/", getRecipes);

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get recipe by id
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
 *         description: Recipe found
 *       404:
 *         description: Recipe not found
 */
router.get("/:id", getRecipeById);

/**
 * @swagger
 * /api/recipes/{id}:
 *   put:
 *     summary: Update full recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB recipe id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *       404:
 *         description: Recipe not found
 */
router.put("/:id", updateRecipe);

/**
 * @swagger
 * /api/recipes/{id}:
 *   patch:
 *     summary: Update selected recipe fields by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB recipe id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               calories: "350 kcal"
 *     responses:
 *       200:
 *         description: Recipe partially updated successfully
 *       404:
 *         description: Recipe not found
 */
router.patch("/:id", patchRecipe);

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
 */
router.delete("/:id", deleteRecipe);

/**
 * @swagger
 * /api/recipes:
 *   delete:
 *     summary: Delete all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: All recipes deleted successfully
 */
router.delete("/", deleteAllRecipes);

module.exports = router;