const recipeService = require("../services/generateRecipeService");
const asyncHandler = require("../middleware/asyncHandler");

// Standard error helper
function createNotFoundError() {
  const error = new Error("Recipe not found");
  error.statusCode = 404;
  return error;
}

// AI recipe generation
const generateRecipe = asyncHandler(async (req, res, next) => {
  console.log(`[generateRecipe] Handler called by user: ${req.user ? req.user._id : "anonymous"}`);
  const recipe = await recipeService.generateRecipe(req.body);
  
  // Track that user generated a recipe today
  if (req.user) {
    await recipeService.trackGeneratedRecipe(req.user._id);
  }
  
  // Don't auto-save - let user click "Save Recipe" button to save
  console.log(`[generateRecipe] ✅ Recipe generated (preview only, not saved yet)`);
  
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    success: true,
    message: "Recipe generated successfully",
    data: recipe,
  });
});

// AI recipe refinement based on feedback
const refineRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await recipeService.refineRecipe(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    success: true,
    message: "Recipe refined successfully",
    data: recipe,
  });
});

// Save recipe and link to authenticated user
const createRecipe = asyncHandler(async (req, res, next) => {
  console.log(`[createRecipe] Handler called by user: ${req.user._id}`);
  const recipeData = req.body;
  recipeData.createdBy = req.user._id;
  
  // Mark as AI-generated if it came from the generate endpoint
  if (!recipeData.isAIGenerated) {
    recipeData.isAIGenerated = true; // Generated recipes are marked as such
  }

  const savedRecipe = await recipeService.saveRecipe(recipeData);
  console.log(`[createRecipe] ✅ Recipe saved by user: ${savedRecipe.title} (ID: ${savedRecipe._id})`);
  res.setHeader('Content-Type', 'application/json');
  res.status(201).json({
    success: true,
    message: "Recipe saved successfully",
    data: savedRecipe,
  });
});

// Get recipes saved by the current user
const getMyRecipes = asyncHandler(async (req, res, next) => {
  console.log(`[getMyRecipes] Fetching recipes for user: ${req.user._id}`);
  const recipes = await recipeService.getMyRecipes(req.user._id);

  console.log(`[getMyRecipes] ✅ Found ${recipes.length} recipes for user`);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    success: true,
    count: recipes.length,
    data: recipes,
  });
});

// Get all recipes in database
const getRecipes = asyncHandler(async (req, res, next) => {
  const recipes = await recipeService.getAllRecipes();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    success: true,
    count: recipes.length,
    data: recipes,
  });
});

// Get single recipe by ID
const getRecipeById = asyncHandler(async (req, res, next) => {
  const recipe = await recipeService.getRecipeById(req.params.id);
  if (!recipe) throw createNotFoundError();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ success: true, data: recipe });
});

// Full update of recipe
const updateRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await recipeService.updateRecipe(req.params.id, req.body);
  if (!recipe) throw createNotFoundError();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    success: true,
    message: "Recipe updated successfully",
    data: recipe,
  });
});

// Partial update of recipe
const patchRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await recipeService.patchRecipe(req.params.id, req.body);
  if (!recipe) throw createNotFoundError();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    success: true,
    message: "Recipe partially updated successfully",
    data: recipe,
  });
});

// Delete specific recipe
const deleteRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await recipeService.deleteRecipe(req.params.id);
  if (!recipe) throw createNotFoundError();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ success: true, message: "Recipe deleted successfully" });
});

// Delete all recipes
const deleteAllRecipes = asyncHandler(async (req, res, next) => {
  const result = await recipeService.deleteAllRecipes();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    success: true,
    message: "All recipes deleted successfully",
    deletedCount: result.deletedCount,
  });
});

module.exports = {
  generateRecipe,
  refineRecipe,
  createRecipe,
  getMyRecipes,
  getRecipes,
  getRecipeById,
  updateRecipe,
  patchRecipe,
  deleteRecipe,
  deleteAllRecipes,
};