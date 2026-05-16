const { GoogleGenerativeAI } = require("@google/generative-ai");
const Recipe = require("../models/Recipe");
const MyRecipe = require("../models/MyRecipe");
const UserPreference = require("../models/UserPreference");
const FavoriteRecipe = require("../models/FavoriteRecipe");

//
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

  const prompt = `You are a professional chef. Generate a realistic recipe in valid JSON format.

User Preferences:
- Ingredients: ${cleanIngredients.join(", ")}
- Diet Type: ${diet}
- Cooking Time: ${cookingTime}
- Cuisine: ${cuisine}

IMPORTANT: Return ONLY valid JSON object with NO markdown, NO code blocks, NO extra text.
Do NOT include trailing commas or any invalid JSON syntax.

Required JSON structure (exactly like this):
{
  "title": "Descriptive Recipe Name",
  "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3"],
  "steps": ["step 1: description", "step 2: description", "step 3: description"],
  "cookingTime": "time in mins",
  "calories": number_value,
  "diet": "${diet}",
  "cuisine": "${cuisine}"
}

Generate the recipe now:`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("[generateRecipe] Raw AI response length:", text.length);

    // Extract JSON safely from the response
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) {
      console.error("[generateRecipe] Raw AI Response:", text);
      throw new Error("AI did not return a valid JSON object");
    }

    const jsonString = text.substring(jsonStart, jsonEnd);
    console.log("[generateRecipe] Extracted JSON length:", jsonString.length);

    // Parse JSON response
    let recipe;
    try {
      recipe = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("[generateRecipe] JSON parsing failed:", parseError.message);
      throw new Error("AI response contains invalid JSON: " + parseError.message);
    }

    // Validate required fields
    if (!recipe.title || !recipe.ingredients || !recipe.steps || !recipe.cookingTime || recipe.calories === undefined) {
      console.error("[generateRecipe] Missing required fields in recipe:", recipe);
      throw new Error("Generated recipe missing required fields");
    }

    // Ensure arrays are valid
    if (!Array.isArray(recipe.ingredients)) {
      recipe.ingredients = [recipe.ingredients];
    }
    if (!Array.isArray(recipe.steps)) {
      recipe.steps = [recipe.steps];
    }

    // Add source data
    recipe.sourceIngredients = cleanIngredients.map(item => item.toLowerCase().trim());
    recipe.image = generateRecipeImage(recipe);
    
    return recipe;
  } catch (error) {
    console.error("[generateRecipe] Error:", error.message);
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

  const prompt = `You are a professional chef. Modify this recipe based on user feedback.

Current Recipe: ${JSON.stringify(recipe)}

User Request: ${userMessage}

Return ONLY valid JSON with the modified recipe (same structure as input). No markdown, no code blocks, no extra text.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    // Extract JSON safely
    const jsonStart = responseText.indexOf("{");
    const jsonEnd = responseText.lastIndexOf("}") + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error("AI did not return a valid JSON object");
    }

    const jsonString = responseText.substring(jsonStart, jsonEnd);
    
    let updatedRecipe;
    try {
      updatedRecipe = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("[refineRecipe] JSON parsing failed:", parseError.message);
      throw new Error("AI response contains invalid JSON: " + parseError.message);
    }
    
    updatedRecipe.image = generateRecipeImage(updatedRecipe);
    return updatedRecipe;
  } catch (error) {
    console.error("[refineRecipe] AI Refinement Error:", error);
    throw createError("AI refinement failed: " + (error.message || "Unknown error"), 500);
  }
}

/**
 * Database Operations - Save Recipe
 * Prevents saving duplicate recipes with identical ingredients
 */
async function saveRecipe(recipe) {
  if (!recipe.createdBy) throw createError("Authentication required", 401);
  
  // Check if a recipe with the same ingredients already exists for this user
  // sourceIngredients is the normalized list of ingredients user entered
  const existing = await Recipe.findOne({
    createdBy: recipe.createdBy,
    sourceIngredients: {
      $size: recipe.sourceIngredients.length,
      $all: recipe.sourceIngredients
    }
  });

  // If an identical recipe exists (same ingredients), throw error
  if (existing) {
    console.log(`[saveRecipe] ⚠️ Recipe already exists with same ingredients: ${existing._id}`);
    throw createError("The recipe is already saved", 409);
  }
  
  // Save to Recipe collection
  const savedRecipe = await new Recipe(recipe).save();
  console.log(`[saveRecipe] ✅ Recipe saved to Recipe collection: ${savedRecipe._id}`);
  
  // Also save to MyRecipe collection for backward compatibility
  try {
    const myRecipeData = {
      title: recipe.title,
      image: recipe.image,
      ingredients: recipe.ingredients || [],
      instructions: Array.isArray(recipe.steps) 
        ? recipe.steps.join("\n") 
        : (recipe.instructions || ""),
      time: parseInt(recipe.cookingTime) || 30,
      calories: parseInt(recipe.calories) || 0,
      isFavorite: recipe.isFavorite || false,
      user: recipe.createdBy,
      recipe: savedRecipe._id,
    };
    
    const savedMyRecipe = await new MyRecipe(myRecipeData).save();
    console.log(`[saveRecipe] ✅ Recipe also saved to MyRecipe collection: ${savedMyRecipe._id}`);
    console.log(`[saveRecipe] ✅ Both collections updated successfully`);
  } catch (myRecipeError) {
    console.error("[saveRecipe] ⚠️ Error saving to MyRecipe collection:", myRecipeError.message);
    // Don't fail the entire operation if MyRecipe save fails
  }
  
  return savedRecipe;
}

async function getMyRecipes(userId) {
  console.log(`[getMyRecipes] Fetching recipes for user: ${userId}`);
  const recipes = await Recipe.find({ createdBy: userId }).sort({ createdAt: -1 });
  console.log(`[getMyRecipes] ✅ Found ${recipes.length} recipes for user`);
  return recipes;
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
  const updatedRecipe = await Recipe.findByIdAndUpdate(id, { $set: data }, { new: true });
  
  // If isFavorite is being updated, sync it to MyRecipe collection
  if (data.hasOwnProperty('isFavorite')) {
    try {
      const myRecipeByTitle = await MyRecipe.findOne({
        title: updatedRecipe.title,
        user: updatedRecipe.createdBy
      });
      
      if (myRecipeByTitle) {
        await MyRecipe.findByIdAndUpdate(
          myRecipeByTitle._id,
          { isFavorite: data.isFavorite },
          { new: true }
        );
        console.log(`[patchRecipe] ✅ Synced isFavorite to MyRecipe collection`);
      }
    } catch (error) {
      console.error("[patchRecipe] Error syncing to MyRecipe:", error.message);
      // Don't fail the operation if sync fails
    }
  }
  
  return updatedRecipe;
}

async function deleteRecipe(id) {
  // Find the recipe first to get its details
  const recipe = await Recipe.findById(id);
  
  if (!recipe) {
    return null;
  }
  
  // Delete from Recipe collection
  const deletedRecipe = await Recipe.findByIdAndDelete(id);
  
  // Also delete from MyRecipe collection, prefer linked recipe reference
  let myRecipe = null;
  try {
    myRecipe = await MyRecipe.findOne({ recipe: id, user: recipe.createdBy });

    if (!myRecipe) {
      // fallback to title matching for older entries
      myRecipe = await MyRecipe.findOne({ title: recipe.title, user: recipe.createdBy });
    }

    if (myRecipe) {
      await MyRecipe.findByIdAndDelete(myRecipe._id);
      console.log(`[deleteRecipe] ✅ Recipe deleted from both Recipe and MyRecipe collections`);
    } else {
      console.log(`[deleteRecipe] ⚠️ MyRecipe entry not found for recipe id/title: ${id} / ${recipe.title}`);
    }
  } catch (error) {
    console.error("[deleteRecipe] Error deleting from MyRecipe:", error.message);
    // Don't fail the operation if MyRecipe delete fails
  }

  // Remove any FavoriteRecipe entries referencing this recipe or the MyRecipe copy
  try {
    await FavoriteRecipe.deleteMany({ recipe: id });
    if (myRecipe && myRecipe._id) {
      await FavoriteRecipe.deleteMany({ recipe: myRecipe._id });
    }
    console.log(`[deleteRecipe] ✅ Removed favorite references for recipe ${id}`);
  } catch (err) {
    console.error("[deleteRecipe] Error cleaning up favorites:", err.message);
  }

  return deletedRecipe;
}

async function deleteAllRecipes() {
  return await Recipe.deleteMany();
}

/**
 * Track that a user generated a recipe today
 * Updates the generated count in UserPreference
 */
async function trackGeneratedRecipe(userId) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let preferences = await UserPreference.findOne({ user: userId });

    if (!preferences) {
      // Create new preference if it doesn't exist
      preferences = await UserPreference.create({
        user: userId,
        generatedCountToday: 1,
        lastGeneratedDate: today,
      });
      console.log(`[trackGeneratedRecipe] ✅ Created new preferences with generated count: 1`);
    } else {
      // Check if lastGeneratedDate is today
      const lastGeneratedDay = new Date(preferences.lastGeneratedDate);
      lastGeneratedDay.setHours(0, 0, 0, 0);

      if (lastGeneratedDay.getTime() === today.getTime()) {
        // Same day - increment count
        preferences.generatedCountToday += 1;
      } else {
        // Different day - reset count
        preferences.generatedCountToday = 1;
        preferences.lastGeneratedDate = today;
      }

      await preferences.save();
      console.log(`[trackGeneratedRecipe] ✅ Updated generated count: ${preferences.generatedCountToday}`);
    }
  } catch (error) {
    console.error("[trackGeneratedRecipe] Error tracking generated recipe:", error.message);
    // Don't fail - this is not critical
  }
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
  trackGeneratedRecipe,
};