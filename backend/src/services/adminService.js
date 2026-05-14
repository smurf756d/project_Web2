const Recipe = require("../models/Recipe");
const User = require("../models/User");

async function getDashboardStats() {
  const totalRecipes = await Recipe.countDocuments();
  const totalUsers = await User.countDocuments();
  const generatedRecipes = await Recipe.countDocuments({ isAIGenerated: true });

  console.log("[adminService] Stats - Users:", totalUsers, "Recipes:", totalRecipes, "Generated:", generatedRecipes);

  return {
    totalRecipes,
    totalUsers,
    generatedRecipes,
  };
}

async function getRecentRecipes() {
  return await Recipe.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("title cookingTime calories cuisine createdAt");
}

/**
 * Get all users with basic info
 */
async function getUsers() {
  try {
    const users = await User.find()
      .select("_id name email role createdAt")
      .sort({ createdAt: -1 })
      .limit(100);
    
    console.log("[adminService] Fetched", users.length, "users");
    return users;
  } catch (error) {
    console.error("[adminService] Error fetching users:", error.message);
    throw error;
  }
}

/**
 * Get most used ingredients across all recipes
 */
async function getMostUsedIngredients() {
  try {
    const recipes = await Recipe.find()
      .select("sourceIngredients")
      .lean();

    // Count ingredient frequency
    const ingredientCounts = {};
    recipes.forEach((recipe) => {
      if (recipe.sourceIngredients && Array.isArray(recipe.sourceIngredients)) {
        recipe.sourceIngredients.forEach((ingredient) => {
          ingredientCounts[ingredient] = (ingredientCounts[ingredient] || 0) + 1;
        });
      }
    });

    // Convert to array and sort by count
    const sortedIngredients = Object.entries(ingredientCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 ingredients

    console.log("[adminService] Top used ingredients:", sortedIngredients.length);
    return sortedIngredients;
  } catch (error) {
    console.error("[adminService] Error fetching ingredients:", error.message);
    throw error;
  }
}

/**
 * Get most liked/favorited recipes
 */
async function getMostLikedRecipes() {
  try {
    const recipes = await Recipe.find({ isFavorite: true })
      .select("title isFavorite createdAt")
      .lean();

    // Count how many users have favorited each recipe (by title)
    const favoriteCounts = {};
    recipes.forEach((recipe) => {
      favoriteCounts[recipe.title] = (favoriteCounts[recipe.title] || 0) + 1;
    });

    // Convert to array and sort by count
    const sortedRecipes = Object.entries(favoriteCounts)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 recipes

    console.log("[adminService] Top liked recipes:", sortedRecipes.length);
    return sortedRecipes;
  } catch (error) {
    console.error("[adminService] Error fetching liked recipes:", error.message);
    throw error;
  }
}

module.exports = {
  getDashboardStats,
  getRecentRecipes,
  getUsers,
  getMostUsedIngredients,
  getMostLikedRecipes,
};