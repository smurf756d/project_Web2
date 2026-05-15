const validate = require("../middleware/validate");
const express = require("express");

const authenticate = require("../middleware/authenticate");

const {
  validateCreateRecipe,
} = require("../utils/validators");

const {
  createMyRecipe,
  getMyRecipes,
  updateMyRecipe,
  deleteMyRecipe,
} = require("../controllers/myRecipe.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: MyRecipes
 *   description: Endpoints for user's personal saved recipes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MyRecipe:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Chicken Pasta
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Chicken", "Pasta", "Cream"]
 *         steps:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Boil pasta", "Cook chicken", "Mix together"]
 *         cookingTime:
 *           type: string
 *           example: 30 mins
 *         calories:
 *           type: string
 *           example: 500 kcal
 *         diet:
 *           type: string
 *           example: High Protein
 *         cuisine:
 *           type: string
 *           example: Italian
 */

/**
 * @swagger
 * /api/v1/my-recipes:
 *   get:
 *     summary: Get logged-in user's saved recipes
 *     tags: [MyRecipes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's recipes
 *   post:
 *     summary: Create a new personal recipe
 *     tags: [MyRecipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MyRecipe'
 *     responses:
 *       201:
 *         description: Recipe created
 */
router
  .route("/")
  .get(authenticate, getMyRecipes)
  .post(
    authenticate,
    validate(validateCreateRecipe),
    createMyRecipe
  );

/**
 * @swagger
 * /api/v1/my-recipes/{id}:
 *   put:
 *     summary: Update a personal recipe by id
 *     tags: [MyRecipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MyRecipe'
 *     responses:
 *       200:
 *         description: Recipe updated
 *   delete:
 *     summary: Delete a personal recipe by id
 *     tags: [MyRecipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted
 */
router
  .route("/:id")
  .put(authenticate, updateMyRecipe)
  .delete(authenticate, deleteMyRecipe);

module.exports = router;