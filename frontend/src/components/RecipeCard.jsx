import anyFood from "../assets/any-food.png";

function RecipeCard({
  recipe,
  onDelete,
  onToggleFavorite,
  onEdit,
  onView,
}) {
  
const recipeImage = anyFood;

const recipeTime =
  recipe.time ||
  recipe.cookingTime ||
  "N/A";

const recipeCalories =
  recipe.calories || "N/A";
  
  return (
    <div className="recipe-card">
      <img
        src={recipeImage}
        alt={recipe.title}
        className="recipe-img"
      />

      <div className="recipe-body">
        <h5>{recipe.title}</h5>

      <div className="recipe-info">
        <span>
           <i className="bi bi-clock"></i>{" "}
           {recipeTime}
        </span>

        <span>
           <i className="bi bi-fire"></i>{" "}
           {recipeCalories}
        </span>
      </div>
        <div className="recipe-actions">
          <button
            className="view-btn"
            onClick={() => onView(recipe)}
          >
            View Recipe
          </button>

          <div>
            <button
              className="small-action edit"
              onClick={() => onEdit(recipe)}
            >
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
              onClick={() =>
                onToggleFavorite(recipe.id || recipe._id)
              }
            >
              <i
                className={`bi ${
                  recipe.isFavorite
                    ? "bi-heart-fill"
                    : "bi-heart"
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