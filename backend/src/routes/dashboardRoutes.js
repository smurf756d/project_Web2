const express = require("express");
const { getDashboard } = require("../controllers/dashboardController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard and user statistics APIs
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard data for logged-in user
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized - token required
 */
router.get("/", authenticate, getDashboard);

module.exports = router;