import "../styles/Admin.css";
import StatsCards from "../components/adminDashboard/StatsCards";
import RecentUsers from "../components/adminDashboard/RecentUsers";
import RecentRecipes from "../components/adminDashboard/RecentRecipes";
import MostLikedRecipes from "../components/adminDashboard/MostLikedRecipes";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const recentUsersRef = useRef(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentRecipesData, setRecentRecipesData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [mostLikedRecipesData, setMostLikedRecipesData] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  console.log("[AdminDashboard] Component rendered - loading:", loading, "stats:", stats);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = localStorage.getItem("token");
        
        const headers = {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        };

        console.log("[AdminDashboard] Fetching all dashboard data");

        // Fetch stats
        const statsResponse = await fetch("http://localhost:5000/api/v1/admin/stats", {
          headers,
        });
        const statsData = await statsResponse.json();
        if (statsResponse.ok) {
          setStats(statsData.data);
        }

        // Fetch recent recipes
        const recentRecipesResponse = await fetch(
          "http://localhost:5000/api/v1/admin/recent-recipes",
          { headers }
        );
        const recentRecipesResult = await recentRecipesResponse.json();
        if (recentRecipesResponse.ok) {
          setRecentRecipesData(recentRecipesResult.data || []);
        }

        // Fetch users
        const usersResponse = await fetch(
          "http://localhost:5000/api/v1/admin/users",
          { headers }
        );
        const usersResult = await usersResponse.json();
        if (usersResponse.ok) {
          setUsersData(usersResult.data || []);
          console.log("[AdminDashboard] Fetched users:", usersResult.data?.length);
        }

        // Fetch most used ingredients
        const ingredientsResponse = await fetch(
          "http://localhost:5000/api/v1/admin/most-used-ingredients",
          { headers }
        );
        const ingredientsResult = await ingredientsResponse.json();
        if (ingredientsResponse.ok) {
          setIngredientsData(ingredientsResult.data || []);
          console.log("[AdminDashboard] Fetched ingredients:", ingredientsResult.data?.length);
        }

        // Fetch most liked recipes
        const likedRecipesResponse = await fetch(
          "http://localhost:5000/api/v1/admin/most-liked-recipes",
          { headers }
        );
        const likedRecipesResult = await likedRecipesResponse.json();
        if (likedRecipesResponse.ok) {
          setMostLikedRecipesData(likedRecipesResult.data || []);
          console.log("[AdminDashboard] Fetched most liked recipes:", likedRecipesResult.data?.length);
        }
      } catch (error) {
        console.error("[AdminDashboard] Error fetching dashboard data:", error);
        setStats(null);
        setRecentRecipesData([]);
        setUsersData([]);
        setIngredientsData([]);
        setMostLikedRecipesData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const dashboardStats = {
    users: stats?.totalUsers ?? 0,
    recipes: stats?.totalRecipes ?? 0,
    generated: stats?.generatedRecipes ?? 0,
  };

  if (loading) {
    return (
      <div className="py-4 text-dark admin-dashboard">
        <div className="text-center">
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="py-4 text-dark admin-dashboard">
        <div className="text-center">
          <p className="text-danger">Unable to load dashboard statistics. Please check your permissions and try again.</p>
        </div>
      </div>
    );
  }

  const searchValue = searchTerm.toLowerCase();

  // Filter users based on search
  const filteredUsers = usersData.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue) ||
      user.role?.toLowerCase().includes(searchValue)
  );

  // Filter recipes based on search
  const filteredRecipes = recentRecipesData.filter(
    (recipe) =>
      recipe.title?.toLowerCase().includes(searchValue)
  );

  return (
    <div className="py-4 text-dark admin-dashboard">
      <div className="dashboard-heading text-center mb-4">
        <h1>Admin Dashboard</h1>
        <p>Overview of users, recipes, and activity🌿</p>
      </div>

      <div className="dashboard-actions d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={() => navigate("/generate-recipe")}
        >
          + Add New Recipe
        </button>
      </div>

      <StatsCards stats={dashboardStats} />

      <div className="row">
        <div className="col-md-8">
          <div className="card p-3 mb-4">
            <h5 className="mb-3">Most Used Ingredients ⭐</h5>

            {ingredientsData.length > 0 ? (
              ingredientsData.map((ingredient, index) => {
                const maxCount = ingredientsData[0]?.count || 1;
                const percentage = (ingredient.count / maxCount) * 100;
                return (
                  <div key={index} className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>{ingredient.name}</span>
                      <span>{ingredient.count}</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-muted">No ingredients data available</p>
            )}
          </div>

          <div className="card p-3 mb-4" ref={recentUsersRef}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">👥 Recent Users</h5>

              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => setShowAllUsers(!showAllUsers)}
              >
                {showAllUsers ? "Show Less" : "View All"}
              </button>
            </div>

            {usersData.length > 0 ? (
              <RecentUsers
                users={showAllUsers ? filteredUsers : filteredUsers.slice(0, 2)}
              />
            ) : (
              <p className="text-muted">No users available</p>
            )}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 mb-4">
            <h5 className="mb-3">🍽️ Recent Recipes</h5>
            {recentRecipesData.length > 0 ? (
              <RecentRecipes recipes={filteredRecipes.slice(0, 3)} />
            ) : (
              <p className="text-muted">No recipes available</p>
            )}
          </div>

          <div className="card p-3">
            <h5 className="mb-3">❤️ Most Liked Recipes</h5>
            {mostLikedRecipesData.length > 0 ? (
              <MostLikedRecipes recipes={mostLikedRecipesData} />
            ) : (
              <p className="text-muted">No liked recipes yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
