import MostLikedRecipes from "./MostLikedRecipes";
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

<div className="row">

  <div className="col-md-8">

    <div className="card p-3 mb-4">
      <h5 className="mb-3">Most Used Ingredients</h5>

      <div className="mb-2">
        <div className="d-flex justify-content-between">
          <span>Chicken</span>
          <span>130</span>
        </div>
        <div className="progress">
          <div className="progress-bar bg-success" style={{ width: "85%" }}></div>
        </div>
      </div>

      <div className="mb-2">
        <div className="d-flex justify-content-between">
          <span>Broccoli</span>
          <span>110</span>
        </div>
        <div className="progress">
          <div className="progress-bar bg-success" style={{ width: "70%" }}></div>
        </div>
      </div>

      <div>
        <div className="d-flex justify-content-between">
          <span>Carrots</span>
          <span>70</span>
        </div>
        <div className="progress">
          <div className="progress-bar bg-success" style={{ width: "45%" }}></div>
        </div>
      </div>
    </div>

    <div className="card p-3 mb-4">
      <h5 className="mb-3">Recent Users</h5>
      <RecentUsers users={recentUsers} />
    </div>

  </div>

<div className="col-md-4">

  <div className="card p-3 mb-4">
    <h5 className="mb-3">Recent Recipes</h5>
    <RecentRecipes recipes={recentRecipes} />
  </div>

  <MostLikedRecipes />

</div>

</div>
</div>
  );
}

export default AdminDashboard;