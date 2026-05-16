const FavoriteRecipe = require("../models/FavoriteRecipe");

/**
 * @desc    Add recipe to favorites
 */
async function addFavorite(userId, recipeId) {
  return await FavoriteRecipe.create({
    user: userId,
    recipe: recipeId,
  });
}

/**
 * @desc    Get paginated favorite recipes for logged-in user
 */
async function getFavorites(
    userId, 
    page, 
    limit
) {

/**
 * Calculate pagination offset
 */
  const hasPagination = Number.isFinite(limit) && limit > 0;
  const skip = hasPagination ? (page - 1) * limit : 0;

 /**
 * Fetch favorite recipes
 */
  const allFavoriteDocs = await FavoriteRecipe.find({
    user: userId,
  })
    .populate("recipe")
    .sort({ createdAt: -1 });

  // Filter out favorites where the recipe was deleted (populated recipe is null)
  const validFavorites = allFavoriteDocs.filter((fav) => fav.recipe !== null);

  const totalFavorites = validFavorites.length;

  if (!hasPagination) {
    return {
      favorites: validFavorites,
      totalFavorites,
      currentPage: 1,
      totalPages: totalFavorites > 0 ? 1 : 0,
    };
  }

  /**
 * Apply pagination to valid favorites only
 */
  const paginatedFavorites = validFavorites.slice(skip, skip + limit);

  return {
    favorites: paginatedFavorites,
    totalFavorites,
    currentPage: page,
    totalPages: Math.ceil(totalFavorites / limit),
  };
}

/**
 * @desc    Remove recipe from favorites
 */
async function removeFavorite(userId, recipeId) {
  return await FavoriteRecipe.findOneAndDelete({
    user: userId,
    recipe: recipeId,
  });
}

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
};