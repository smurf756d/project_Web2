import { useMemo, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import RecipeCard from "../components/RecipeCard";
import { recipesMock } from "../data/recipesMock";
import "../styles/myRecipes.css";

function MyRecipes() {
  const [recipes, setRecipes] = useState(recipesMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
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

  return (
    <div className="my-recipes-page">
      <Sidebar />

      <main className="my-recipes-main">
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
      </main>

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
    </div>
  );
}

export default MyRecipes;