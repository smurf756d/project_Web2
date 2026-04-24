function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ border: "1px solid white", padding: "20px", width: "100px", textAlign: "center" }}>
          <h3>Users</h3>
          <p>0</p>
        </div>

        <div style={{ border: "1px solid white", padding: "20px", width: "100px", textAlign: "center" }}>
          <h3>Recipes</h3>
          <p>0</p>
        </div>

        <div style={{ border: "1px solid white", padding: "20px", width: "100px", textAlign: "center" }}>
          <h3>Generated</h3>
          <p>0</p>
        </div>
      </div>

     <div style={{ marginTop: "30px" }}>
  <h2>Recent Users</h2>
  <div style={{ border: "1px solid white", padding: "15px", width: "300px" }}>
    <p>No users yet</p>
  </div>
</div>

      <div style={{ marginTop: "30px" }}>
        <h2>Recent Recipes</h2>
        <p>No recipes yet</p>
      </div>
    </div>
  );
}

export default AdminDashboard;