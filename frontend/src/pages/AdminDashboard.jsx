import "../styles/Admin.css";
import StatsCards from "../components/adminDashboard/StatsCards";
import RecentUsers from "../components/adminDashboard/RecentUsers";
import RecentRecipes from "../components/adminDashboard/RecentRecipes";
import MostLikedRecipes from "../components/adminDashboard/MostLikedRecipes";
import { recentUsers } from "../data/adminData";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
const navigate = useNavigate();
const recentUsersRef = useRef(null);
const [stats, setStats] = useState(null);
const [loading, setLoading] = useState(true);
const [recentRecipesData, setRecentRecipesData] = useState([]);
const [showAllUsers, setShowAllUsers] = useState(false);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  async function fetchDashboardStats() {
    try {
      const response = await fetch("http://localhost:5000/api/admin/stats");
      const data = await response.json();

      setStats(data.data);
      const recentRecipesResponse = await fetch(
  "http://localhost:5000/api/admin/recent-recipes"
);

const recentRecipesResult = await recentRecipesResponse.json();

setRecentRecipesData(recentRecipesResult.data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchDashboardStats();
}, []);

const dashboardStats = {
  users: stats?.totalUsers ?? 0,
  recipes: stats?.totalRecipes ?? 0,
  generated: stats?.generatedRecipes ?? 0,
};


const searchValue = searchTerm.toLowerCase();

const filteredUsers = recentUsers.filter((user) =>
  user.name?.toLowerCase().includes(searchValue) ||
  user.username?.toLowerCase().includes(searchValue) ||
  user.role?.toLowerCase().includes(searchValue) ||
  user.email?.toLowerCase().includes(searchValue)
);

const filteredRecipes = recentRecipesData.filter((recipe) =>
  recipe.title?.toLowerCase().includes(searchValue) ||
  recipe.name?.toLowerCase().includes(searchValue)
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
{loading ? (
  <p className="text-center">Loading dashboard stats...</p>
) : (
  <StatsCards stats={dashboardStats} />
)}

<div className="row">

  <div className="col-md-8">

    <div className="card p-3 mb-4">
      <h5 className="mb-3">Most Used Ingredients ⭐</h5>

      <div className="mb-2">
        <div className="d-flex justify-content-between">
          <span>Chicken</span>
          <span>130</span>
        </div>
        <div className="progress">
          <div className="progress-bar" style={{ width: "85%" }}></div>
        </div>
      </div>

      <div className="mb-2">
        <div className="d-flex justify-content-between">
          <span>Broccoli</span>
          <span>110</span>
        </div>
       <div className="progress">
  <div className="progress-bar" style={{ width: "70%", backgroundColor: "#6fbf73" }}></div>
</div>
      </div>

      <div>
        <div className="d-flex justify-content-between">
          <span>Carrots</span>
          <span>70</span>
        </div>
        <div className="progress">
          <div className="progress-bar " style={{ width: "45%" }}></div>
        </div>
      </div>
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
<RecentUsers
  users={
    showAllUsers
      ? filteredUsers
      : filteredUsers.slice(0, 2)
  }
/>
    </div>

  </div>

<div className="col-md-4">

  <div className="card p-3 mb-4">
    <h5 className="mb-3">🍽️ Recent Recipes</h5>
   <RecentRecipes recipes={filteredRecipes.slice(0, 3)} />
  </div>

 <div className="card p-3">
  <h5 className="mb-3">❤️ Most Liked Recipes</h5>
  <MostLikedRecipes />
</div>

</div>

</div>
</div>
  );
}

export default AdminDashboard;