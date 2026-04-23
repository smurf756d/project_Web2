function RecipeCard({ recipe }) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="card shadow-sm border-0 h-100">
        <img
          src={recipe.image}
          className="card-img-top"
          alt={recipe.title}
          style={{ height: "180px", objectFit: "cover" }}
        />

        <div className="card-body">
          <h5 className="fw-bold">{recipe.title}</h5>

          <p className="text-muted">
            ⏱ {recipe.time} min | 🔥 {recipe.calories} cal
          </p>

          <div className="d-flex justify-content-between">
            <button className="btn btn-success btn-sm">View</button>

            <div>
              <button className="btn btn-outline-primary btn-sm me-2">
                Edit
              </button>
              <button className="btn btn-outline-danger btn-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;