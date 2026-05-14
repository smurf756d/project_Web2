function IngredientForm({
  ingredient,
  setIngredient,
  ingredientsList,
  handleAdd,
  handleRemove,
  dietPreference,
  setDietPreference,
  maxCookingTime,
  setMaxCookingTime,
  cuisineType,
  setCuisineType,
  handleGenerateRecipe,
  loading,
}) {
  return (
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

      <button
        className="generate-btn"
        onClick={handleGenerateRecipe}
        disabled={loading}
      >
        {loading ? "Generating..." : "✨ Generate Recipe →"}
      </button>
    </div>
  );
}

export default IngredientForm;
