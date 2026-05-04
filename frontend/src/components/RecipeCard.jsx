function RecipeCard({ recipe, onDelete, onToggleFavorite, onEdit, onView }) {
  return (
    <div className="recipe-card">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipe-img"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
        }}
      />

      <div className="recipe-body">
        <h5>{recipe.title}</h5>

        <div className="recipe-info">
          <span>
            <i className="bi bi-clock"></i> {recipe.time} min
          </span>
          <span>
            <i className="bi bi-fire"></i> {recipe.calories} cal
          </span>
        </div>

        <div className="recipe-actions">
          <button className="view-btn" onClick={() => onView(recipe)}>
            View Recipe
          </button>

          <div>
            <button className="small-action edit" onClick={() => onEdit(recipe)}>
              <i className="bi bi-pencil-square"></i>
            </button>

            <button
              className="small-action delete"
              onClick={() => onDelete(recipe)}
            >
              <i className="bi bi-trash"></i>
            </button>

            <button
              className={`small-action ${
                recipe.isFavorite ? "fav-active" : ""
              }`}
              onClick={() => onToggleFavorite(recipe.id)}
            >
              <i
                className={`bi ${
                  recipe.isFavorite ? "bi-heart-fill" : "bi-heart"
                }`}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;