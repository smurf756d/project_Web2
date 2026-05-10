const recipeService = require("../services/recipeService");

function validateRecipeData(data) {
  if (!data) {
    return "Recipe data is required";
  }

  if (!data.title || data.title.trim() === "") {
    return "Recipe title is required";
  }

  if (!data.ingredients || !Array.isArray(data.ingredients) || data.ingredients.length === 0) {
    return "At least one ingredient is required";
  }

  if (!data.instructions || data.instructions.trim() === "") {
    return "Recipe instructions are required";
  }

  return null;
}

async function generateRecipe(req, res) {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        message: "Please provide at least one ingredient to generate a recipe",
      });
    }

    const recipe = await recipeService.generateRecipe(req.body);
    res.json(recipe);
  } catch (error) {
    console.error("Generate recipe error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createRecipe(req, res) {
  try {
    const validationError = validateRecipeData(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const recipe = await recipeService.saveRecipe(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Create recipe error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getRecipes(req, res) {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    console.error("Get recipes error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteRecipe(req, res) {
  try {
    const recipe = await recipeService.deleteRecipe(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Delete recipe error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  generateRecipe,
  createRecipe,
  getRecipes,
  deleteRecipe,
};