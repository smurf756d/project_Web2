function StatsCards({ stats }) {
 return (
  <div className="row mb-4">
   <div className="col-4">
      <div className="card text-center p-3">
        <h5>Users</h5>
        <h3>{stats.users}</h3>
      </div>
    </div>

   <div className="col-4">
      <div className="card text-center p-3">
        <h5>Recipes</h5>
        <h3>{stats.recipes}</h3>
      </div>
    </div>

    <div className="col-4">
      <div className="card text-center p-3">
        <h5>Generated</h5>
        <h3>{stats.generated}</h3>
      </div>
    </div>
  </div>
);
}

export default StatsCards;