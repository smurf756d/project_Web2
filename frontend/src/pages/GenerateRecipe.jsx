import { useState } from "react";

function GenerateRecipe() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([
    "Chicken",
    "Potato",
    "Onion",
    "Tomato",
    "Olive Oil"
  ]);

  const addIngredient = () => {
    if (ingredient.trim() === "") {
      return;
    }

    setIngredients([...ingredients, ingredient]);
    setIngredient("");
  };

  return (
    <div>
      <h1 className="mb-2">Generate Recipe</h1>
      <p className="mb-4 text-muted">Responsible: Renad</p>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-4 rounded-4 h-100">
            <h4 className="mb-3">Enter Your Ingredients</h4>
            <p className="text-muted">Add ingredients you have at home:</p>

            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Type an ingredient..."
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
              />
              <button className="btn btn-success" onClick={addIngredient}>
                Add
              </button>
            </div>

            <div className="mb-4">
              {ingredients.map((item, index) => (
                <span key={index} className="badge bg-warning text-dark me-2 mb-2 p-2">
                  {item}
                </span>
              ))}
            </div>

            <div className="mb-3">
              <label className="form-label">Diet Preference</label>
              <select className="form-select">
                <option>Healthy</option>
                <option>Vegan</option>
                <option>Keto</option>
                <option>Any</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Max Cooking Time</label>
              <select className="form-select">
                <option>0 - 30 mins</option>
                <option>30 - 60 mins</option>
                <option>60+ mins</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">Cuisine Type</label>
              <select className="form-select">
                <option>Any</option>
                <option>Italian</option>
                <option>Asian</option>
                <option>Arabic</option>
              </select>
            </div>

            <button className="btn btn-success w-100 py-2">
              Generate Recipe
            </button>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-4 rounded-4 h-100">
            <h4 className="mb-3">Recipe Preview</h4>

            <div className="d-flex flex-column justify-content-center align-items-center text-center bg-light rounded-4 p-4" style={{ minHeight: "400px" }}>
              <div className="mb-3 fs-1">🍽️</div>
              <h5>Your recipe will appear here!</h5>
              <p className="text-muted">
                Click "Generate Recipe" to see results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateRecipe;