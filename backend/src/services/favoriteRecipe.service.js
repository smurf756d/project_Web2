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
async function getFavorites(userId, page, limit) {

  // Calculate how many documents to skip
  const skip = (page - 1) * limit;

  // Fetch paginated favorite recipes
  const favorites = await FavoriteRecipe.find({
    user: userId,
  })
    .populate("recipe")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // Count total favorite recipes
  const totalFavorites = await FavoriteRecipe.countDocuments({
    user: userId,
  });

  return {
    favorites,
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