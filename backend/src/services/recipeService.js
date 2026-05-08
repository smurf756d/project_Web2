const Recipe = require("../models/Recipe");

async function generateRecipe(data) {
  const { ingredients, diet, cookingTime, cuisine } = data;

  // Placeholder for future AI integration
  return {
    title: "AI Generated Recipe",
    ingredients,
    instructions: "Prepare ingredients. Cook everything. Serve and enjoy.",
    time: cookingTime,
    calories: 400,
    diet,
    cuisine,
  };
}

async function saveRecipe(recipe) {
  const newRecipe = new Recipe(recipe);
  return await newRecipe.save();
}

async function getAllRecipes(userId) {
  return await Recipe.find({ user: userId }).sort({ createdAt: -1 });
}

async function deleteRecipe(id, userId) {
  return await Recipe.findOneAndDelete({
    _id: id,
    user: userId,
  });
}

module.exports = {
  generateRecipe,
  saveRecipe,
  getAllRecipes,
  deleteRecipe,
};