const StatsCards = () => {
  const cards = [
    { title: "Saved Recipes", value: "12" },
    { title: "Favorites", value: "7" },
    { title: "This Week", value: "4" },
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card, index) => (
        <div className="col-12 col-md-6 col-lg-4" key={index}>
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <h3 className="fw-bold text-success mb-2">{card.value}</h3>
              <p className="text-muted mb-0">{card.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;