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
 * /api/recipes/generate:
 *   post:
 *     summary: Generate a recipe based on ingredients and preferences
 *     tags: [Recipes]
 */
router.post("/generate", optionalAuth, validate(validateGenerateRecipe), generateRecipe);

/**
 * @swagger
 * /api/recipes/refine:
 *   post:
 *     summary: Refine a generated recipe based on user feedback
 *     tags: [Recipes]
 */
router.post("/refine", refineRecipe);

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Save a generated recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authenticate, createRecipe);

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all saved recipes
 *     tags: [Recipes]
 */
router.get("/", getRecipes);

/**
 * @swagger
 * /api/recipes/my:
 *   get:
 *     summary: Get logged-in user recipes
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 */
router.get("/my", authenticate, getMyRecipes);

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get recipe by id
 *     tags: [Recipes]
 */
router.get("/:id", getRecipeById);

router.delete("/", deleteAllRecipes);
router.delete("/:id", deleteRecipe);

router.put("/:id", updateRecipe);
router.patch("/:id", patchRecipe);

module.exports = router;