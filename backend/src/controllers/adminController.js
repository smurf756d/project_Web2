const adminService = require("../services/adminService");

async function getDashboardStats(req, res, next) {
  try {
    const stats = await adminService.getDashboardStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
}

async function getRecentRecipes(req, res, next) {
  try {
    const recentRecipes = await adminService.getRecentRecipes();

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