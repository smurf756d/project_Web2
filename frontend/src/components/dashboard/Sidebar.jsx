const Sidebar = () => {
  return (
    <aside className="bg-white shadow-sm min-vh-100 p-3 p-md-4">
      <div className="d-flex flex-column h-100">
        <div>
          <h4 className="fw-bold text-success mb-4">Smart Kitchen Hub</h4>

          <div className="nav flex-column gap-2">
            <a
              href="#"
              className="nav-link text-dark bg-light rounded-3 px-3 py-2"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="nav-link text-dark bg-light rounded-3 px-3 py-2"
            >
              Generate Recipe
            </a>

            <a
              href="#"
              className="nav-link text-dark bg-light rounded-3 px-3 py-2"
            >
              My Recipes
            </a>

            <a
              href="#"
              className="nav-link text-dark bg-light rounded-3 px-3 py-2"
            >
              Favorites
            </a>

            <a
              href="#"
              className="nav-link text-dark bg-light rounded-3 px-3 py-2"
            >
              Help & Tips
            </a>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <button className="btn btn-success w-100 rounded-3">Logout</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;