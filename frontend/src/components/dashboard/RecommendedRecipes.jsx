const RecommendedRecipes = () => {
  const recipes = [
    {
      title: "Chicken Stir Fry",
      time: "30 mins",
      calories: "450 cal",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600",
    },
    {
      title: "Healthy Salad",
      time: "15 mins",
      calories: "250 cal",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600",
    },
    {
      title: "Pasta with Tomato Sauce",
      time: "25 mins",
      calories: "400 cal",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
    },
  ];

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="section-main-title mb-0">🔥 Suggested Recipes for You</h5>
        <button className="btn btn-link text-success text-decoration-none p-0">
          View All
        </button>
      </div>

      <div className="row g-3">
        {recipes.map((recipe, index) => (
          <div className="col-12 col-md-6 col-xl-4" key={index}>
            <div className="recipe-card-custom h-100">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-card-image"
              />

              <div className="p-3">
                <h6 className="fw-bold mb-2">{recipe.title}</h6>
                <p className="text-muted small mb-3">
                  ⏱ {recipe.time} • 🔸 {recipe.calories}
                </p>

                <button className="btn btn-outline-success w-100 rounded-3">
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedRecipes;