function RecipeCard({ recipe, onDelete }) {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} className="recipe-img" />

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
          <button className="view-btn">View Recipe</button>

          <div>
            <button className="small-action edit">
              <i className="bi bi-pencil-square"></i>
            </button>

            <button
              className="small-action delete"
              onClick={() => onDelete(recipe)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;