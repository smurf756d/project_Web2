const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const {
  getDashboardStats,
  getRecentRecipes,
  getUsers,
  getMostUsedIngredients,
  getMostLikedRecipes,
} = require("../controllers/adminController");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin dashboard endpoints
 */

/**
 * @swagger
 * /api/v1/admin/stats:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin dashboard stats returned successfully
 *       500:
 *         description: Failed to fetch dashboard stats
 */
router.get(
  "/stats",
  authenticate,
  authorize("admin"),
  getDashboardStats
);

/**
 * @swagger
 * /api/v1/admin/recent-recipes:
 *   get:
 *     summary: Get recent recipes for admin dashboard
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Recent recipes returned successfully
 *       500:
 *         description: Failed to fetch recent recipes
 */
router.get(
  "/recent-recipes",
  authenticate,
  authorize("admin"),
  getRecentRecipes
);

/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Users returned successfully
 *       500:
 *         description: Failed to fetch users
 */
router.get(
  "/users",
  authenticate,
  authorize("admin"),
  getUsers
);

/**
 * @swagger
 * /api/v1/admin/most-used-ingredients:
 *   get:
 *     summary: Get most used ingredients
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Most used ingredients returned successfully
 *       500:
 *         description: Failed to fetch ingredients
 */
router.get(
  "/most-used-ingredients",
  authenticate,
  authorize("admin"),
  getMostUsedIngredients
);

/**
 * @swagger
 * /api/v1/admin/most-liked-recipes:
 *   get:
 *     summary: Get most liked recipes
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Most liked recipes returned successfully
 *       500:
 *         description: Failed to fetch liked recipes
 */
router.get(
  "/most-liked-recipes",
  authenticate,
  authorize("admin"),
  getMostLikedRecipes
);

module.exports = router;