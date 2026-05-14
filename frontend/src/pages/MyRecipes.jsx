import { useEffect, useState } from "react";
import RecipeCard from "../components/myRecipes/RecipeCard";
import {
  getMyRecipes,
  updateMyRecipe,
  deleteMyRecipe,
} from "../api/myRecipeApi";

import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../api/favoriteRecipeApi";

import "../styles/recipesPages.css";

function MyRecipes() {
  /**
   * Store recipes fetched from backend
   */
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Search input value
   */
  const [searchTerm, setSearchTerm] = useState("");


  /**
   * Selected recipe for delete confirmation modal
   */
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  /**
   * Selected recipe for view modal
   */
  const [viewingRecipe, setViewingRecipe] = useState(null);

  /**
   * Selected recipe for edit modal
   */
  const [editingRecipe, setEditingRecipe] = useState(null);

  /**
   * Edit form state
   */
  const [editForm, setEditForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: "",
    calories: "",
  });

  /**
   * Pagination state
   */
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const recipesPerPage = 3;

  /**
   * Normalize recipe shape from backend
   */
  const normalizeRecipe = (recipe) => {
    return {
      ...recipe,

      

      id: recipe._id,

      image: recipe.image || "",

      instructions:
        recipe.instructions ||
        (Array.isArray(recipe.steps)
          ? recipe.steps.join("\n")
          : ""),

      time:
        recipe.time ||
        parseInt(recipe.cookingTime) ||
        30,

      calories:
        recipe.calories
          ? parseInt(recipe.calories)
          : 0,
    };
  };

  /**
   * Fetch recipes whenever page changes
   */
   /**
 * Load recipes from backend
 */
const fetchRecipes = async () => {
  try {
    setLoading(true);

    const recipesData = await getMyRecipes(
      currentPage,
      recipesPerPage,
      searchTerm,
    );

    setTotalPages(recipesData.totalPages || 1);

    const favoritesData = await getFavorites(1, 100);

    const favoriteRecipeIds = (favoritesData.data || [])
      .filter((favorite) => favorite.recipe)
      .map((favorite) => favorite.recipe._id);

    const normalizedRecipes = (recipesData.data || [])
      .map(normalizeRecipe)
      .map((recipe) => ({
        ...recipe,
        isFavorite: favoriteRecipeIds.includes(recipe._id),
      }));

    setRecipes(normalizedRecipes);
  } catch (error) {
    console.error("Failed to fetch recipes", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchRecipes();
}, [currentPage, searchTerm]);

useEffect(() => {
  setCurrentPage(1);
}, [searchTerm]);

const visibleRecipes = recipes;
  /**
   * Delete recipe
   */
  const handleDelete = async () => {
    try {
      await deleteMyRecipe(selectedRecipe._id);

      setRecipes((prevRecipes) =>
        prevRecipes.filter(
          (recipe) =>
            recipe._id !== selectedRecipe._id
        )
      );

      setSelectedRecipe(null);
    } catch (error) {
      console.error("Failed to delete recipe", error);
    }
  };

  /**
   * Add or remove favorite
   */
const handleToggleFavorite = async (id) => {
  try {
    const recipe = recipes.find(
      (item) => item._id === id
    );

    if (!recipe) return;

    if (recipe.isFavorite) {
      await removeFavorite(id);
    } else {
      await addFavorite(id);
    }

    await fetchRecipes();
  } catch (error) {
    console.error(
      "Failed to update favorite",
      error
    );
  }
};


  /**
   * Open edit modal
   */
  const openEditModal = (recipe) => {
    setEditingRecipe(recipe);

    setEditForm({
      title: recipe.title || "",

      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join(", ")
        : recipe.ingredients || "",

      instructions:
        recipe.instructions || "",

      time: recipe.time || "",

      calories: recipe.calories || "",
    });
  };

  /**
   * Handle edit form changes
   */
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  /**
   * Save updated recipe
   */
  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!editForm.title.trim()) {
      alert("Recipe name is required");
      return;
    }

    if (!editForm.ingredients.trim()) {
      alert("Ingredients are required");
      return;
    }

    if (!editForm.instructions.trim()) {
      alert("Instructions are required");
      return;
    }

    if (
      Number(editForm.time) <= 0 ||
      Number(editForm.calories) <= 0
    ) {
      alert(
        "Time and calories must be greater than 0"
      );
      return;
    }

    try {
      const updatedRecipe = {
        title: editForm.title.trim(),

        ingredients: editForm.ingredients
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        instructions:
          editForm.instructions.trim(),

        time: Number(editForm.time),

        calories: Number(editForm.calories),
      };

      const response = await updateMyRecipe(
        editingRecipe._id,
        updatedRecipe
      );

      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe._id === editingRecipe._id
            ? response.data
            : recipe
        )
      );

      setEditingRecipe(null);
    } catch (error) {
      console.error(
        "Failed to update recipe",
        error
      );
    }
  };

  return (
    <div className="my-recipes-page">
      <section className="my-recipes-main">
        <div className="recipes-header">
  <div className="recipes-title-box">
  <h1>My Recipes</h1>

  <p>
    Manage and view your saved healthy recipes
  </p>
</div>
</div>

        <section className="recipes-toolbar">
          <div className="filter-box">
            <i className="bi bi-search"></i>

<input
  type="text"
  placeholder="Search recipes..."
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }}
  className="search-input"
