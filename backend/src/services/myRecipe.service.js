const MyRecipe = require("../models/MyRecipe");
const Recipe = require("../models/Recipe");
const FavoriteRecipe = require("../models/FavoriteRecipe");

/**
 * @desc Create a new recipe for logged-in user
 */
async function createMyRecipe(recipeData) {
  // Create canonical Recipe document first so we can link it from MyRecipe
  const recipeDoc = new Recipe({
    title: recipeData.title,
    image: recipeData.image || "",
    ingredients: recipeData.ingredients || [],
    instructions: recipeData.instructions || "",
    cookingTime: recipeData.time ? String(recipeData.time) : "",
    calories: recipeData.calories ? String(recipeData.calories) : "",
    createdBy: recipeData.user,
    isAIGenerated: false,
  });

  const savedRecipe = await recipeDoc.save();

  // Now create MyRecipe linked to the canonical Recipe
  const myRecipe = new MyRecipe({
    ...recipeData,
    calories: Number(recipeData.calories),
    time: Number(recipeData.time),
    recipe: savedRecipe._id,
  });

  const savedMyRecipe = await myRecipe.save();
  return savedMyRecipe;
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

  const [myRecipeDocs, recipeDocs] = await Promise.all([
    MyRecipe.find(query),
    Recipe.find({ createdBy: userId }),
  ]);

  const recipeIds = new Set(recipeDocs.map((recipe) => String(recipe._id)));
  const recipeTitles = new Set(
    recipeDocs.map((recipe) => `${recipe.title}::${String(recipe.createdBy)}`)
  );

  const recipes = myRecipeDocs.filter((recipe) => {
    if (recipe.recipe) {
      return recipeIds.has(String(recipe.recipe));
    }

    return recipeTitles.has(`${recipe.title}::${String(userId)}`);
  });

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
  // Load the original MyRecipe so we can match a Recipe document if needed
  const originalMyRecipe = await MyRecipe.findOne({
    _id: recipeId,
    user: userId,
  });

  if (!originalMyRecipe) {
    return null;
  }

  const finalUpdateData = {
    ...updateData,
  };

  if (updateData.calories !== undefined) {
    finalUpdateData.calories = Number(updateData.calories);
  }

  if (updateData.time !== undefined) {
    finalUpdateData.time = Number(updateData.time);
  }

  const updatedMyRecipe = await MyRecipe.findOneAndUpdate(
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

  // If a corresponding Recipe exists in the main Recipe collection, update it too.
  if (updatedMyRecipe) {
    // Prefer linked Recipe reference if present
    let recipeMatch = null;
    if (originalMyRecipe.recipe) {
      recipeMatch = await Recipe.findOne({ _id: originalMyRecipe.recipe, createdBy: userId });
    }

    if (!recipeMatch) {
      recipeMatch = await Recipe.findOne({ title: originalMyRecipe.title, createdBy: userId });
    }

    if (recipeMatch) {
      const recipeUpdate = {
        title: updatedMyRecipe.title,
        image: updatedMyRecipe.image || recipeMatch.image,
        ingredients: updatedMyRecipe.ingredients || recipeMatch.ingredients,
        instructions: updatedMyRecipe.instructions || recipeMatch.instructions,
        cookingTime:
          updatedMyRecipe.time !== undefined
            ? String(updatedMyRecipe.time)
            : recipeMatch.cookingTime,
        calories:
          updatedMyRecipe.calories !== undefined
            ? String(updatedMyRecipe.calories)
            : recipeMatch.calories,
      };

      await Recipe.findOneAndUpdate(
        { _id: recipeMatch._id },
        recipeUpdate,
        { new: true }
      );
    }
  }

  return updatedMyRecipe;
}

/**
 * @desc Delete user's recipe from both MyRecipe and Recipe collections
 */
async function deleteMyRecipe(recipeId, userId) {
  // First, get the MyRecipe to extract its title for matching in Recipe collection
  const myRecipeToDelete = await MyRecipe.findOne({
    _id: recipeId,
    user: userId,
  });

  if (!myRecipeToDelete) {
    return null; // Recipe not found
  }

  // Delete from MyRecipe collection
  const deletedMyRecipe = await MyRecipe.findOneAndDelete({
    _id: recipeId,
    user: userId,
  });

  if (!deletedMyRecipe) {
    return null;
  }

  // Delete from Recipe collection by matching title and createdBy
  // (in case the _ids don't match between the two collections)
  let deletedRecipe = null;
  if (myRecipeToDelete.recipe) {
    deletedRecipe = await Recipe.findOneAndDelete({ _id: myRecipeToDelete.recipe, createdBy: userId });
  }

  if (!deletedRecipe) {
    deletedRecipe = await Recipe.findOneAndDelete({
      title: myRecipeToDelete.title,
      createdBy: userId,
    });
  }

  // Remove any favorite references pointing to either the MyRecipe _id or the Recipe _id
  try {
    await FavoriteRecipe.deleteMany({ recipe: recipeId });

    if (deletedRecipe) {
      await FavoriteRecipe.deleteMany({ recipe: deletedRecipe._id });
    }
  } catch (err) {
    console.error("Failed to cleanup favorites for deleted recipe:", err);
  }

  return deletedMyRecipe;
}

module.exports = {
  createMyRecipe,
  getMyRecipes,
  updateMyRecipe,
  deleteMyRecipe,
};