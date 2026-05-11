function validateRecipe(req, res, next) {
  const { title, ingredients, steps } = req.body || {};

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Recipe title is required",
    });
  }

  if (
    !ingredients ||
    !Array.isArray(ingredients) ||
    ingredients.length === 0
  ) {
    return res.status(400).json({
      message: "At least one ingredient is required",
    });
  }

  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return res.status(400).json({
      message: "Recipe steps are required",
    });
  }

  next();
}

function validateGenerateRecipe(req, res, next) {
  const { ingredients } = req.body || {};

  if (
    !ingredients ||
    !Array.isArray(ingredients) ||
    ingredients.length === 0
  ) {
    return res.status(400).json({
      message:
        "Please provide at least one ingredient to generate a recipe",
    });
  }

  next();
}

module.exports = {
  validateRecipe,
  validateGenerateRecipe,
};