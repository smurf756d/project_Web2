const Recipe = require("../models/Recipe");

/**
 * Generate a recipe based on ingredients and preferences
 * POST /api/recipes/generate
 */
async function generateRecipe(req, res, next) {
  try {
    const { ingredients, diet, cookingTime, cuisine } = req.body;

    // TODO: Integrate with AI service to generate recipe
    // For now, returning a placeholder response
    const generatedRecipe = {
      title: `${cuisine} Recipe with ${ingredients.join(", ")}`,
      ingredients,
      steps: [
        "Prepare ingredients",
        "Cook the dish",
        "Serve while hot",
      ],
      cookingTime,
      calories: "350-450 kcal",
      diet,
      cuisine,
      sourceIngredients: ingredients,
      isAIGenerated: true,
    };

    res.status(200).json({
      success: true,
      data: generatedRecipe,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Refine a generated recipe based on user feedback
 * POST /api/recipes/refine
 */
async function refineRecipe(req, res, next) {
  try {
    const { recipe, feedback } = req.body;

    // TODO: Integrate with AI service to refine recipe based on feedback
    // For now, returning the recipe as is
    const refinedRecipe = {
      ...recipe,
      title: `${recipe.title} (Refined)`,
    };

    res.status(200).json({
      success: true,
      data: refinedRecipe,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Save a generated recipe
 * POST /api/recipes
 */
async function createRecipe(req, res, next) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const recipeData = {
      ...req.body,
      createdBy: userId,
    };

    const recipe = await Recipe.create(recipeData);

    res.status(201).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get all saved recipes
 * GET /api/recipes
 */
async function getRecipes(req, res, next) {
  try {
    const recipes = await Recipe.find()
      .populate("createdBy", "username email")
      .sort({ createdAt: -1 });

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
 * Get logged-in user's recipes
 * GET /api/recipes/my
 */
async function getMyRecipes(req, res, next) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const recipes = await Recipe.find({ createdBy: userId })
      .sort({ createdAt: -1 });

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
 * Get recipe by ID
 * GET /api/recipes/:id
 */
async function getRecipeById(req, res, next) {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id)
      .populate("createdBy", "username email");

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
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
 * Update recipe (full update)
 * PUT /api/recipes/:id
 */
async function updateRecipe(req, res, next) {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
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
 * Patch recipe (partial update)
 * PATCH /api/recipes/:id
 */
async function patchRecipe(req, res, next) {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
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
 * Delete recipe
 * DELETE /api/recipes/:id
 */
async function deleteRecipe(req, res, next) {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByIdAndDelete(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete all recipes
 * DELETE /api/recipes
 */
async function deleteAllRecipes(req, res, next) {
  try {
    const result = await Recipe.deleteMany({});

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} recipes`,
      data: result,
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
  getMyRecipes,
  getRecipeById,
  updateRecipe,
  patchRecipe,
  deleteRecipe,
  deleteAllRecipes,
};