/>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <button
              className="add-recipe-btn"
              onClick={() =>
                (window.location.href =
                  "/favorites")
              }
            >
              <i className="bi bi-heart"></i>
              My Favorites
            </button>

            <button
              className="add-recipe-btn"
              onClick={() =>
                (window.location.href =
                  "/generate-recipe")
              }
            >
              <i className="bi bi-plus-lg"></i>
              Add New Recipe
            </button>
          </div>
        </section>

        {loading ? (
          <div className="empty-state">
            <h4>Loading recipes...</h4>
          </div>
        ) : visibleRecipes.length > 0 ? (
          <section className="recipes-grid">
            {visibleRecipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onDelete={setSelectedRecipe}
                onToggleFavorite={
                  handleToggleFavorite
                }
                onEdit={openEditModal}
                onView={setViewingRecipe}
              />
            ))}
          </section>
        ) : (
          <div className="empty-state">
            <i className="bi bi-journal-x"></i>

            <h4>No recipes found</h4>

            <p>
              Try searching for another recipe.
            </p>
          </div>
        )}

        <section className="pagination-area">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((page) => page - 1)
            }
          >
            Prev
          </button>

          {[...Array(totalPages)].map(
            (_, index) => (
              <button
                key={index}
                className={
                  currentPage === index + 1
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(index + 1)
                }
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) => page + 1)
            }
          >
            Next
          </button>
        </section>
      </section>

      {viewingRecipe && (
        <div className="modal-backdrop-custom">
          <div className="view-modal">
            

            <h3>{viewingRecipe.title}</h3>

            <div className="view-info">
              <span>
                <i className="bi bi-clock"></i>{" "}
                {viewingRecipe.time} min
              </span>

              <span>
                <i className="bi bi-fire"></i>{" "}
                {viewingRecipe.calories} cal
              </span>
            </div>

            <div className="view-section">
              <h5>Ingredients</h5>

              <p>
                {Array.isArray(
                  viewingRecipe.ingredients
                )
                  ? viewingRecipe.ingredients.join(
                      ", "
                    )
                  : viewingRecipe.ingredients ||
                    "No ingredients listed."}
              </p>
            </div>

            <div className="view-section">
              <h5>Instructions</h5>

              <p>
                {viewingRecipe.instructions ||
                  "No instructions listed."}
              </p>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() =>
                  setViewingRecipe(null)
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedRecipe && (
        <div className="modal-backdrop-custom">
          <div className="delete-modal">
            <h5>
              Are you sure you want to delete?
            </h5>

            <p>{selectedRecipe.title}</p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() =>
                  setSelectedRecipe(null)
                }
              >
                Cancel
              </button>

              <button
                className="confirm-delete-btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editingRecipe && (
        <div className="modal-backdrop-custom">
          <form
            className="edit-modal"
            onSubmit={handleSaveEdit}
          >
            <h5>Edit Recipe</h5>

            <label>Recipe Name</label>

            <input
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
            />

            <label>Ingredients</label>

            <textarea
              name="ingredients"
              value={editForm.ingredients}
              onChange={handleEditChange}
              placeholder="Example: chicken, rice, tomato..."
            />

            <label>Instructions</label>

            <textarea
              name="instructions"
              value={editForm.instructions}
              onChange={handleEditChange}
              placeholder="Write recipe instructions..."
            />

            <label>Cooking Time</label>

            <input
              type="number"
              name="time"
              value={editForm.time}
              onChange={handleEditChange}
              min="1"
            />

            <label>Calories</label>

            <input
              type="number"
              name="calories"
              value={editForm.calories}
              onChange={handleEditChange}
              min="1"
            />

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() =>
                  setEditingRecipe(null)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-edit-btn"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default MyRecipes;
