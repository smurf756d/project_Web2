const Recipe = require("../models/Recipe");
const UserPreference = require("../models/UserPreference");

/**
 * Get all dashboard data for the logged-in user.
 */
const getDashboardData = async (user) => {
  const myRecipes = await Recipe.find({ createdBy: user._id })
    .sort({ createdAt: -1 })
    .limit(3);

  let preferences = await UserPreference.findOne({ user: user._id });

  if (!preferences) {
    preferences = await UserPreference.create({
      user: user._id,
      vegetarian: false,
      lowCarb: false,
      highProtein: false,
    });
  }

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
    dietPreferences: [
      {
        label: "Vegetarian",
        enabled: preferences.vegetarian,
      },
      {
        label: "Low Carb",
        enabled: preferences.lowCarb,
      },
      {
        label: "High Protein",
        enabled: preferences.highProtein,
      },
    ],
    myRecipes,
  };
};

module.exports = {
  getDashboardData,
};