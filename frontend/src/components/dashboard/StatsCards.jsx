const StatsCards = () => {
  return (
    <div className="custom-card h-100 quick-stats-card">
      <h5 className="section-card-title mb-3">Quick Stats</h5>

      <div className="stat-box stat-green">
        <div className="small text-muted">Saved Recipes</div>
        <div className="fw-bold fs-4">12</div>
      </div>

      <div className="stat-box stat-blue">
        <div className="small text-muted">Generated Today</div>
        <div className="fw-bold fs-4">3</div>
      </div>

      <div className="stat-box stat-red mb-0">
        <div className="small text-muted">Favorite Dish</div>
        <div className="fw-bold">Grilled Chicken</div>
      </div>
    </div>
  );
};

export default StatsCards;