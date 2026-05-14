const { GoogleGenerativeAI } = require("@google/generative-ai");
const Recipe = require("../models/Recipe");

// تأكدي من استدعاء dotenv في ملف server.js الأساسي
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

  if (!allowedDiets.includes(diet)) throw createError("Invalid diet preference", 400);
  if (!allowedCookingTimes.includes(cookingTime)) throw createError("Invalid cooking time", 400);
  if (!allowedCuisines.includes(cuisine)) throw createError("Invalid cuisine type", 400);
}

function generateRecipeImage(recipe) {
  const cuisineImages = {
    Arabic: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    Italian: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    Asian: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    Any: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  };
  return cuisineImages[recipe.cuisine] || cuisineImages.Any;
}

/**
 * AI Recipe Generation - Updated Logic
 */
async function generateRecipe(data) {
  validateGenerateRecipeInput(data);

  if (!process.env.GEMINI_API_KEY) throw createError("Gemini API key is missing", 500);

  const { ingredients, diet, cookingTime, cuisine } = data;
  const cleanIngredients = ingredients.map((item) => item.trim());

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt = `Generate a realistic recipe JSON for: 
  Ingredients: ${cleanIngredients.join(", ")}, 
  Diet: ${diet}, 
  Time: ${cookingTime}, 
  Cuisine: ${cuisine}. 
  Return ONLY a valid JSON object. Do not include any markdown formatting like \`\`\`json.
  The JSON must be complete and follow this exact structure:
  {
    "title": "Recipe Name",
    "ingredients": ["item 1", "item 2"],
    "steps": ["step 1", "step 2"],
    "cookingTime": "30 mins",
    "calories": 250,
    "diet": "${diet}",
    "cuisine": "${cuisine}"
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // استخراج الـ JSON بشكل آمن من النص المستلم
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    
    if (jsonStart === -1) {
      console.error("Raw AI Response:", text);
      throw new Error("AI did not return a valid JSON object");
    }

    const recipe = JSON.parse(text.substring(jsonStart, jsonEnd));

    // إضافة البيانات الإضافية للموديل
    recipe.sourceIngredients = cleanIngredients.map(item => item.toLowerCase().trim());
    recipe.image = generateRecipeImage(recipe);
    
    return recipe;
  } catch (error) {
    console.error("Detailed AI Error:", error); // سيظهر لكِ السبب الحقيقي في الـ Terminal
    throw createError("AI generation failed: " + (error.message || "Unknown error"), 500);
  }
}

/**
 * Refine existing recipe with AI
 */
async function refineRecipe(data) {
  const { recipe, userMessage } = data;
  if (!recipe || !userMessage) throw createError("Recipe and message are required", 400);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt = `Modify this recipe: ${JSON.stringify(recipe)} based on: ${userMessage}. Return ONLY valid JSON.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const updatedRecipe = JSON.parse(response.text());
    updatedRecipe.image = generateRecipeImage(updatedRecipe);
    return updatedRecipe;
  } catch (error) {
    console.error("AI Refinement Error:", error);
    throw createError("AI refinement failed.", 500);
  }
}

/**
 * Database Operations
 */
async function saveRecipe(recipe) {
  if (!recipe.createdBy) throw createError("Authentication required", 401);
  
  // Check if a recipe with the same title from the same user exists
  const existing = await Recipe.findOne({
    createdBy: recipe.createdBy,
    title: recipe.title
  });

  // If it exists, just return it (idempotent - already saved)
  if (existing) {
    return existing;
  }
  
  return await new Recipe(recipe).save();
}

async function getMyRecipes(userId) {
  return await Recipe.find({ createdBy: userId }).sort({ createdAt: -1 });
}

async function getAllRecipes() {
  return await Recipe.find().sort({ createdAt: -1 });
}

async function getRecipeById(id) {
  return await Recipe.findById(id);
}

async function updateRecipe(id, data) {
  return await Recipe.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

async function patchRecipe(id, data) {
  return await Recipe.findByIdAndUpdate(id, { $set: data }, { new: true });
}

async function deleteRecipe(id) {
  return await Recipe.findByIdAndDelete(id);
}

async function deleteAllRecipes() {
  return await Recipe.deleteMany();
}

module.exports = {
  generateRecipe,
  refineRecipe,
  saveRecipe,
  getMyRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  patchRecipe,
  deleteRecipe,
  deleteAllRecipes,
};
