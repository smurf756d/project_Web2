import { useNavigate } from "react-router-dom";

const MyRecipesCard = ({ recipes }) => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/my-recipes");
  };

  return (
    <div className="dashboard-card h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="section-card-title mb-0">My Recipes</h5>

        <button
          type="button"
          className="btn btn-link text-success p-0"
          onClick={handleViewAll}
        >
          View All
        </button>
      </div>

      {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div
            className="recipe-list-item"
            key={recipe.id}
            style={{ cursor: "default" }}
          >
            <div className="d-flex align-items-center gap-2">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="small-recipe-img"
              />

              <span className="fw-medium">{recipe.title}</span>
            </div>

            <small className="text-muted">{recipe.date}</small>
          </div>
        ))
      ) : (
        <p className="text-muted mb-0">No recipes saved yet</p>
      )}
    </div>
  );
};

export default MyRecipesCard;