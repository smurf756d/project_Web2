import { useMemo, useState } from "react";
import Topbar from "../components/layout/Topbar";
import RecipeCard from "../components/RecipeCard";
import { recipesMock } from "../data/recipesMock";
import "../styles/recipesPages.css";

function MyRecipes() {
  const [recipes, setRecipes] = useState(recipesMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [viewingRecipe, setViewingRecipe] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    ingredients: "",
    time: "",
    calories: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const recipesPerPage = 3;

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [recipes, searchTerm]);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const visibleRecipes = filteredRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  const handleDelete = () => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== selectedRecipe.id)
    );
    setSelectedRecipe(null);
  };

  const handleToggleFavorite = (id) => {
    setRecipes((prevRecipes) => {
      const updatedRecipes = prevRecipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe
      );

      const favoriteRecipes = updatedRecipes.filter(
        (recipe) => recipe.isFavorite
      );

      localStorage.setItem("favorites", JSON.stringify(favoriteRecipes));

      return updatedRecipes;
    });
  };

  const openEditModal = (recipe) => {
    setEditingRecipe(recipe);
    setEditForm({
      title: recipe.title,
      ingredients: recipe.ingredients || "",
      time: recipe.time,
      calories: recipe.calories,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();

    if (!editForm.title.trim()) {
      alert("Recipe name is required");
      return;
    }

    if (!editForm.ingredients.trim()) {
      alert("Ingredients are required");
      return;
    }

    if (Number(editForm.time) <= 0 || Number(editForm.calories) <= 0) {
      alert("Time and calories must be greater than 0");
      return;
    }

    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === editingRecipe.id
          ? {
              ...recipe,
              title: editForm.title.trim(),
              ingredients: editForm.ingredients.trim(),
              time: Number(editForm.time),
              calories: Number(editForm.calories),
            }
          : recipe
      )
    );

    setEditingRecipe(null);
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

        {visibleRecipes.length > 0 ? (
          <section className="recipes-grid">
            {visibleRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
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

          {[...Array(totalPages || 1)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
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
              <p>{viewingRecipe.ingredients || "No ingredients listed."}</p>
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