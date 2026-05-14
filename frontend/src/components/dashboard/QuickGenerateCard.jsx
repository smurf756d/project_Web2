const QuickGenerateCard = ({ onGenerateClick }) => {
  const tips = [
    "Plan meals ahead to reduce food waste 🌱",
    "Add more vegetables for balanced meals 🥦",
    "Drink enough water while cooking 💧",
    "Healthy snacks help maintain energy ⚡",
    "Cooking at home supports healthier habits 🍽️",
  ];

  const randomTip =
    tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="dashboard-card quick-generate-card h-100">
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div>
          <p className="dashboard-label mb-2">
            AI Recipe Generator
          </p>

          <h3 className="dashboard-main-title mb-3">
            Create recipes from ingredients you already have.
          </h3>

          <p className="dashboard-main-text mb-4">
            Enter your available ingredients and get personalized recipe ideas
            based on your dietary preferences.
          </p>

          <button
            type="button"
            className="btn btn-success home-main-btn"
            onClick={onGenerateClick}
          >
            Generate Recipe →
          </button>
        </div>

        <div className="quick-tip-box">
          <div className="d-flex align-items-start gap-2">
            <span className="quick-tip-icon">💡</span>

            <p className="quick-tip-text mb-0">
              {randomTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickGenerateCard;