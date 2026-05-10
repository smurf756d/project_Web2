const dashboardService = require("../services/dashboardService");

const getDashboard = async (req, res, next) => {
  try {
    const dashboardData = await dashboardService.getDashboardData(req.user);

    res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    next(error);
  }
};

const updatePreferences = async (req, res, next) => {
  try {
    const preferences = await dashboardService.updateDietPreferences(
      req.user._id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Diet preferences updated successfully",
      data: preferences,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
  updatePreferences,
};