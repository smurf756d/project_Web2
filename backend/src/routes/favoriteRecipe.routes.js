const express = require("express");

const authenticate = require("../middleware/authenticate");

const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../controllers/favoriteRecipe.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Favorite recipes management
 */

/**
 * @swagger
 * /api/v1/favorites:
 *   get:
 *     summary: Get user's favorite recipes
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorite recipes
 */
router.get("/", authenticate, getFavorites);

/**
 * @swagger
 * /api/v1/favorites/{recipeId}:
 *   post:
 *     summary: Add a recipe to favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe added to favorites
 *   delete:
 *     summary: Remove a recipe from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe removed from favorites
 */
router
  .route("/:recipeId")
  .post(authenticate, addFavorite)
  .delete(authenticate, removeFavorite);

module.exports = router;