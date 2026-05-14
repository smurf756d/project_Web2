/**
 * Simple validation helpers.
 * These functions keep validation rules reusable and clean.
 */

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

/**
 * Validate register request body
 */
const validateRegister = (body) => {
  const errors = [];

  if (
    !body.fullName ||
    !body.fullName.trim()
  ) {
    errors.push("Full name is required");
  }

  if (
    !body.email ||
    !body.email.trim()
  ) {
    errors.push("Email is required");
  } else if (
    !isValidEmail(body.email)
  ) {
    errors.push(
      "Please enter a valid email"
    );
  }

  if (!body.password) {
    errors.push("Password is required");
  } else if (
    body.password.length < 8
  ) {
    errors.push(
      "Password must be at least 8 characters"
    );
  }

  if (!body.confirmPassword) {
    errors.push(
      "Confirm password is required"
    );
  } else if (
    body.password !==
    body.confirmPassword
  ) {
    errors.push(
      "Passwords do not match"
    );
  }

  return errors;
};

/**
 * Validate login request body
 */
const validateLogin = (body) => {
  const errors = [];

  if (
    !body.email ||
    !body.email.trim()
  ) {
    errors.push("Email is required");
  }

  if (!body.password) {
    errors.push("Password is required");
  }

  return errors;
};

/**
 * Validate generate recipe request body
 */
const validateGenerateRecipe = (
  body
) => {
  const errors = [];

  const {
    ingredients,
    diet,
    cookingTime,
    cuisine,
  } = body;

  if (
    !ingredients ||
    !Array.isArray(ingredients) ||
    ingredients.length === 0
  ) {
    errors.push(
      "Ingredients are required"
    );
  }

  if (!diet) {
    errors.push(
      "Diet preference is required"
    );
  }

  if (!cookingTime) {
    errors.push(
      "Cooking time is required"
    );
  }

  if (!cuisine) {
    errors.push(
      "Cuisine type is required"
    );
  }

  return errors;
};

/**
 * Validate recipe creation request
 */
const validateCreateRecipe = (
  body
) => {
  const errors = [];

  const {
    title,
    ingredients,
    instructions,
    time,
    calories,
  } = body;

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
    errors.push(
      "Please fill all required fields"
    );
  }

  /**
   * Validate ingredients array
   */
  if (
    ingredients &&
    !Array.isArray(ingredients)
  ) {
    errors.push(
      "Ingredients must be an array"
    );
  }

  /**
   * Validate numeric values
   */
  if (
    time &&
    isNaN(time)
  ) {
    errors.push(
      "Time must be a number"
    );
  }

  if (
    calories &&
    isNaN(calories)
  ) {
    errors.push(
      "Calories must be a number"
    );
  }

  return errors;
};

module.exports = {
  validateRegister,
  validateLogin,
  validateGenerateRecipe,
  validateCreateRecipe,
};