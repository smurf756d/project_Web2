const recipeService = require("../services/recipeService");

/**
 * Get logged-in user recipes.
 */
const getMyRecipes = async (req, res, next) => {
  try {
    const recipes = await recipeService.getMyRecipes(req.user._id);

    res.status(200).json({
      success: true,
      results: recipes.length,
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyRecipes,
};