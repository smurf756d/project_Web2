const recipeService = require("../services/generateRecipeService");

function createNotFoundError() {
  const error = new Error("Recipe not found");
  error.statusCode = 404;
  return error;
}

/**
 * Handles recipe generation based on user ingredients and preferences.
 */
async function generateRecipe(req, res, next) {
  try {
    const recipe = await recipeService.generateRecipe(req.body);

    res.status(200).json({
      success: true,
      message: "Recipe generated successfully",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
}
/**
 * Refines a generated recipe based on user feedback.
 */
async function refineRecipe(req, res, next) {
  try {
    const recipe = await recipeService.refineRecipe(req.body);

    res.status(200).json({
      success: true,
      message: "Recipe refined successfully",
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
      message: "Recipe saved successfully",
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
 * Returns one recipe by id.
 */
async function getRecipeById(req, res, next) {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);

    if (!recipe) {
      throw createNotFoundError();
    }

    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Replaces or updates a full recipe by id.
 */
async function updateRecipe(req, res, next) {
  try {
    const recipe = await recipeService.updateRecipe(req.params.id, req.body);

    if (!recipe) {
      throw createNotFoundError();
    }

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Updates selected fields of a recipe by id.
 */
async function patchRecipe(req, res, next) {
  try {
    const recipe = await recipeService.patchRecipe(req.params.id, req.body);

    if (!recipe) {
      throw createNotFoundError();
    }

    res.status(200).json({
      success: true,
      message: "Recipe partially updated successfully",
      data: recipe,
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
      throw createNotFoundError();
    }

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Deletes all recipes.
 */
async function deleteAllRecipes(req, res, next) {
  try {
    const result = await recipeService.deleteAllRecipes();

    res.status(200).json({
      success: true,
      message: "All recipes deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  generateRecipe,
  refineRecipe,
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  patchRecipe,
  deleteRecipe,
  deleteAllRecipes,
};
