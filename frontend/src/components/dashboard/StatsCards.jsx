const StatsCards = ({ stats }) => {
  return (
    <div className="dashboard-card h-100">
      <h5 className="section-card-title mb-3">Quick Stats</h5>

      {stats.map((item) => (
        <div className={`stat-box stat-${item.variant}`} key={item.label}>
          <div className="small text-muted">{item.label}</div>
          <div className="fw-bold fs-5">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;