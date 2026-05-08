const FavoriteRecipe = require("../models/FavoriteRecipe");

async function addFavorite(userId, recipeId) {
  return await FavoriteRecipe.create({
    user: userId,
    recipe: recipeId,
  });
}

async function getFavorites(userId) {
  return await FavoriteRecipe.find({ user: userId })
    .populate("recipe")
    .sort({ createdAt: -1 });
}

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