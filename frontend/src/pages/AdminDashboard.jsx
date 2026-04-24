import { recentUsers, recentRecipes } from "../data/adminData";
import { useState } from "react";

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

      <div style={{ marginTop: "30px" }}>
        <h2>Recent Users</h2>
        <div style={{ border: "1px solid white", padding: "15px", width: "300px" }}>
        {recentUsers.map((user, index) => (
  <p key={index}>{user}</p>
))}
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Recent Recipes</h2>
        <div style={{ border: "1px solid white", padding: "15px", width: "300px" }}>
          {recentRecipes.map((recipe, index) => (
  <p key={index}>{recipe}</p>
))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;