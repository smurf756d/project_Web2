const Recipe = require("../models/Recipe");

async function getDashboardStats(req, res) {
  try {
    const totalRecipes = await Recipe.countDocuments();

    res.status(200).json({
      totalRecipes,
      totalUsers: 0,
      generatedRecipes: 0,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard stats",
    });
  }
}

module.exports = {
  getDashboardStats,
};