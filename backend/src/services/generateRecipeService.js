const Recipe = require("../models/Recipe");

const allowedDiets = ["Healthy", "Vegan", "Keto", "Any"];
const allowedCookingTimes = ["0 - 30 mins", "30 - 60 mins", "60+ mins"];
const allowedCuisines = ["Any", "Italian", "Asian", "Arabic"];

function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

/**
 * Validates the input used to generate a recipe.
 */
function validateGenerateRecipeInput(data) {
  const { ingredients, diet, cookingTime, cuisine } = data;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    throw createError("At least one ingredient is required", 400);
  }

  if (ingredients.some((item) => typeof item !== "string" || item.trim() === "")) {
    throw createError("Ingredients must be valid text values", 400);
  }

  if (!allowedDiets.includes(diet)) {
    throw createError("Invalid diet preference", 400);
  }

  if (!allowedCookingTimes.includes(cookingTime)) {
    throw createError("Invalid cooking time", 400);
  }

  if (!allowedCuisines.includes(cuisine)) {
    throw createError("Invalid cuisine type", 400);
  }
}

/**
 * Generates a recipe based on user input.
 
 */
async function generateRecipe(data) {
  validateGenerateRecipeInput(data);

  const { ingredients, diet, cookingTime, cuisine } = data;

  return {
    title: `${cuisine === "Any" ? "Simple" : cuisine} ${ingredients[0]} Recipe`,
    ingredients: ingredients.map((item) => item.trim()),
    steps: [
      "Wash and prepare all ingredients.",
     ` Cook the main ingredients: ${ingredients.join(", ")}.`,
      "Season the dish according to your taste.",
      "Serve warm and enjoy your meal.",
    ],
    cookingTime,
    calories: "400 kcal",
    diet,
    cuisine,
  };
}

/**
 * saves a recipe to MongoDB database.
 */
async function saveRecipe(recipe) {
  if (!recipe.title || !Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
    throw createError("Recipe title and ingredients are required", 400);
  }

  if (!Array.isArray(recipe.steps) || recipe.steps.length === 0) {
    throw createError("Recipe steps are required", 400);
  }

  const newRecipe = new Recipe(recipe);
  return await newRecipe.save();
}

/**
 * Returns all recipes sorted by newest first.
 */
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