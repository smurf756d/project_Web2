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

/**
 * @desc    Create new recipe
 * @route   POST /api/v1/recipes
 * @access  Private
 */
async function createRecipe(req, res) {
  try {
    const {
      title,
      category,
      ingredients,
      instructions,
      time,
      calories,
    } = req.body;

    if (
      !title ||
      !category ||
      !ingredients ||
      !instructions ||
      !time ||
      !calories
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const recipe = await recipeService.saveRecipe({
      title,
      category,
      ingredients,
      instructions,
      time,
      calories,
      image: req.body.image || "",
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      data: recipe,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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