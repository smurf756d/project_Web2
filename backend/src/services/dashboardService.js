const Recipe = require("../models/Recipe");

/**
 * Get all dashboard data for the logged-in user.
 */
const getDashboardData = async (user) => {
  const myRecipes = await Recipe.find({ createdBy: user._id })
    .sort({ createdAt: -1 })
    .limit(3);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    stats: {
      savedRecipes: myRecipes.length,
      generatedToday: 0,
      favoriteDish: myRecipes[0]?.title || "Not selected yet",
    },
    suggestedRecipes: [],
    dietPreferences: [],
    myRecipes,
  };
};

module.exports = {
  getDashboardData,
};
