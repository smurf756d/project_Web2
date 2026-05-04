const QuickGenerateCard = ({ onGenerateClick }) => {
  const previewTags = ["Chicken", "Tomato", "Onion"];

  return (
    <div className="dashboard-card quick-generate-card h-100">
      <h5 className="section-card-title">Generate New Recipe</h5>

      <p className="text-muted small mb-3">
        Start creating a personalized recipe from your ingredients.
      </p>

      <div className="ingredients-preview-box mb-3">
        {previewTags.map((tag) => (
          <span className="ingredient-tag" key={tag}>
            {tag}
          </span>
        ))}

        <span className="ingredient-more">More ingredients on next page</span>
      </div>

      <button
        type="button"
        className="btn btn-success custom-green-btn px-4"
        onClick={onGenerateClick}
      >
        Generate Recipe →
      </button>
    </div>
  );
};

export default QuickGenerateCard;