import "../css/GenerateRecipe.css";
function GenerateRecipe() {
  return (
    <div className="generate-recipe-page">
      <div className="page-header mb-4">
        <h1 className="page-title">Generate Recipe</h1>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="recipe-form-card">
            <h3>Enter Your Ingredients</h3>
            <p>Add ingredients you have at home:</p>

            <div className="ingredient-input-row">
              <input type="text" placeholder="Type an ingredient..." />
              <button className="add-btn">+ Add</button>
            </div>

            <div className="ingredient-tags">
              <span className="tag white-tag">Chicken ×</span>
              <span className="tag orange-tag">Potato ×</span>
              <span className="tag pink-tag">Onion ×</span>
              <span className="tag red-tag">Tomato ×</span>
              <span className="tag green-tag">Olive Oil ×</span>
              <span className="tag add-more-tag">+ Add more</span>
            </div>

            <div className="filter-row">
              <label>🌿 Diet Preference</label>
              <select>
                <option>Healthy</option>
              </select>
            </div>

            <div className="filter-row">
             <label>⏰ Max Cooking Time</label>
              <select>
                <option>30 - 60 mins</option>
              </select>
            </div>

            <div className="filter-row">
             <label>🍽️ Cuisine Type</label>
              <select>
                <option>Any</option>
              </select>
            </div>

           <button className="generate-btn">
                ✨ Generate Recipe →
         </button>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="preview-card">
            <h3>Recipe Preview</h3>

            <div className="preview-inner">
              <div className="preview-image">🍽</div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateRecipe;