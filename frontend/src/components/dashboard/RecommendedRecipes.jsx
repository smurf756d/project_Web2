import { useState } from "react";

const RecommendedRecipes = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <section id="suggested-recipes-section" className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="section-main-title mb-0">
          Suggested Recipes for You
        </h5>
      </div>

      <div className="row g-3">
        {recipes.map((recipe) => (
          <div className="col-12 col-md-6 col-xl-4" key={recipe.id}>
            <div className="recipe-card h-100">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-card-image"
              />

              <div className="p-3">
                <h6 className="fw-bold mb-2">{recipe.title}</h6>

                <p className="text-muted small mb-3">
                  ⏱ {recipe.time} • {recipe.calories}
                </p>

                <button
                  type="button"
                  className="btn btn-outline-success w-100 rounded-3"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div className="recipe-modal-overlay">
          <div className="recipe-modal-card">
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="recipe-modal-image"
            />

            <h3 className="recipe-modal-title">
              {selectedRecipe.title}
            </h3>

            <div className="recipe-modal-meta">
              <span>🕒 {selectedRecipe.time}</span>
              <span>🔥 {selectedRecipe.calories}</span>
            </div>

            <div className="recipe-modal-info">
              <h5>Ingredients</h5>

              <p>
                {selectedRecipe.ingredients}
              </p>
            </div>

            <button
              type="button"
              className="recipe-modal-close"
              onClick={() => setSelectedRecipe(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecommendedRecipes;