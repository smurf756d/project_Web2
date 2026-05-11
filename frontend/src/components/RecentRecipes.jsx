function RecentRecipes({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return <p className="text-muted mb-0">No recent recipes yet.</p>;
  }

  return (
    <div className="list-group admin-list">
      {recipes.map((recipe) => (
        <div
          key={recipe._id}
          className="list-group-item d-flex justify-content-between align-items-center admin-list-item"
        >
          <div>
            <strong>{recipe.title}</strong>
            <small className="d-block text-muted">
              {recipe.cookingTime || "No time"} • {recipe.calories || "No calories"}
            </small>
          </div>

          <span className="badge bg-primary rounded-pill">
            Recipe
          </span>
        </div>
      ))}
    </div>
  );
}

export default RecentRecipes;