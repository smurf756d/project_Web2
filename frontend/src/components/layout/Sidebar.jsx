function Sidebar() {
  return (
    <aside className="my-sidebar">
      <div className="brand-box">
        <div className="brand-icon">🥗</div>
        <div>
          <h4>Smart</h4>
          <span>Kitchen Hub</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        <a className="sidebar-link active">
          <i className="bi bi-journal-bookmark"></i>
          My Recipes
        </a>

        <a className="sidebar-link">
          <i className="bi bi-magic"></i>
          Generate Recipe
        </a>

        <a className="sidebar-link">
          <i className="bi bi-speedometer2"></i>
          Dashboard
        </a>

        <a className="sidebar-link">
          <i className="bi bi-heart"></i>
          Favorites
        </a>

        <a className="sidebar-link">
          <i className="bi bi-question-circle"></i>
          Help & Tips
        </a>
      </nav>

      <div className="sidebar-bottom">
        <button className="round-btn">
          <i className="bi bi-gear"></i>
        </button>
        <button className="round-btn">
          <i className="bi bi-moon"></i>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;