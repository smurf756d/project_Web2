import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StatsCards from "../components/dashboard/StatsCards";
import RecommendedRecipes from "../components/dashboard/RecommendedRecipes";
import DietPreferencesCard from "../components/dashboard/DietPreferencesCard";
import MyRecipesCard from "../components/dashboard/MyRecipesCard";
import QuickGenerateCard from "../components/dashboard/QuickGenerateCard";
import { getDashboardData } from "../services/dashboardService";
import "./UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const suggestedRecipesFallback = [
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

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You must be logged in to view the dashboard.");
          setLoading(false);
          return;
        }

        const response = await getDashboardData(token);
        setDashboardData(response.data.data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleGoToGenerateRecipe = () => {
  navigate("/generate-recipe");
};
  if (loading) {
    return (
      <main className="user-dashboard-page">
        <div className="dashboard-card text-center">
          <p className="mb-0">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="user-dashboard-page">
        <div className="dashboard-card text-center">
          <h5 className="text-danger mb-2">Dashboard Error</h5>
          <p className="mb-0">{error}</p>
        </div>
      </main>
    );
  }

  const user = dashboardData.user;

  const stats = [
    {
      label: "Saved Recipes",
      value: dashboardData.stats.savedRecipes,
      variant: "green",
    },
    {
      label: "Generated Today",
      value: dashboardData.stats.generatedToday,
      variant: "blue",
    },
    {
      label: "Favorite Dish",
      value: dashboardData.stats.favoriteDish,
      variant: "orange",
    },
  ];

  const suggestedRecipes =
    dashboardData.suggestedRecipes.length > 0
      ? dashboardData.suggestedRecipes
      : suggestedRecipesFallback;

  const dietPreferences = dashboardData.dietPreferences.map((item, index) => ({
    id: index + 1,
    label: item.label,
    enabled: item.enabled,
  }));

  const myRecipes = dashboardData.myRecipes.map((recipe) => ({
    id: recipe._id,
    title: recipe.title,
    date: new Date(recipe.createdAt).toLocaleDateString(),
    image:
      recipe.image ||
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200",
  }));

  return (
    <main className="user-dashboard-page">
      <section className="welcome-banner mb-4">
        <div>
          <p className="dashboard-label mb-2">User Dashboard</p>
          <h2 className="welcome-title">Welcome back, {user.name}! 👋</h2>
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
          <MyRecipesCard recipes={myRecipes} />
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;