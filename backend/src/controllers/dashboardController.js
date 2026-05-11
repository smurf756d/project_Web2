const dashboardService = require("../services/dashboardService");

/**
 * Get dashboard data for the logged-in user.
 */
const getDashboard = async (req, res, next) => {
  try {
    const dashboardData = await dashboardService.getDashboardData(
      req.user
    );

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