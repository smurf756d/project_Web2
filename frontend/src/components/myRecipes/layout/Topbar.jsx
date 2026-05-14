function Topbar() {
  return (
    <header className="my-topbar">
      <div>
        <h2>My Recipes</h2>
        <p>Manage and view your saved healthy recipes</p>
      </div>

      <div className="topbar-actions">
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