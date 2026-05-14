import apiClient from "./apiClient";

/**
 * Get logged-in user's recipes
 */
export const getMyRecipes = async () => {
  const response = await apiClient.get("/recipes/my");
  return response.data;
};

/**
 * Create new recipe
 */
export const createMyRecipe = async (
  recipeData
) => {
  const response = await apiClient.post(
    "/recipes",
    recipeData
  );

  return response.data;
};

/**
 * Update existing recipe
 */
export const updateMyRecipe = async (
  recipeId,
  recipeData
) => {
  const response = await apiClient.patch(
    `/recipes/${recipeId}`,
    recipeData
  );

  return response.data;
};

/**
 * Delete recipe
 */
export const deleteMyRecipe = async (
  recipeId
) => {
  const response = await apiClient.delete(
    `/recipes/${recipeId}`
  );

  return response.data;
};