const recipeService = require("../services/recipeService");

async function generateRecipe(req, res) {
  try {
    const recipe = await recipeService.generateRecipe(req.body);
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createRecipe(req, res) {
  try {
    const recipe = await recipeService.saveRecipe(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getRecipes(req, res) {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  generateRecipe,
  createRecipe,
  getRecipes,
  deleteRecipe,
};