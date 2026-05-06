function Topbar({ searchTerm, onSearchChange }) {
  return (
    <header className="my-topbar">
      <div>
        <h2>My Recipes</h2>
        <p>Manage and view your saved healthy recipes</p>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <button className="icon-btn">
          <i className="bi bi-bell"></i>
        </button>

        <button className="icon-btn">
          <i className="bi bi-person-circle"></i>
        </button>
      </div>
    </header>
  );
}

export default Topbar;