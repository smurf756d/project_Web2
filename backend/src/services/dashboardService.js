const Recipe = require("../models/Recipe");
const UserPreference = require("../models/UserPreference");

const suggestedRecipesPool = [
  {
    id: 1,
    title: "Chicken Stir Fry",
    time: "30 mins",
    calories: "450 cal",
    ingredients: "chicken, rice, vegetables, soy sauce",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600",
  },
  {
    id: 2,
    title: "Healthy Salad",
    time: "15 mins",
    calories: "250 cal",
    ingredients: "lettuce, cucumber, tomato, avocado, olive oil",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600",
  },
  {
    id: 3,
    title: "Tomato Pasta",
    time: "25 mins",
    calories: "400 cal",
    ingredients: "pasta, tomato sauce, basil, parmesan cheese",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
  },
];

const getOrCreatePreferences = async (userId) => {
  let preferences = await UserPreference.findOne({ user: userId });

  if (!preferences) {
    preferences = await UserPreference.create({
      user: userId,
      vegetarian: false,
      lowCarb: false,
      highProtein: false,
    });
  }

  return preferences;
};

const formatPreferences = (preferences) => [
  {
    key: "vegetarian",
    label: "Vegetarian",
    enabled: preferences.vegetarian,
  },
  {
    key: "lowCarb",
    label: "Low Carb",
    enabled: preferences.lowCarb,
  },
  {
    key: "highProtein",
    label: "High Protein",
    enabled: preferences.highProtein,
  },
];

const getDashboardData = async (user) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  // Get recent recipes for this user
  const myRecipes = await Recipe.find({ createdBy: user._id })
    .sort({ createdAt: -1 })
    .limit(3);

  // Count all recipes saved by this user
  const savedRecipesCount = await Recipe.countDocuments({
    createdBy: user._id,
  });

  // Count AI-generated recipes saved by this user today
  const generatedTodayCount = await Recipe.countDocuments({
    createdBy: user._id,
    isAIGenerated: true,
    createdAt: {
      $gte: startOfToday,
      $lte: endOfToday,
    },
  });

  console.log(`[dashboardService] User ${user._id} - Saved: ${savedRecipesCount}, Generated Today: ${generatedTodayCount}`);

  const favoriteRecipe = await Recipe.findOne({
    createdBy: user._id,
    isFavorite: true,
  }).sort({ updatedAt: -1 });

  const preferences = await getOrCreatePreferences(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },

    stats: {
      savedRecipes: savedRecipesCount,
      generatedToday: generatedTodayCount,
      favoriteDish: favoriteRecipe?.title || "Not selected yet",
    },

    suggestedRecipes: suggestedRecipesPool,

    dietPreferences: formatPreferences(preferences),

    myRecipes,
  };
};

const updateDietPreferences = async (userId, preferenceData) => {
  const updatedPreferences = await UserPreference.findOneAndUpdate(
    { user: userId },
    {
      vegetarian: Boolean(preferenceData.vegetarian),
      lowCarb: Boolean(preferenceData.lowCarb),
      highProtein: Boolean(preferenceData.highProtein),
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );

  return formatPreferences(updatedPreferences);
};

module.exports = {
  getDashboardData,
  updateDietPreferences,
};