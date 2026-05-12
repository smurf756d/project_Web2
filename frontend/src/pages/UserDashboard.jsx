import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StatsCards from "../components/dashboard/StatsCards";
import RecommendedRecipes from "../components/dashboard/RecommendedRecipes";
import DietPreferencesCard from "../components/dashboard/DietPreferencesCard";
import MyRecipesCard from "../components/dashboard/MyRecipesCard";
import QuickGenerateCard from "../components/dashboard/QuickGenerateCard";

import {
  getDashboardData,
  updateDietPreferences,
} from "../services/dashboardService";

import "../styles/UserDashboard.css";

const mockDashboardData = {
  user: {
    name: localStorage.getItem("userName") || "Rama",
  },

  stats: {
    savedRecipes: 0,
    generatedToday: 0,
    favoriteDish: "Not selected yet",
  },

  suggestedRecipes: [
    {
      id: 1,
      title: "Chicken Stir Fry",
      time: "30 mins",
      calories: "450 cal",
      ingredients: "chicken, rice, vegetables, soy sauce",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600",
    },

    {
      id: 2,
      title: "Healthy Salad",
      time: "15 mins",
      calories: "250 cal",
      ingredients: "lettuce, cucumber, tomato, avocado, olive oil",
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600",
    },

    {
      id: 3,
      title: "Tomato Pasta",
      time: "25 mins",
      calories: "400 cal",
      ingredients: "pasta, tomato sauce, basil, parmesan cheese",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
    },
  ],

  dietPreferences: [
    { key: "vegetarian", label: "Vegetarian", enabled: false },
    { key: "lowCarb", label: "Low Carb", enabled: false },
    { key: "highProtein", label: "High Protein", enabled: false },
  ],

  myRecipes: [],
};

const UserDashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(mockDashboardData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setDashboardData(mockDashboardData);
          return;
        }

        const response = await getDashboardData(token);

        setDashboardData(response.data.data);
      } catch (error) {
        setDashboardData(mockDashboardData);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleGoToGenerateRecipe = () => {
    navigate("/generate-recipe");
  };

  const handleSavePreferences = async (updatedPreferences) => {
    const token = localStorage.getItem("token");

    const preferencesPayload = {
      vegetarian:
        updatedPreferences.find((item) => item.key === "vegetarian")
          ?.enabled || false,

      lowCarb:
        updatedPreferences.find((item) => item.key === "lowCarb")?.enabled ||
        false,

      highProtein:
        updatedPreferences.find((item) => item.key === "highProtein")
          ?.enabled || false,
    };

    if (!token) {
      setDashboardData((prev) => ({
        ...prev,
        dietPreferences: updatedPreferences,
      }));

      return;
    }

    try {
      const response = await updateDietPreferences(
        token,
        preferencesPayload
      );

      setDashboardData((prev) => ({
        ...prev,
        dietPreferences: response.data.data,
      }));
    } catch (error) {
      console.error("Failed to update preferences", error);
    }
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

  const dietPreferences = dashboardData.dietPreferences.map((item, index) => ({
    id: index + 1,
    key: item.key,
    label: item.label,
    enabled: item.enabled,
  }));

  const myRecipes = dashboardData.myRecipes.map((recipe) => ({
    id: recipe._id || recipe.id,

    title: recipe.title,

    date: recipe.createdAt
      ? new Date(recipe.createdAt).toLocaleDateString()
      : recipe.date || "Recently",

    image:
      recipe.image ||
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200",
  }));

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
          <QuickGenerateCard
            onGenerateClick={handleGoToGenerateRecipe}
          />
        </div>

        <div className="col-12 col-xl-4">
          <StatsCards stats={stats} />
        </div>
      </div>

      <RecommendedRecipes recipes={dashboardData.suggestedRecipes} />

      <div className="row g-3 mt-1">
        <div className="col-12 col-lg-5">
          <DietPreferencesCard
            preferences={dietPreferences}
            onSavePreferences={handleSavePreferences}
          />
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

export default UserDashboard