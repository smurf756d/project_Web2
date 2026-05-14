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

async function getUsers(req, res, next) {
  try {
    const users = await adminService.getUsers();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

async function getMostUsedIngredients(req, res, next) {
  try {
    const ingredients = await adminService.getMostUsedIngredients();

    res.status(200).json({
      success: true,
      count: ingredients.length,
      data: ingredients,
    });
  } catch (error) {
    next(error);
  }
}

async function getMostLikedRecipes(req, res, next) {
  try {
    const recipes = await adminService.getMostLikedRecipes();

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDashboardStats,
  getRecentRecipes,
  getUsers,
  getMostUsedIngredients,
  getMostLikedRecipes,
};