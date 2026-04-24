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
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ border: "1px solid white", padding: "20px", width: "100px", textAlign: "center" }}>
          <h3>Users</h3>
          <p>{stats.users}</p>
        </div>

        <div style={{ border: "1px solid white", padding: "20px", width: "100px", textAlign: "center" }}>
          <h3>Recipes</h3>
          <p>{stats.recipes}</p>
        </div>

        <div style={{ border: "1px solid white", padding: "20px", width: "100px", textAlign: "center" }}>
          <h3>Generated</h3>
          <p>{stats.generated}</p>
        </div>
      </div>

    <RecentUsers users={recentUsers} />

  <RecentRecipes recipes={recentRecipes} />

    </div>
  );
}

export default AdminDashboard;