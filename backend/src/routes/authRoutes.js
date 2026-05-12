const express = require("express");
const passport = require("passport");
const generateToken = require("../utils/generateToken");

const {
  testAuth,
  register,
  login,
  profile,
} = require("../controllers/authController");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");

const {
  validateRegister,
  validateLogin,
} = require("../utils/validators");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization APIs
 */

/**
 * @swagger
 * /api/v1/auth/test:
 *   get:
 *     summary: Test auth route
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Auth route works
 */
router.get("/test", testAuth);

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Test User
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *               confirmPassword:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", validate(validateRegister), register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", validate(validateLogin), login);

/**
 * @swagger
 * /api/v1/auth/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned successfully
 */
router.get("/profile", authenticate, profile);

/**
 * @swagger
 * /api/v1/auth/google:
 *   get:
 *     summary: Start Google OAuth login
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects user to Google login page
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/**
 * @swagger
 * /api/v1/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects frontend with JWT token
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/v1/auth/google/failure",
  }),
  (req, res) => {
    const token = generateToken(req.user);

    res.redirect(`${process.env.CLIENT_SUCCESS_URL}#token=${token}`);
  }
);

/**
 * @swagger
 * /api/v1/auth/google/failure:
 *   get:
 *     summary: Google OAuth failure redirect
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to frontend failure page
 */
router.get("/google/failure", (req, res) => {
  res.redirect(process.env.CLIENT_FAILURE_URL);
});

/**
 * @swagger
 * /api/v1/auth/admin:
 *   get:
 *     summary: Admin-only protected route
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin access granted
 */
router.get(
  "/admin",
  authenticate,
  authorize("admin"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome Admin",
      user: req.user,
    });
  }
);

module.exports = router;