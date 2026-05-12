import { useEffect, useMemo, useState } from "react";
import RecipeCard from "../components/RecipeCard";

import {
  getFavorites,
  removeFavorite,
} from "../api/favoriteRecipeApi";

import { updateMyRecipe } from "../api/myRecipeApi";

import "../styles/recipesPages.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedRecipe, setSelectedRecipe] =
    useState(null);

  const [viewingRecipe, setViewingRecipe] =
    useState(null);

  const [editingRecipe, setEditingRecipe] =
    useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: "",
    calories: "",
  });

  const [currentPage, setCurrentPage] =
    useState(1);

  const recipesPerPage = 3;

  /**
   * Normalize recipe shape
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

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);

      const data = await getFavorites(1, 100);

      const favoriteRecipes = (data.data || [])
        .filter((favorite) => favorite.recipe)
        .map((favorite) => {
          const normalizedRecipe =
            normalizeRecipe(
              favorite.recipe
            );

          return {
            ...normalizedRecipe,
            favoriteId: favorite._id,
            isFavorite: true,
          };
        });

      setFavorites(favoriteRecipes);
    } catch (error) {
      console.error(
        "Failed to fetch favorites",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredFavorites = useMemo(() => {
    return favorites.filter((recipe) =>
      recipe.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [favorites, searchTerm]);

  const totalPages = Math.ceil(
    filteredFavorites.length / recipesPerPage
  );

  const visibleFavorites =
    filteredFavorites.slice(
      (currentPage - 1) * recipesPerPage,
      currentPage * recipesPerPage
    );

  useEffect(() => {
    if (
      currentPage > totalPages &&
      totalPages > 0
    ) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleRemoveFavorite = async (
    recipe
  ) => {
    try {
      await removeFavorite(recipe._id);

      const updatedFavorites =
        favorites.filter(
          (item) =>
            item._id !== recipe._id
        );

      setFavorites(updatedFavorites);

      setSelectedRecipe(null);
    } catch (error) {
      console.error(
        "Failed to remove favorite",
        error
      );
    }
  };

  const handleToggleFavorite = async (
    id
  ) => {
    try {
      await removeFavorite(id);

      const updatedFavorites =
        favorites.filter(
          (item) => item._id !== id
        );

      setFavorites(updatedFavorites);
    } catch (error) {
      console.error(
        "Failed to toggle favorite",
        error
      );
    }
  };

  const openEditModal = (recipe) => {
    setEditingRecipe(recipe);

    setEditForm({
      title: recipe.title || "",

      ingredients: Array.isArray(
        recipe.ingredients
      )
        ? recipe.ingredients.join(", ")
        : recipe.ingredients || "",

      instructions:
        recipe.instructions || "",

      time: recipe.time || "",

      calories: recipe.calories || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

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

        instructions:
          editForm.instructions.trim(),

        time: Number(editForm.time),

        calories: Number(
          editForm.calories
        ),
      };

      const response =
        await updateMyRecipe(
          editingRecipe._id,
          updatedRecipe
        );

      setFavorites((prevFavorites) =>
        prevFavorites.map((recipe) =>
          recipe._id ===
          editingRecipe._id
            ? {
                ...response.data,
                id: response.data._id,
                isFavorite: true,
                favoriteId:
                  recipe.favoriteId,
              }
            : recipe
        )
      );

      setEditingRecipe(null);
    } catch (error) {
      console.error(
        "Failed to update favorite recipe",
        error
      );
    }
  };

  return (
    <div className="my-recipes-page">
      <section className="my-recipes-main">
        <section className="recipes-toolbar">
          <div className="recipes-title-box">
            <h1>Favorite Recipes</h1>

            <p>
              Your saved favorite recipes
              in one place
            </p>
          </div>
        </section>

        <section className="recipes-toolbar">
          <div className="filter-box">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(
                  e.target.value
                );
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>
        </section>

        {loading ? (
          <div className="empty-state">
            <h4>
              Loading favorites...
            </h4>
          </div>
        ) : visibleFavorites.length >
          0 ? (
          <>
            <section className="recipes-grid">
              {visibleFavorites.map(
                (recipe) => (
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    onDelete={
                      setSelectedRecipe
                    }
                    onToggleFavorite={
                      handleToggleFavorite
                    }
                    onEdit={
                      openEditModal
                    }
                    onView={
                      setViewingRecipe
                    }
                  />
                )
              )}
            </section>

            {!loading && totalPages >= 1 && (
              <section className="pagination-area">
                <button
                  disabled={
                    currentPage === 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) => page - 1
                    )
                  }
                >
                  Prev
                </button>

                {[...Array(totalPages)].map(
                  (_, index) => (
                    <button
                      key={index}
                      className={
                        currentPage ===
                        index + 1
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setCurrentPage(
                          index + 1
                        )
                      }
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) => page + 1
                    )
                  }
                >
                  Next
                </button>
              </section>
            )}
          </>
        ) : (
          <div className="empty-state">
            <i className="bi bi-heart"></i>

            <h4>
              No favorite recipes yet
            </h4>

            <p>
              Go to My Recipes and click
              the heart icon to add
              favorites.
            </p>
          </div>
        )}
      </section>

      {viewingRecipe && (
        <div className="modal-backdrop-custom">
          <div className="view-modal">
            <h3>
              {viewingRecipe.title}
            </h3>

            <div className="view-info">
              <span>
                <i className="bi bi-clock"></i>{" "}
                {viewingRecipe.time} min
              </span>

              <span>
                <i className="bi bi-fire"></i>{" "}
                {
                  viewingRecipe.calories
                }{" "}
                cal
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
                  : viewingRecipe.ingredients}
              </p>
            </div>

            <div className="view-section">
              <h5>Instructions</h5>

              <p>
                {
                  viewingRecipe.instructions
                }
              </p>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() =>
                  setViewingRecipe(
                    null
                  )
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
              Remove from favorites?
            </h5>

            <p>
              {selectedRecipe.title}
            </p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() =>
                  setSelectedRecipe(
                    null
                  )
                }
              >
                Cancel
              </button>

              <button
                className="confirm-delete-btn"
                onClick={() =>
                  handleRemoveFavorite(
                    selectedRecipe
                  )
                }
              >
                Remove
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
              onChange={
                handleEditChange
              }
            />

            <label>Ingredients</label>

            <textarea
              name="ingredients"
              value={
                editForm.ingredients
              }
              onChange={
                handleEditChange
              }
            />

            <label>Instructions</label>

            <textarea
              name="instructions"
              value={
                editForm.instructions
              }
              onChange={
                handleEditChange
              }
            />

            <label>Cooking Time</label>

            <input
              type="number"
              name="time"
              value={editForm.time}
              onChange={
                handleEditChange
              }
            />

            <label>Calories</label>

            <input
              type="number"
              name="calories"
              value={
                editForm.calories
              }
              onChange={
                handleEditChange
              }
            />

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() =>
                  setEditingRecipe(
                    null
                  )
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

export default Favorites;