const Recipe = require("../models/Recipe");

async function generateRecipe(data) {
  const { ingredients, diet, cookingTime, cuisine } = data;

  // لاحقاً AI
  return {
    title: "AI Generated Recipe",
    ingredients,
    steps: [
      "Prepare ingredients",
      "Cook everything",
      "Serve and enjoy"
    ],
    cookingTime,
    calories: "400 kcal",
    diet,
    cuisine,
  };
}

async function saveRecipe(recipe) {
  const newRecipe = new Recipe(recipe);
  return await newRecipe.save();
}

async function getAllRecipes() {
  return await Recipe.find().sort({ createdAt: -1 });
}

async function deleteRecipe(id) {
  return await Recipe.findByIdAndDelete(id);
}


module.exports = {
  generateRecipe,
  saveRecipe,
  getAllRecipes,
  deleteRecipe,
};