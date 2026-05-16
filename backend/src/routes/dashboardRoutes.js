const express = require("express");
const { getDashboard, updateDietPreferences } = require("../controllers/dashboardController");
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
 * /api/v1/dashboard:
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

/**
 * @swagger
 * /api/v1/dashboard/preferences:
 *   put:
 *     summary: Update user's diet preferences
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vegetarian:
 *                 type: boolean
 *               lowCarb:
 *                 type: boolean
 *               highProtein:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Diet preferences updated successfully
 *       401:
 *         description: Unauthorized - token required
 */
router.put("/preferences", authenticate, updateDietPreferences);

module.exports = router;