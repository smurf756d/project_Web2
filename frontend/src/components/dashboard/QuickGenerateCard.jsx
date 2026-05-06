const QuickGenerateCard = ({ onGenerateClick }) => {
  return (
    <div className="dashboard-card quick-generate-card h-100">
      <h5 className="section-card-title">Generate New Recipe</h5>

      <p className="text-muted small mb-4">
        Go to the recipe generator page to enter ingredients, choose preferences,
        and create a personalized recipe.
      </p>

      <button
        type="button"
        className="btn btn-success custom-green-btn px-4"
        onClick={onGenerateClick}
      >
        Go to Generator →
      </button>
    </div>
  );
};

export default QuickGenerateCard;