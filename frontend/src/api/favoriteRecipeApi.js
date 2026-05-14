import apiClient from "./apiClient";

/**
 * Get logged-in user's favorite recipes
 */
export const getFavorites = async () => {
  try {
    // Get all user recipes from Recipe collection (which has isFavorite flag)
    const response = await apiClient.get("/recipes/my");
    const recipesArray = Array.isArray(response.data) 
      ? response.data 
      : (response.data.data || []);
    
    // Filter recipes where isFavorite is true
    const favorites = recipesArray.filter(recipe => recipe.isFavorite === true);
    console.log(`[getFavorites] Found ${favorites.length} favorite recipes`);
    return favorites;
  } catch (error) {
    console.error("[getFavorites] Error fetching favorites:", error);
    return [];
  }
};

/**
 * Add recipe to favorites
 */
export const addFavorite = async (recipeId) => {
  const response = await apiClient.patch(
    `/recipes/${recipeId}`,
    { isFavorite: true }
  );
  console.log(`[addFavorite] Recipe marked as favorite: ${recipeId}`);
  return response.data;
};

/**
 * Remove recipe from favorites
 */
export const removeFavorite = async (recipeId) => {
  const response = await apiClient.patch(
    `/recipes/${recipeId}`,
    { isFavorite: false }
  );
  console.log(`[removeFavorite] Recipe removed from favorites: ${recipeId}`);
  return response.data;
};