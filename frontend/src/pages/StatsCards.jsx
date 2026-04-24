function StatsCards({ stats }) {
  return (
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
  );
}

export default StatsCards;