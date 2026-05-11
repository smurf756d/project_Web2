const myRecipeService = require("../services/myRecipe.service");

/**
 * @desc    Create recipe for logged-in user
 * @route   POST /api/v1/my-recipes
 * @access  Private
 */
async function createMyRecipe(req, res) {
  try {
    const {
      title,
      category,
      type,
      cuisine,
      ingredients,
      instructions,
      time,
      calories,
    } = req.body;

    /**
     * Validate required recipe fields
     */
    if (!title || !ingredients || !instructions || !time || !calories) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    /**
     * Create recipe and link it to logged-in user.
     * category is used for static card images:
     * arabic, italian, asian, any
     */
   const recipe = await myRecipeService.createMyRecipe({
  title,
  category: category || cuisine || type || "any",
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
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

/**
 * @desc    Get logged-in user's recipes with pagination, search, and filters
 * @route   GET /api/v1/my-recipes?page=1&limit=5
 * @access  Private
 */
async function getMyRecipes(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const filters = {
      search: req.query.search,
      maxCalories: req.query.maxCalories,
      maxTime: req.query.maxTime,
      sort: req.query.sort,
    };

    const result = await myRecipeService.getMyRecipes(
      req.user._id,
      page,
      limit,
      filters
    );

    res.status(200).json({
      success: true,
      totalRecipes: result.totalRecipes,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      results: result.recipes.length,
      data: result.recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

/**
 * @desc    Update logged-in user's recipe
 * @route   PUT /api/v1/my-recipes/:id
 * @access  Private
 */
async function updateMyRecipe(req, res) {
  try {
    const recipe = await myRecipeService.updateMyRecipe(
      req.params.id,
      req.user._id,
      req.body
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found or not allowed",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

/**
 * @desc    Delete logged-in user's recipe
 * @route   DELETE /api/v1/my-recipes/:id
 * @access  Private
 */
async function deleteMyRecipe(req, res) {
  try {
    const recipe = await myRecipeService.deleteMyRecipe(
      req.params.id,
      req.user._id
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found or not allowed",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = {
  createMyRecipe,
  getMyRecipes,
  updateMyRecipe,
  deleteMyRecipe,
};