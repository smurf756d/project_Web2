import apiClient from "./apiClient";

/**
 * Get logged-in user's recipes
 */
export const getMyRecipes = async (
  page,
  limit,
  search
) => {
  const response = await apiClient.get(
    `/my-recipes?page=${page}&limit=${limit}&search=${search}`
  );

  return response.data;
};

/**
 * Create new recipe
 */
export const createMyRecipe = async (
  recipeData
) => {
  const response = await apiClient.post(
    "/my-recipes",
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
  const response = await apiClient.put(
    `/my-recipes/${recipeId}`,
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
    `/my-recipes/${recipeId}`
  );

  return response.data;
};