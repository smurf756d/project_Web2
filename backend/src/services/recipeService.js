const Recipe = require("../models/Recipe");

/**
 * Get recipes that belong to the logged-in user.
 */
const getMyRecipes = async (userId) => {
  const recipes = await Recipe.find({ createdBy: userId }).sort({
    createdAt: -1,
  });

  return recipes;
};

module.exports = {
  getMyRecipes,
};