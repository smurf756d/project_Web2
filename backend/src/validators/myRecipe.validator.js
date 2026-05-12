/**
 * @desc Validate recipe creation request
 */
const validateCreateRecipe = (
  req,
  res,
  next
) => {
  const {
    title,
    ingredients,
    instructions,
    time,
    calories,
  } = req.body;

  /**
   * Validate required fields
   */
  if (
    !title ||
    !ingredients ||
    !instructions ||
    !time ||
    !calories
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Please fill all required fields",
    });
  }

  /**
   * Validate ingredients array
   */
  if (!Array.isArray(ingredients)) {
    return res.status(400).json({
      success: false,
      message:
        "Ingredients must be an array",
    });
  }

  /**
   * Validate numeric values
   */
  if (
    isNaN(time) ||
    isNaN(calories)
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Time and calories must be numbers",
    });
  }

  next();
};

module.exports = {
  validateCreateRecipe,
};