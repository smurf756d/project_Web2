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

    suggestedRecipes: suggestedRecipesPool,

    dietPreferences: [
      { label: "Vegetarian", enabled: preferences.vegetarian },
      { label: "Low Carb", enabled: preferences.lowCarb },
      { label: "High Protein", enabled: preferences.highProtein },
    ],

    myRecipes,
  };
};

module.exports = {
  getDashboardData,
};