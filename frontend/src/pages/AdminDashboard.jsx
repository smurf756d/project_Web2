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
  <div className="container py-4">
   <h1 className="mb-4">Admin Dashboard</h1>
    <StatsCards stats={stats} />

    <RecentUsers users={recentUsers} />

  <RecentRecipes recipes={recentRecipes} />

    </div>
  );
}

export default AdminDashboard;