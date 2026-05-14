const recipeService = require("../services/generateRecipeService");

// Standard error helper
function createNotFoundError() {
  const error = new Error("Recipe not found");
  error.statusCode = 404;
  return error;
}

// AI recipe generation
async function generateRecipe(req, res, next) {
  try {
    const recipe = await recipeService.generateRecipe(req.body);
    
    // If user is authenticated, auto-save the generated recipe
    if (req.user) {
      try {
        const recipeData = {
          ...recipe,
          createdBy: req.user._id,
          isAIGenerated: true,
        };
        await recipeService.saveRecipe(recipeData);
      } catch (saveError) {
        // Log the error but don't fail the generation
        console.error("Auto-save failed for generated recipe:", saveError);
      }
    }
    
    res.status(200).json({
      success: true,
      message: "Recipe generated successfully",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
}

// AI recipe refinement based on feedback
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

// Save recipe and link to authenticated user

const createRecipe = async (req, res) => {
  try {
    const recipeData = req.body;
    
    
    recipeData.createdBy = req.user._id; 

    const savedRecipe = await recipeService.saveRecipe(recipeData);
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Get recipes saved by the current user
async function getMyRecipes(req, res, next) {
  try {
    const recipes = await recipeService.getMyRecipes(req.user._id);

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
}

// Get all recipes in database
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

// Get single recipe by ID
async function getRecipeById(req, res, next) {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    if (!recipe) throw createNotFoundError();
    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    next(error);
  }
}

// Full update of recipe
async function updateRecipe(req, res, next) {
  try {
    const recipe = await recipeService.updateRecipe(req.params.id, req.body);
    if (!recipe) throw createNotFoundError();
    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
}

// Partial update of recipe
async function patchRecipe(req, res, next) {
  try {
    const recipe = await recipeService.patchRecipe(req.params.id, req.body);
    if (!recipe) throw createNotFoundError();
    res.status(200).json({
      success: true,
      message: "Recipe partially updated successfully",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
}

// Delete specific recipe
async function deleteRecipe(req, res, next) {
  try {
    const recipe = await recipeService.deleteRecipe(req.params.id);
    if (!recipe) throw createNotFoundError();
    res.status(200).json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    next(error);
  }
}

// Delete all recipes
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
  getMyRecipes,
  getRecipes,
  getRecipeById,
  updateRecipe,
  patchRecipe,
  deleteRecipe,
  deleteAllRecipes,
  
};
