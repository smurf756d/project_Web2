const favoriteRecipeService = require("../services/favoriteRecipe.service");

/**
 * @desc    Add recipe to logged-in user's favorites
 * @route   POST /api/v1/favorites/:recipeId
 * @access  Private
 */
async function addFavorite(req, res) {
  try {
    const favorite = await favoriteRecipeService.addFavorite(
      req.user._id,
      req.params.recipeId
    );

    res.status(201).json({
      success: true,
      message: "Recipe added to favorites",
      data: favorite,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Recipe is already in favorites",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

/**
 * @desc    Get logged-in user's favorite recipes with pagination
 * @route   GET /api/v1/favorites?page=1&limit=5
 * @access  Private
 */
async function getFavorites(req, res) {
  try {
    /**
     * Read pagination query parameters
     * Default page = 1
     * Default limit = 5
     */
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const result = await favoriteRecipeService.getFavorites(
      req.user._id,
      page,
      limit
    );

    res.status(200).json({
      success: true,
      totalFavorites: result.totalFavorites,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      results: result.favorites.length,
      data: result.favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

/**
 * @desc    Remove recipe from logged-in user's favorites
 * @route   DELETE /api/v1/favorites/:recipeId
 * @access  Private
 */
async function removeFavorite(req, res) {
  try {
    const favorite = await favoriteRecipeService.removeFavorite(
      req.user._id,
      req.params.recipeId
    );

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe removed from favorites",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
};