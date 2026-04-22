import StatsCards from "../components/dashboard/StatsCards";
import RecommendedRecipes from "../components/dashboard/RecommendedRecipes";
import "../../src/App.css";

const UserDashboard = () => {
  return (
    <div className="dashboard-main p-3 p-md-4">
      <div className="welcome-banner mb-4">
        <div>
          <h2 className="welcome-title">Welcome back, Rama! 👋</h2>
          <p className="welcome-subtitle">
            Ready to cook something amazing today?
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600"
          alt="food bowl"
          className="welcome-image"
        />
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-xl-8">
          <div className="custom-card recipe-generator-card h-100">
            <h5 className="section-card-title">Generate New Recipe</h5>
            <p className="small text-muted mb-2">
              Enter ingredients you have
            </p>

            <div className="ingredients-box mb-3">
              <span className="ingredient-tag">Chicken ×</span>
              <span className="ingredient-tag">Tomato ×</span>
              <span className="ingredient-tag">Onion ×</span>
              <span className="ingredient-add">+ Add more...</span>
            </div>

            <button className="btn btn-success custom-green-btn px-4">
              Generate Recipe →
            </button>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <StatsCards />
        </div>
      </div>

      <RecommendedRecipes />

      <div className="row g-3 mt-1">
        <div className="col-12 col-lg-5">
          <div className="custom-card h-100">
            <h5 className="section-card-title mb-3">Diet Preferences</h5>

            <ul className="list-unstyled mb-3">
              <li className="mb-2">• Vegetarian ❌</li>
              <li className="mb-2">• Low Carb ✅</li>
              <li className="mb-2">• High Protein ✅</li>
            </ul>

            <button className="btn btn-light border rounded-3">
              Edit Preferences
            </button>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="custom-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="section-card-title mb-0">My Recipes</h5>
              <button className="btn btn-link text-success text-decoration-none p-0">
                View All
              </button>
            </div>

            <div className="recipe-list-item">
              <div className="d-flex align-items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200"
                  alt="Grilled Chicken"
                  className="small-recipe-img"
                />
                <span>Grilled Chicken</span>
              </div>
              <small className="text-muted">Apr 20, 2025</small>
            </div>

            <div className="recipe-list-item">
              <div className="d-flex align-items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200"
                  alt="Quinoa Salad"
                  className="small-recipe-img"
                />
                <span>Quinoa Salad</span>
              </div>
              <small className="text-muted">Apr 18, 2025</small>
            </div>

            <div className="recipe-list-item mb-0">
              <div className="d-flex align-items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200"
                  alt="Veggie Soup"
                  className="small-recipe-img"
                />
                <span>Veggie Soup</span>
              </div>
              <small className="text-muted">Apr 15, 2025</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;