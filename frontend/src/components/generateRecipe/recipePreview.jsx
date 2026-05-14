import RecipeRefineBox from "./recipeRefineBox";

function RecipePreview({
  recipePreview,
  refineMessage,
  setRefineMessage,
  handleRefineRecipe,
  refining,
  handleSaveRecipe,
  saving,
  isSaved,
}) {
  return (
    <div className="preview-card">
      <h3>Recipe Preview</h3>

      <div className="preview-inner">
        {recipePreview ? (
          <div className="recipe-result text-start">
            {recipePreview.image ? (
              <img
                className="generated-recipe-image"
                src={recipePreview.image}
                alt={recipePreview.title}
              />
            ) : (
              <div className="preview-image">🍽️</div>
            )}

            <h4 className="mb-3">{recipePreview.title}</h4>

            <p>
              <strong>Diet:</strong> {recipePreview.diet}
            </p>

            <p>
              <strong>Cuisine:</strong> {recipePreview.cuisine}
            </p>

            <p>
              <strong>Cooking Time:</strong> {recipePreview.cookingTime}
            </p>

            <p>
              <strong>Calories:</strong> {recipePreview.calories}
            </p>

            <div className="mb-3">
              <strong>Ingredients:</strong>
              <ul>
                {recipePreview.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Steps:</strong>
              <ol>
                {recipePreview.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            <RecipeRefineBox
              refineMessage={refineMessage}
              setRefineMessage={setRefineMessage}
              handleRefineRecipe={handleRefineRecipe}
              refining={refining}
            />

            <button
              className="generate-btn"
              onClick={handleSaveRecipe}
              disabled={saving || isSaved}
            >
             {saving ? "Saving..." : isSaved ? "Saved ✅" : "💾 Save Recipe"}
            </button>
          </div>
        ) : (
          <>
            <div className="preview-image">🍽️</div>

            <h4>Your recipe will appear here!</h4>

            <div className="preview-lines">
              <div></div>
              <div></div>
            </div>

            <div className="preview-boxes">
              <div className="small-preview-box"></div>
              <div className="small-preview-box"></div>
              <div className="small-preview-box"></div>
            </div>

            <div className="preview-footer">
              Click "Generate Recipe" to see results.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RecipePreview;
