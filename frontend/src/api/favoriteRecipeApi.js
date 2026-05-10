import apiClient from "./apiClient";

/**
 * Get logged-in user's favorite recipes
 */
export const getFavorites = async (
  page = 1,
  limit = 5
) => {
  const response = await apiClient.get(
    `/favorites?page=${page}&limit=${limit}`
  );

  return response.data;
};

/**
 * Add recipe to favorites
 */
export const addFavorite = async (recipeId) => {
  const response = await apiClient.post(
    `/favorites/${recipeId}`
  );

  return response.data;
};

/**
 * Remove recipe from favorites
 */
export const removeFavorite = async (recipeId) => {
  const response = await apiClient.delete(
    `/favorites/${recipeId}`
  );

  return response.data;
};