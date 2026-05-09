import StatsCards from "../components/dashboard/StatsCards";
import RecommendedRecipes from "../components/dashboard/RecommendedRecipes";
import DietPreferencesCard from "../components/dashboard/DietPreferencesCard";
import MyRecipesCard from "../components/dashboard/MyRecipesCard";
import QuickGenerateCard from "../components/dashboard/QuickGenerateCard";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

 const user = {
  name: localStorage.getItem("userName") || "User",
  savedRecipes: 0,
  generatedToday: 0,
  favoriteDish: "Not selected yet",
};

  const stats = [
    {
      label: "Saved Recipes",
      value: user.savedRecipes,
      variant: "green",
    },
    {
      label: "Generated Today",
      value: user.generatedToday,
      variant: "blue",
    },
    {
      label: "Favorite Dish",
      value: user.favoriteDish,
      variant: "orange",
    },
  ];

  const suggestedRecipes = [
    {
      id: 1,
      title: "Chicken Stir Fry",
      time: "30 mins",
      calories: "450 cal",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600",
    },
    {
      id: 2,
      title: "Healthy Salad",
      time: "15 mins",
      calories: "250 cal",
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600",
    },
    {
      id: 3,
      title: "Tomato Pasta",
      time: "25 mins",
      calories: "400 cal",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
    },
  ];

  const dietPreferences = [
    { id: 1, label: "Vegetarian", enabled: false },
    { id: 2, label: "Low Carb", enabled: false },
    { id: 3, label: "High Protein", enabled: false },
  ];

  const myRecipes = [];

  const handleGoToGenerateRecipe = () => {
    navigate("/generate-recipe");
  };

  return (
    <main className="user-dashboard-page">
      <section className="welcome-banner mb-4">
        <div>
          <p className="dashboard-label mb-2">User Dashboard</p>

          <h2 className="welcome-title">
            Welcome back, {user.name}! 👋
          </h2>

          <p className="welcome-subtitle">
            Manage your recipes, preferences, and personalized cooking journey.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600"
          alt="Healthy food bowl"
          className="welcome-image"
        />
      </section>

      <div className="row g-3 mb-4">
        <div className="col-12 col-xl-8">
          <QuickGenerateCard onGenerateClick={handleGoToGenerateRecipe} />
        </div>


        <div className="col-12 col-xl-4">
          <StatsCards stats={stats} />
        </div>
      </div>

      <RecommendedRecipes recipes={suggestedRecipes} />

      <div className="row g-3 mt-1">
        <div className="col-12 col-lg-5">
          <DietPreferencesCard preferences={dietPreferences} />
        </div>

        <div className="col-12 col-lg-7">
          {myRecipes.length === 0 ? (
            <div className="dashboard-card text-center py-5 h-100">
              <div className="empty-recipes-icon">🍳</div>

              <h5 className="mt-3 mb-2">No recipes yet</h5>

              <p className="text-muted mb-0">
                Start generating recipes and your saved meals will appear here.
              </p>
            </div>
          ) : (
            <MyRecipesCard recipes={myRecipes} />
          )}
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;