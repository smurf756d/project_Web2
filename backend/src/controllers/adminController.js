const Recipe = require("../models/Recipe");

async function getDashboardStats(req, res, next) {
  try {
    const totalRecipes = await Recipe.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalRecipes,
        totalUsers: 0,
        generatedRecipes: totalRecipes,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getRecentRecipes(req, res, next) {
  try {
    const recentRecipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title cookingTime calories cuisine createdAt");

    res.status(200).json({
      success: true,
      count: recentRecipes.length,
      data: recentRecipes,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDashboardStats,
  getRecentRecipes,
};