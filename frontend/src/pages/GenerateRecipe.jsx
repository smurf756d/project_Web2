import { useState } from "react";
import "../css/GenerateRecipe.css";

function GenerateRecipe() {
  const [ingredient, setIngredient] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);

  const handleAdd = () => {
    if (ingredient.trim() === "") return;

    setIngredientsList([...ingredientsList, ingredient]);
    setIngredient("");
  };
  
  const handleRemove = (indexToRemove) => {
  const updatedList = ingredientsList.filter((item, index) => index !== indexToRemove);
  setIngredientsList(updatedList);
};

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
              <input
                type="text"
                placeholder="Type an ingredient..."
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
              />
              <button type="button" className="add-btn" onClick={handleAdd}>
                + Add
              </button>
            </div>

            <div className="ingredients-list">
                {ingredientsList.map((item, index) => (
                  <span key={index} className="ingredient-tag">
                   {item}
                <button
                       type="button"
                       className="remove-tag-btn"
                       onClick={() => handleRemove(index)}
                        >
                            ×
              </button>
               </span>
                       ))}
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

            <button className="generate-btn">✨ Generate Recipe →</button>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="preview-card">
            <h3>Recipe Preview</h3>

            <div className="preview-inner">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateRecipe;