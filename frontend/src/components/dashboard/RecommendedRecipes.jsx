const RecommendedRecipes = () => {
  const recipes = [
    {
      title: "Chicken Stir Fry",
      time: "25 min",
      calories: "420 cal",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600",
    },
    {
      title: "Healthy Salad",
      time: "15 min",
      calories: "210 cal",
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600",
    },
    {
      title: "Pasta Bowl",
      time: "30 min",
      calories: "510 cal",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
    },
  ];

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-success mb-0">Suggested Recipes For You</h4>
      </div>

      <div className="row g-3">
        {recipes.map((recipe, index) => (
          <div className="col-12 col-md-6 col-xl-4" key={index}>
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold text-success">
                  {recipe.title}
                </h5>
                <p className="card-text text-muted">
                  {recipe.time} • {recipe.calories}
                </p>
                <button className="btn btn-success rounded-3">
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