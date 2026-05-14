const Recipe = require("../models/Recipe");

async function getDashboardStats() {
  const totalRecipes = await Recipe.countDocuments();

  return {
    totalRecipes,
    totalUsers: 0,
    generatedRecipes: totalRecipes,
  };
}

async function getRecentRecipes() {
  return await Recipe.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("title cookingTime calories cuisine createdAt");
}

module.exports = {
  getDashboardStats,
  getRecentRecipes,
};