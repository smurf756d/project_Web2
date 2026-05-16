const express = require("express");
const router = express.Router();

const validate = require("../middleware/validate");
const { validateGenerateRecipe } = require("../utils/validators");
const authenticate  = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Optional authentication middleware - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return next();
    }

    const token = authHeader.split(" ")[1].replace(/"/g, "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-passwordHash");

    if (user) {
      req.user = user;
    }
    
    next();
  } catch (error) {
    // Silently fail - authentication is optional
    next();
  }
};

const {
  generateRecipe,
  refineRecipe,
  createRecipe,
  getRecipes,
  getMyRecipes,
  getRecipeById,
  updateRecipe,
  patchRecipe,
  deleteRecipe,
  deleteAllRecipes,
} = require("../controllers/generateRecipeController");

// Logging middleware for this router
router.use((req, res, next) => {
  console.log(`\n🔵 RECIPE ROUTER: ${req.method} ${req.originalUrl}`);
  next();
});

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
 * /api/v1/recipes/generate:
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
 *         description: Invalid request parameters
 */
router.post("/generate", optionalAuth, validate(validateGenerateRecipe), generateRecipe);

/**
 * @swagger
 * /api/v1/recipes/refine:
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
 *               - feedback
 *             properties:
 *               recipe:
 *                 type: object
 *                 description: The generated recipe to refine
 *               feedback:
 *                 type: string
 *                 description: User feedback for refinement
 *                 example: "Add more vegetables and reduce salt"
 *     responses:
 *       200:
 *         description: Recipe refined successfully
 */
router.post("/refine", refineRecipe);

/**
 * @swagger
 * /api/v1/recipes:
 *   post:
 *     summary: Save a generated recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       201:
 *         description: Recipe saved successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, createRecipe);

/**
 * @swagger
 * /api/v1/recipes:
 *   get:
 *     summary: Get all saved recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of all recipes
 */
router.get("/", getRecipes);

/**
 * @swagger
 * /api/v1/recipes/my:
 *   get:
 *     summary: Get logged-in user recipes
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's recipes
 *       401:
 *         description: Unauthorized
 */
router.get("/my", authenticate, getMyRecipes);

/**
 * @swagger
 * /api/v1/recipes/{id}:
 *   get:
 *     summary: Get recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe found
 *       404:
 *         description: Recipe not found
 */
router.get("/:id", getRecipeById);

/**
 * @swagger
 * /api/v1/recipes:
 *   delete:
 *     summary: Delete all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: All recipes deleted
 */
router.delete("/", deleteAllRecipes);

/**
 * @swagger
 * /api/v1/recipes/{id}:
 *   delete:
 *     summary: Delete recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted
 *       404:
 *         description: Recipe not found
 */
router.delete("/:id", deleteRecipe);

/**
 * @swagger
 * /api/v1/recipes/{id}:
 *   put:
 *     summary: Update recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       200:
 *         description: Recipe updated
 *       404:
 *         description: Recipe not found
 */
router.put("/:id", updateRecipe);

/**
 * @swagger
 * /api/v1/recipes/{id}:
 *   patch:
 *     summary: Partially update recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Partial recipe fields to update
 *     responses:
 *       200:
 *         description: Recipe partially updated
 *       404:
 *         description: Recipe not found
 */
router.patch("/:id", patchRecipe);

module.exports = router;