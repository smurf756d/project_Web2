import { useEffect, useMemo, useState } from "react";
import Topbar from "../components/layout/Topbar";
import RecipeCard from "../components/RecipeCard";
import {
  getMyRecipes,
  updateMyRecipe,
  deleteMyRecipe,
} from "../api/myRecipeApi";
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
  const recipesPerPage = 3;

  /**
   * Fetch recipes whenever page changes
   */
  useEffect(() => {
    fetchRecipes();
  }, [currentPage]);

  /**
 * Load logged-in user's recipes from backend
 */
const fetchRecipes = async () => {
  try {
    setLoading(true);

    const data = await getMyRecipes(currentPage, recipesPerPage);

    setRecipes(data.data || []);
  } catch (error) {
    console.error("Failed to fetch recipes", error);
  } finally {
    setLoading(false);
  }
};

  /**
   * Filter recipes locally by title
   */
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [recipes, searchTerm]);

 
  /**
 * Recipes already come paginated from backend
 */
const visibleRecipes = filteredRecipes;

/**
 * Keep at least one page visible
 */
const totalPages = 1;
  /**
   * Delete recipe from backend
   */
  const handleDelete = async () => {
    try {
      await deleteMyRecipe(selectedRecipe._id);

      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== selectedRecipe._id)
      );

      setSelectedRecipe(null);
    } catch (error) {
      console.error("Failed to delete recipe", error);
    }
  };

  /**
   * Toggle favorite locally for now
   */
  const handleToggleFavorite = (id) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe._id === id
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe
      )
    );
  };

  /**
   * Open edit modal and fill form with selected recipe data
   */
  const openEditModal = (recipe) => {
    setEditingRecipe(recipe);

    setEditForm({
      title: recipe.title || "",
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join(", ")
        : recipe.ingredients || "",
      instructions: recipe.instructions || "",
      time: recipe.time || "",
      calories: recipe.calories || "",
    });
  };

  /**
   * Update edit form values
   */
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  /**
   * Save updated recipe to backend
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

    if (Number(editForm.time) <= 0 || Number(editForm.calories) <= 0) {
      alert("Time and calories must be greater than 0");
      return;
    }

    try {
      const updatedRecipe = {
        title: editForm.title.trim(),
        ingredients: editForm.ingredients
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        instructions: editForm.instructions.trim(),
        time: Number(editForm.time),
        calories: Number(editForm.calories),
      };

      const response = await updateMyRecipe(editingRecipe._id, updatedRecipe);

      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe._id === editingRecipe._id ? response.data : recipe
        )
      );

      setEditingRecipe(null);
    } catch (error) {
      console.error("Failed to update recipe", error);
    }
  };

  return (
    <div className="my-recipes-page">
      <section className="my-recipes-main">
        <Topbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <section className="recipes-toolbar">
          <div className="filter-box">
            <i className="bi bi-search"></i>
            <select>
              <option>Search recipes...</option>
              <option>Newest</option>
              <option>Lowest Calories</option>
              <option>Fastest Cooking</option>
            </select>
          </div>

          <button className="add-recipe-btn">
            <i className="bi bi-plus-lg"></i>
            Add New Recipe
          </button>
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
                recipe={{
                  ...recipe,
                  id: recipe._id,
                }}
                onDelete={setSelectedRecipe}
                onToggleFavorite={handleToggleFavorite}
                onEdit={openEditModal}
                onView={setViewingRecipe}
              />
            ))}
          </section>
        ) : (
          <div className="empty-state">
            <i className="bi bi-journal-x"></i>
            <h4>No recipes found</h4>
            <p>Try searching for another recipe.</p>
          </div>
        )}

        <section className="pagination-area">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            Next
          </button>
        </section>
      </section>

      {viewingRecipe && (
        <div className="modal-backdrop-custom">
          <div className="view-modal">
            <img
              src={viewingRecipe.image}
              alt={viewingRecipe.title}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x230?text=No+Image";
              }}
            />

            <h3>{viewingRecipe.title}</h3>

            <div className="view-info">
              <span>
                <i className="bi bi-clock"></i> {viewingRecipe.time} min
              </span>
              <span>
                <i className="bi bi-fire"></i> {viewingRecipe.calories} cal
              </span>
            </div>

            <div className="view-section">
              <h5>Ingredients</h5>
              <p>
                {Array.isArray(viewingRecipe.ingredients)
                  ? viewingRecipe.ingredients.join(", ")
                  : viewingRecipe.ingredients || "No ingredients listed."}
              </p>
            </div>

            <div className="view-section">
              <h5>Instructions</h5>
              <p>{viewingRecipe.instructions || "No instructions listed."}</p>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setViewingRecipe(null)}
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
            <h5>Are you sure you want to delete?</h5>
            <p>{selectedRecipe.title}</p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setSelectedRecipe(null)}
              >
                Cancel
              </button>

              <button className="confirm-delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editingRecipe && (
        <div className="modal-backdrop-custom">
          <form className="edit-modal" onSubmit={handleSaveEdit}>
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
                onClick={() => setEditingRecipe(null)}
              >
                Cancel
              </button>

              <button type="submit" className="save-edit-btn">
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