function GenerateRecipe(){
    return(

    <div className="container py-4">
      <h1 className="text-center mb-4">Generate Recipe</h1>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-4 h-100">
            <h4 className="mb-3">Enter Your Ingredients</h4>
            <p className="text-muted">Add ingredients you have at home:</p>

            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Type an ingredient..."
              />
              <button className="btn btn-success">Add</button>
            </div>

            <div className="mb-3">
              <span className="badge bg-warning text-dark me-2">Chicken</span>
              <span className="badge bg-warning text-dark me-2">Potato</span>
              <span className="badge bg-warning text-dark me-2">Onion</span>
              <span className="badge bg-warning text-dark me-2">Tomato</span>
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

            <div className="mb-3">
              <label className="form-label">Cuisine Type</label>
              <select className="form-select">
                <option>Any</option>
                <option>Italian</option>
                <option>Asian</option>
                <option>Arabic</option>
              </select>
            </div>

            <button className="btn btn-success w-100">Generate Recipe</button>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm p-4 h-100">
            <h4 className="mb-3">Recipe Preview</h4>
            <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: "350px" }}>
              <p className="fs-4 mb-2">Your recipe will appear here!</p>
              <small className="text-muted">
                Click "Generate Recipe" to see results.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}
export default GenerateRecipe;