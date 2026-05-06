const RecommendedRecipes = ({ recipes }) => {
  return (
    <section className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="section-main-title mb-0">
          Suggested Recipes for You
        </h5>

        <button
          type="button"
          className="btn btn-link text-success p-0"
          onClick={() => alert("This will open all recipes later.")}
        >
          View All
        </button>
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
                  onClick={() =>
                    alert(`Opening ${recipe.title} details later.`)
                  }
                >
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedRecipes;