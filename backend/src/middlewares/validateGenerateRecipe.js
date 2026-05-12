function validateGenerateRecipe(req, res, next) {
  const { ingredients, diet, cookingTime, cuisine } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Ingredients are required",
    });
  }

  if (!diet) {
    return res.status(400).json({
      success: false,
      message: "Diet preference is required",
    });
  }

  if (!cookingTime) {
    return res.status(400).json({
      success: false,
      message: "Cooking time is required",
    });
  }

  if (!cuisine) {
    return res.status(400).json({
      success: false,
      message: "Cuisine type is required",
    });
  }

  next();
}

module.exports = validateGenerateRecipe;