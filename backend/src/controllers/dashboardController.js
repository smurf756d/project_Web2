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

/**
 * Update diet preferences for the logged-in user.
 */
const updateDietPreferences = async (req, res, next) => {
  try {
    console.log(`[updateDietPreferences] Updating preferences for user: ${req.user._id}`, req.body);
    
    const updatedPreferences = await dashboardService.updateDietPreferences(
      req.user._id,
      req.body
    );

    console.log(`[updateDietPreferences] ✅ Preferences updated:`, updatedPreferences);
    res.status(200).json({
      success: true,
      message: "Diet preferences updated successfully",
      data: updatedPreferences,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
  updateDietPreferences,
};