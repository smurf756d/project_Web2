function RecipeRefineBox({
  refineMessage,
  setRefineMessage,
  handleRefineRecipe,
  refining,
}) {
  return (
    <div className="ai-refine-box">
      <label>Want to change something?</label>

      <textarea
        placeholder="Example: I do not have rice, replace it with pasta..."
        value={refineMessage}
        onChange={(e) => setRefineMessage(e.target.value)}
      />

      <button
        type="button"
        className="refine-btn"
        onClick={handleRefineRecipe}
        disabled={refining}
      >
        {refining ? "Updating with AI..." : "✨ Ask Zora to adjust"}
      </button>
    </div>
  );
}

export default RecipeRefineBox;

