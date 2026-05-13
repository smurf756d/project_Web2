const express = require("express");

const recipeController = require("../controllers/recipeController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

/**
 * @swagger
 * /api/recipes/my:
 *   get:
 *     summary: Get logged-in user recipes
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User recipes fetched successfully
 */
router.get("/my", authenticate, recipeController.getMyRecipes);

module.exports = router;