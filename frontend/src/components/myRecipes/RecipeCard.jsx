<<<<<<< HEAD
import anyFood from "../../assets/any-food.png";
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
=======
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
>>>>>>> 6558e606d5332cb48aa21e35946e7852dfdc96eb
      />

      <div className="recipe-body">
        <h5>{recipe.title}</h5>

<<<<<<< HEAD
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
=======
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
>>>>>>> 6558e606d5332cb48aa21e35946e7852dfdc96eb
            View Recipe
          </button>

          <div>
<<<<<<< HEAD
            <button
              className="small-action edit"
              onClick={() => onEdit(recipe)}
            >
=======
            <button className="small-action edit" onClick={() => onEdit(recipe)}>
>>>>>>> 6558e606d5332cb48aa21e35946e7852dfdc96eb
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
<<<<<<< HEAD
              onClick={() =>
                onToggleFavorite(recipe.id || recipe._id)
              }
            >
              <i
                className={`bi ${
                  recipe.isFavorite
                    ? "bi-heart-fill"
                    : "bi-heart"
=======
              onClick={() => onToggleFavorite(recipe.id)}
            >
              <i
                className={`bi ${
                  recipe.isFavorite ? "bi-heart-fill" : "bi-heart"
>>>>>>> 6558e606d5332cb48aa21e35946e7852dfdc96eb
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