const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getRecentRecipes,
} = require("../controllers/adminController");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin dashboard endpoints
 */

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin dashboard stats returned successfully
 *       500:
 *         description: Failed to fetch dashboard stats
 */
router.get("/stats", getDashboardStats);

/**
 * @swagger
 * /api/admin/recent-recipes:
 *   get:
 *     summary: Get recent recipes for admin dashboard
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Recent recipes returned successfully
 *       500:
 *         description: Failed to fetch recent recipes
 */

router.get("/recent-recipes", getRecentRecipes);

module.exports = router;