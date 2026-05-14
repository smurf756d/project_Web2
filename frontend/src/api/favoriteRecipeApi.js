import apiClient from "./apiClient";

/**
 * Get logged-in user's favorite recipes
 */
export const getFavorites = async () => {
  // Get all user recipes and filter for favorites on frontend
  const response = await apiClient.get("/recipes/my");
  const recipesArray = Array.isArray(response.data) 
    ? response.data 
    : (response.data.data || []);
  
  // Filter recipes where isFavorite is true
  return recipesArray.filter(recipe => recipe.isFavorite === true);
};

/**
 * Add recipe to favorites
 */
export const addFavorite = async (recipeId) => {
  const response = await apiClient.patch(
    `/recipes/${recipeId}`,
    { isFavorite: true }
  );

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

  return response.data;
};