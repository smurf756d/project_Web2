const { GoogleGenerativeAI } = require("@google/generative-ai");
const Recipe = require("../models/Recipe");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const allowedDiets = ["Healthy", "Vegan", "Keto", "Any"];
const allowedCookingTimes = ["0 - 30 mins", "30 - 60 mins", "60+ mins"];
const allowedCuisines = ["Any", "Italian", "Asian", "Arabic"];

function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

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
 * Generates a real recipe using Gemini AI based on user ingredients and preferences.
 */
async function generateRecipe(data) {
  validateGenerateRecipeInput(data);

  if (!process.env.GEMINI_API_KEY) {
    throw createError("Gemini API key is missing", 500);
  }

  const { ingredients, diet, cookingTime, cuisine } = data;
  const cleanIngredients = ingredients.map((item) => item.trim());

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Generate one realistic cooking recipe.

Ingredients:
${cleanIngredients.join(", ")}

Preferences:
- Diet: ${diet}
- Cooking Time: ${cookingTime}
- Cuisine: ${cuisine}

Return ONLY valid JSON in this exact format:
{
  "title": "Recipe title",
  "ingredients": ["ingredient1", "ingredient2"],
  "steps": ["step1", "step2", "step3"],
  "cookingTime": "${cookingTime}",
  "calories": "350 kcal",
  "diet": "${diet}",
  "cuisine": "${cuisine}"
}

Rules:
- Use the given ingredients as the base.
- Steps must be clear and realistic.
- Calories should be an estimate like "420 kcal".
- Do not include markdown.
- Do not include explanation.
- Return JSON only.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const cleanText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleanText);
  } catch (error) {
    throw createError("AI response format was invalid. Please try again.", 500);
  }
}

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

async function getAllRecipes() {
  return await Recipe.find().sort({ createdAt: -1 });
}

async function getRecipeById(id) {
  return await Recipe.findById(id);
}

async function updateRecipe(id, recipeData) {
  return await Recipe.findByIdAndUpdate(id, recipeData, {
    new: true,
    runValidators: true,
  });
}

async function patchRecipe(id, recipeData) {
  return await Recipe.findByIdAndUpdate(
    id,
    { $set: recipeData },
    {
      new: true,
      runValidators: true,
    }
  );
}

async function deleteRecipe(id) {
  return await Recipe.findByIdAndDelete(id);
}

async function deleteAllRecipes() {
  return await Recipe.deleteMany();
}

module.exports = {
  generateRecipe,
  saveRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  patchRecipe,
  deleteRecipe,
  deleteAllRecipes,
};