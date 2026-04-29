import RecentRecipes from "./RecentRecipes";
import RecentUsers from "./RecentUsers";
import StatsCards from "./StatsCards";
import { recentUsers, recentRecipes } from "../data/adminData";

function AdminDashboard() {
  
const stats = {
  users: recentUsers.length,
  recipes: recentRecipes.length,
  generated: 0,
};
  return (
  <div className="container py-4 text-dark">
   <h1 className="mb-4 text-center text-dark">Admin Dashboard</h1>
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

   <div className="card p-3 mb-4">
  <h5 className="mb-3">Recent Users</h5>
  <RecentUsers users={recentUsers} />
</div>

<div className="card p-3">
  <h5 className="mb-3">Recent Recipes</h5>
  <RecentRecipes recipes={recentRecipes} />
</div>

    </div>
  );
}

export default AdminDashboard;