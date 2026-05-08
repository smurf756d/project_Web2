const MyRecipe = require("../models/MyRecipe");

async function createMyRecipe(recipeData) {
  const recipe = new MyRecipe(recipeData);
  return await recipe.save();
}

async function getMyRecipes(userId) {
  return await MyRecipe.find({ user: userId }).sort({ createdAt: -1 });
}

async function updateMyRecipe(recipeId, userId, updateData) {
  return await MyRecipe.findOneAndUpdate(
    { _id: recipeId, user: userId },
    updateData,
    { new: true, runValidators: true }
  );
}

async function deleteMyRecipe(recipeId, userId) {
  return await MyRecipe.findOneAndDelete({
    _id: recipeId,
    user: userId,
  });
}

module.exports = {
  createMyRecipe,
  getMyRecipes,
  updateMyRecipe,
  deleteMyRecipe,
};