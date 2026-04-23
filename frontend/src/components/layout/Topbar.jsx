function Topbar() {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="fw-bold m-0">My Recipes</h2>

      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        style={{ maxWidth: "280px" }}
      />
    </div>
  );
}

export default Topbar;