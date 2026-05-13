import "../styles/Admin.css";
import StatsCards from "../components/adminDashboard/StatsCards";
import RecentUsers from "../components/adminDashboard/RecentUsers";
import RecentRecipes from "../components/adminDashboard/RecentRecipes";
import MostLikedRecipes from "../components/adminDashboard/MostLikedRecipes";
import { recentUsers, recentRecipes } from "../data/adminData";

function AdminDashboard() {
  
const stats = {
  users: recentUsers.length,
  recipes: recentRecipes.length,
  generated: 0,
};
  return (
  <div className="py-4 text-dark admin-dashboard">
    <div className="dashboard-heading text-center mb-4">
  <h1>Admin Dashboard</h1>
  <p>Overview of users, recipes, and activity🌿</p>
</div>
   <div className="d-flex justify-content-between align-items-center mb-4">
  
  <input
    type="text"
    className="form-control w-50"
    placeholder="Search..."
  />

  <button className="btn btn-success">
    + Add New Recipe
  </button>

</div>
<StatsCards stats={stats} />

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

    <div className="card p-3 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
  <h5 className="mb-0">👥 Recent Users</h5>
  <button className="btn btn-sm btn-outline-success">View All</button>
</div>
      <RecentUsers users={recentUsers} />
    </div>

  </div>

<div className="col-md-4">

  <div className="card p-3 mb-4">
    <h5 className="mb-3">🍽️ Recent Recipes</h5>
    <RecentRecipes recipes={recentRecipes} />
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