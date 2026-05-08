const recipeService = require("../services/generateRecipeService");

/**
 * Handles recipe generation based on user ingredients and preferences.
 */
async function generateRecipe(req, res, next) {
  try {
    const recipe = await recipeService.generateRecipe(req.body);
    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Saves a generated recipe to MongoDB.
 */
async function createRecipe(req, res, next) {
  try {
    const recipe = await recipeService.saveRecipe(req.body);
    res.status(201).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Returns all saved recipes.
 */
async function getRecipes(req, res, next) {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Deletes a recipe by id.
 */
async function deleteRecipe(req, res, next) {
  try {
    const recipe = await recipeService.deleteRecipe(req.params.id);

    if (!recipe) {
      const error = new Error("Recipe not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  generateRecipe,
  createRecipe,
  getRecipes,
  deleteRecipe,
};