const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
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

module.exports = router;