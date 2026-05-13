const express = require("express");

const authenticate = require("../middleware/authenticate");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get user dashboard data
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 */
router.get("/", authenticate, dashboardController.getDashboard);


/**
 * @swagger
 * /api/dashboard/preferences:
 *   put:
 *     summary: Update user diet preferences
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
 */
router.put("/preferences", authenticate, dashboardController.updatePreferences);

module.exports = router;