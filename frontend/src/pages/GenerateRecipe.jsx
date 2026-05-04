import { useState } from "react";
import "../css/GenerateRecipe.css";

function GenerateRecipe() {
  const [ingredient, setIngredient] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [dietPreference, setDietPreference] = useState("Healthy");
  const [maxCookingTime, setMaxCookingTime] = useState("30 - 60 mins");
  const [cuisineType, setCuisineType] = useState("Any");
  const [recipePreview, setRecipePreview] = useState(null);

  const handleAdd = () => {
    if (ingredient.trim() === "") return;

    setIngredientsList([...ingredientsList, ingredient]);
    setIngredient("");
  };

  const handleRemove = (indexToRemove) => {
    const updatedList = ingredientsList.filter((item, index) => index !== indexToRemove);
    setIngredientsList(updatedList);
  };

 const handleGenerateRecipe = async () => {
  if (ingredientsList.length === 0) return;

  try {
    const res = await fetch("/api/recipes/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsList,
        diet: dietPreference,
        cookingTime: maxCookingTime,
        cuisine: cuisineType,
      }),
    });

    const data = await res.json();
    setRecipePreview(data);

  } catch (err) {
    console.error(err);
  }
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
              <button className="add-btn" onClick={handleAdd}>
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
              <select
                value={dietPreference}
                onChange={(e) => setDietPreference(e.target.value)}
              >
                <option>Healthy</option>
                <option>Vegan</option>
                <option>Keto</option>
                <option>Any</option>
              </select>
            </div>

            <div className="filter-row">
              <label>⏰ Max Cooking Time</label>
              <select
                value={maxCookingTime}
                onChange={(e) => setMaxCookingTime(e.target.value)}
              >
                <option>0 - 30 mins</option>
                <option>30 - 60 mins</option>
                <option>60+ mins</option>
              </select>
            </div>

            <div className="filter-row">
              <label>🍽️ Cuisine Type</label>
              <select
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
              >
                <option>Any</option>
                <option>Italian</option>
                <option>Asian</option>
                <option>Arabic</option>
              </select>
            </div>

            <button className="generate-btn" onClick={handleGenerateRecipe}>
              ✨ Generate Recipe →
            </button>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="preview-card">
            <h3>Recipe Preview</h3>

            <div className="preview-inner">
              {recipePreview ? (
                <div className="recipe-result text-start">
                  <div className="preview-image">🍽️</div>

                  <h4 className="mb-3">{recipePreview.title}</h4>

                  <p><strong>Diet:</strong> {recipePreview.diet}</p>
                  <p><strong>Cuisine:</strong> {recipePreview.cuisine}</p>
                  <p><strong>Cooking Time:</strong> {recipePreview.cookingTime}</p>
                  <p><strong>Calories:</strong> {recipePreview.calories}</p>

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
        </div>
      </div>
    </div>
  );
}

export default GenerateRecipe;