import { useMemo, useState } from "react";
import Topbar from "../components/myRecipes/layout/Topbar";
import RecipeCard from "../components/myRecipes/RecipeCard";
import "../styles/recipesPages.css";

function Favorites() {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const [favorites, setFavorites] = useState(savedFavorites);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const recipesPerPage = 3;

  const filteredFavorites = useMemo(() => {
    return favorites.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [favorites, searchTerm]);

  const totalPages = Math.ceil(filteredFavorites.length / recipesPerPage);

  const visibleFavorites = filteredFavorites.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  const handleRemoveFavorite = (recipe) => {
    const updatedFavorites = favorites.filter((item) => item.id !== recipe.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setSelectedRecipe(null);
  };

  const handleToggleFavorite = (id) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="my-recipes-page">
      <section className="my-recipes-main">
        <Topbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <section className="recipes-toolbar">
          <div>
            <h3 className="favorites-title">Favorite Recipes</h3>
            <p className="favorites-subtitle">
              Your saved favorite recipes in one place
            </p>
          </div>

          <div className="filter-box">
            <i className="bi bi-heart"></i>
            <select>
              <option>All Favorites</option>
              <option>Newest</option>
              <option>Lowest Calories</option>
              <option>Fastest Cooking</option>
            </select>
          </div>
        </section>

        {visibleFavorites.length > 0 ? (
          <section className="recipes-grid">
            {visibleFavorites.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={{ ...recipe, isFavorite: true }}
                onDelete={setSelectedRecipe}
                onToggleFavorite={handleToggleFavorite}
                onEdit={() => {}}
                onView={() => {}}
              />
            ))}
          </section>
        ) : (
          <div className="empty-state">
            <i className="bi bi-heart"></i>
            <h4>No favorite recipes yet</h4>
            <p>Go to My Recipes and click the heart icon to add favorites.</p>
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

      {selectedRecipe && (
        <div className="modal-backdrop-custom">
          <div className="delete-modal">
            <h5>Remove from favorites?</h5>
            <p>{selectedRecipe.title}</p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setSelectedRecipe(null)}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-btn"
                onClick={() => handleRemoveFavorite(selectedRecipe)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;