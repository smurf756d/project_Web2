const dashboardService = require("../services/dashboardService");

/**
 * Get dashboard data for the logged-in user.
 */
const getDashboard = async (req, res, next) => {
  try {
    console.log(`[getDashboard] Fetching dashboard for user: ${req.user._id}`);
    const dashboardData = await dashboardService.getDashboardData(
      req.user
    );

    console.log(`[getDashboard] ✅ Stats - Saved: ${dashboardData.stats.savedRecipes}, Generated Today: ${dashboardData.stats.generatedToday}`);
    res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
};