const express = require("express");

const recipeController = require("../controllers/recipeController");
const { protect } = require("../middlewares/authMiddleware");

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
router.get("/my", protect, recipeController.getMyRecipes);

module.exports = router;