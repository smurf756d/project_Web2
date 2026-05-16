const Recipe = require("../models/Recipe");
const UserPreference = require("../models/UserPreference");
const FavoriteRecipe = require("../models/FavoriteRecipe");

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

  // Lazy-load MyRecipe model to avoid circular requires elsewhere
  const MyRecipe = require("../models/MyRecipe");

  const [allRecipesFromRecipes, allRecipesFromMyRecipes] = await Promise.all([
    Recipe.find({ createdBy: user._id }).sort({ createdAt: -1 }),
    MyRecipe.find({ user: user._id }).sort({ createdAt: -1 }),
  ]);

  const recipeIds = new Set(allRecipesFromRecipes.map((recipe) => String(recipe._id)));

  // Keep only recipes that still have a valid counterpart so the card and count match the page.
  const validMyRecipes = allRecipesFromMyRecipes.filter((recipe) => {
    if (recipe.recipe) {
      return recipeIds.has(String(recipe.recipe));
    }

    return allRecipesFromRecipes.some(
      (matchedRecipe) => matchedRecipe.title === recipe.title && String(matchedRecipe.createdBy) === String(user._id)
    );
  });

  const myRecipes = validMyRecipes.slice(0, 3);

  // Count saved recipes from MyRecipe so the dashboard matches the My Recipes page.
  // MyRecipe is kept in sync with Recipe for user-facing behavior.
  const savedRecipesCount = validMyRecipes.length;

  // Get user preferences to check generated count today
  const preferences = await getOrCreatePreferences(user._id);
  const generatedTodayCount = preferences.generatedCountToday || 0;

  console.log(`[dashboardService] User ${user._id} - Saved: ${savedRecipesCount}, Generated Today: ${generatedTodayCount}`);

  // Count valid favorites exactly like the Favorites page data source:
  // favorite is valid only if populated MyRecipe still exists.
  const allFavorites = await FavoriteRecipe.find({ user: user._id }).populate("recipe");
  const favoriteDishCount = allFavorites.filter((fav) => fav.recipe !== null).length;

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
      favoriteDish: favoriteDishCount,
    },

    suggestedRecipes: suggestedRecipesPool,

    dietPreferences: formatPreferences(preferences),

    myRecipes,
  };
};

const updateDietPreferences = async (userId, preferenceData) => {
  console.log(`[updateDietPreferences] User ${userId}, Payload:`, preferenceData);
  
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

  console.log(`[updateDietPreferences] ✅ Updated preferences:`, updatedPreferences);

  return formatPreferences(updatedPreferences);
};

module.exports = {
  getDashboardData,
  updateDietPreferences,
};