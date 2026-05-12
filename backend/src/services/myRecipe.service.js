const MyRecipe = require("../models/MyRecipe");

/**
 * @desc Create a new recipe for logged-in user
 */
async function createMyRecipe(recipeData) {
  const recipe = new MyRecipe({
    ...recipeData,
    calories: Number(recipeData.calories),
    time: Number(recipeData.time),
  });

  return await recipe.save();
}
/**
 * @desc Get user's recipes with pagination, search, and sorting
 */
async function getMyRecipes(userId, page, limit, filters = {}) {
  const skip = (page - 1) * limit;

  const query = {
    user: userId,
  };

  if (filters.search) {
    query.title = {
      $regex: filters.search,
      $options: "i",
    };
  }

  let recipes = await MyRecipe.find(query);

  if (filters.sort === "lowestCalories") {
    recipes.sort(
      (a, b) => Number(a.calories) - Number(b.calories)
    );
  } else if (filters.sort === "fastestCooking") {
    recipes.sort(
      (a, b) => Number(a.time) - Number(b.time)
    );
  } else {
    recipes.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  const totalRecipes = recipes.length;

  const paginatedRecipes = recipes.slice(
    skip,
    skip + limit
  );

  return {
    recipes: paginatedRecipes,
    totalRecipes,
    currentPage: page,
    totalPages: Math.ceil(totalRecipes / limit),
  };
}

/**
 * @desc Update user's recipe
 */
async function updateMyRecipe(recipeId, userId, updateData) {
  const finalUpdateData = {
    ...updateData,
  };

  if (updateData.calories) {
    finalUpdateData.calories = Number(updateData.calories);
  }

  if (updateData.time) {
    finalUpdateData.time = Number(updateData.time);
  }


  return await MyRecipe.findOneAndUpdate(
    {
      _id: recipeId,
      user: userId,
    },
    finalUpdateData,
    {
      new: true,
      runValidators: true,
    }
  );
}

/**
 * @desc Delete user's recipe
 */
async function deleteMyRecipe(recipeId, userId) {
  return await MyRecipe.findOneAndDelete({
    _id: recipeId,
    user: userId,
  });
}

module.exports = {
  createMyRecipe,
  getMyRecipes,
  updateMyRecipe,
  deleteMyRecipe,
};