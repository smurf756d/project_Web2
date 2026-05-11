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

  if (
    ingredients.some(
      (item) => typeof item !== "string" || item.trim() === ""
    )
  ) {
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

function generateRecipeImage(recipe) {
  const cuisineImages = {
    Arabic:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    Italian:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    Asian:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    Any:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  };

  return cuisineImages[recipe.cuisine] || cuisineImages.Any;
}

async function generateRecipe(data) {
  validateGenerateRecipeInput(data);

  if (!process.env.GEMINI_API_KEY) {
    throw createError("Gemini API key is missing", 500);
  }

  const { ingredients, diet, cookingTime, cuisine } = data;
  const cleanIngredients = ingredients.map((item) => item.trim());

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
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
  "ingredients": ["tomato", "rice", "extra ingredient if needed"],
  "steps": ["step1", "step2"],
  "cookingTime": "${cookingTime}",
  "calories": "350 kcal",
  "diet": "${diet}",
  "cuisine": "${cuisine}"
}

Rules:
- Use the given ingredients as the base.
- You may add extra ingredients if needed to make the recipe complete.
- Every ingredient must be a complete valid string.
- Do not break strings across lines.
- Do not use quotation marks inside ingredient names.
- Do not leave any array item unfinished.
- Steps must be realistic.
- Return JSON only.
`;

  let result;

  try {
    result = await model.generateContent(prompt);
  } catch (error) {
    if (error.status === 503) {
      throw createError(
        "AI service is busy right now. Please try again in a few seconds.",
        503
      );
    }

    if (error.status === 429) {
      throw createError(
        "AI request limit reached. Please try again later.",
        429
      );
    }

    throw error;
  }

  const response = await result.response;
  const text = response.text();

  const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

  try {
    const jsonStart = cleanText.indexOf("{");
    const jsonEnd = cleanText.lastIndexOf("}");
    const jsonString = cleanText.slice(jsonStart, jsonEnd + 1);

    const recipe = JSON.parse(jsonString);

    recipe.sourceIngredients = cleanIngredients.map((item) =>
      item.toLowerCase().trim()
    );

    recipe.image = generateRecipeImage(recipe);

    return recipe;
  } catch (error) {
    console.log("Gemini raw response:", cleanText);
    console.log("JSON parse error:", error.message);

    throw createError("AI response format was invalid. Please try again.", 500);
  }
}

async function refineRecipe(data) {
  const { recipe, userMessage } = data;

  if (!recipe) {
    throw createError("Recipe is required", 400);
  }

  if (!userMessage || userMessage.trim() === "") {
    throw createError("User message is required", 400);
  }

  if (!process.env.GEMINI_API_KEY) {
    throw createError("Gemini API key is missing", 500);
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `
You are helping the user adjust a cooking recipe.

Current recipe:
${JSON.stringify(recipe)}

User request:
${userMessage}

Return ONLY valid JSON in this format:
{
  "title": "Recipe title",
  "ingredients": ["ingredient1", "ingredient2"],
  "steps": ["step1", "step2"],
  "cookingTime": "30 - 60 mins",
  "calories": "400 kcal",
  "diet": "Healthy",
  "cuisine": "Arabic"
}

Rules:
- Modify the recipe based on the request.
- Return JSON only.
`;

  let result;

  try {
    result = await model.generateContent(prompt);
  } catch (error) {
    if (error.status === 503) {
      throw createError(
        "AI service is busy right now. Please try again in a few seconds.",
        503
      );
    }

    if (error.status === 429) {
      throw createError(
        "AI request limit reached. Please try again later.",
        429
      );
    }

    throw error;
  }

  const response = await result.response;
  const text = response.text();

  const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

  try {
    const jsonStart = cleanText.indexOf("{");
    const jsonEnd = cleanText.lastIndexOf("}");
    const jsonString = cleanText.slice(jsonStart, jsonEnd + 1);

    const updatedRecipe = JSON.parse(jsonString);
    updatedRecipe.image = generateRecipeImage(updatedRecipe);

    return updatedRecipe;
  } catch (error) {
    console.log("Gemini raw response:", cleanText);
    console.log("JSON parse error:", error.message);

    throw createError("AI response format was invalid. Please try again.", 500);
  }
}

async function saveRecipe(recipe, userId) {
  if (
    !recipe.title ||
    !Array.isArray(recipe.ingredients) ||
    recipe.ingredients.length === 0
  ) {
    throw createError("Recipe title and ingredients are required", 400);
  }

  if (!Array.isArray(recipe.steps) || recipe.steps.length === 0) {
    throw createError("Recipe steps are required", 400);
  }

  const sourceIngredients = recipe.sourceIngredients || [];

  if (sourceIngredients.length > 0) {
    const existingRecipe = await Recipe.findOne({
      createdBy: userId,
      sourceIngredients: {
        $all: sourceIngredients,
        $size: sourceIngredients.length,
      },
    });

    if (existingRecipe) {
      throw createError("This recipe is already saved.", 400);
    }
  }

  const newRecipe = new Recipe({
    ...recipe,
    createdBy: userId,
  });

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
  refineRecipe,
  saveRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  patchRecipe,
  deleteRecipe,
  deleteAllRecipes,
};