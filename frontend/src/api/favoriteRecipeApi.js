import apiClient from "./apiClient";

/**
 * Get logged-in user's favorite recipes
 */
export const getFavorites = async () => {
  try {
    // Use dedicated favorites endpoints which persist to the favorites collection
    const response = await apiClient.get("/favorites");
    const favoritesArray = response.data && response.data.data ? response.data.data : [];
    console.log(`[getFavorites] Found ${favoritesArray.length} favorite recipes`);
    return favoritesArray;
  } catch (error) {
    console.error("[getFavorites] Error fetching favorites:", error);
    return [];
  }
};

/**
 * Add recipe to favorites
 */
export const addFavorite = async (recipeId) => {
  const response = await apiClient.post(`/favorites/${recipeId}`);
  console.log(`[addFavorite] Recipe added to favorites: ${recipeId}`);
  return response.data;
};

/**
 * Remove recipe from favorites
 */
export const removeFavorite = async (recipeId) => {
  const response = await apiClient.delete(`/favorites/${recipeId}`);
  console.log(`[removeFavorite] Recipe removed from favorites: ${recipeId}`);
  return response.data;
};