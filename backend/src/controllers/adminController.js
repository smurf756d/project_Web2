const Recipe = require("../models/Recipe");

async function getDashboardStats(req, res) {
  try {
    const totalRecipes = await Recipe.countDocuments();

    const recentRecipes = await Recipe.find(
  {},
  {
    title: 1,
    calories: 1,
    cookingTime: 1,
    cuisine: 1,
    createdAt: 1,
  }
)
  .sort({ createdAt: -1 })
  .limit(5);

res.status(200).json({
  totalRecipes,
  totalUsers: 0,
  generatedRecipes: totalRecipes,
  recentRecipes,
});
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard stats",
    });
  }
}

async function getRecentRecipes(req, res) {
  try {
    const recipes = await Recipe.find(
  {},
  {
    title: 1,
    calories: 1,
    cookingTime: 1,
    cuisine: 1,
    createdAt: 1,
  }
)
  .sort({ createdAt: -1 })
  .limit(5);

    res.status(200).json(recipes);
  } catch (error) {
    console.error("Recent recipes error:", error);

    res.status(500).json({
      message: "Failed to fetch recent recipes",
    });
  }
}

module.exports = {
  getDashboardStats,
  getRecentRecipes,
};