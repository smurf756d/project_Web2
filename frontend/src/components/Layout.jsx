import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <div className="col-md-3 col-lg-2 bg-light p-4 border-end">
          <h3 className="mb-4">Smart Kitchen Hub</h3>

          <ul className="nav flex-column gap-2">
            <li className="nav-item">
              <Link to="/" className="nav-link text-dark">Home</Link>
            </li>

            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-dark">User Dashboard</Link>
            </li>

            <li className="nav-item">
              <Link to="/generate-recipe" className="nav-link text-success fw-bold">
                Generate Recipe
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/browse-recipes" className="nav-link text-dark">Browse Recipes</Link>
            </li>

            <li className="nav-item">
              <Link to="/my-recipes" className="nav-link text-dark">My Recipes</Link>
            </li>

            <li className="nav-item">
              <Link to="/favorites" className="nav-link text-dark">Favorites</Link>
            </li>

            <li className="nav-item">
              <Link to="/help" className="nav-link text-dark">Help & Tips</Link>
            </li>
          </ul>
        </div>

        <div className="col-md-9 col-lg-10 p-4 bg-success-subtle">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">Smart Kitchen Hub</h2>
              <p className="text-muted mb-0">Welcome to the system</p>
            </div>

            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-light">🔔</button>
              <button className="btn btn-light">📌</button>
              <div className="bg-white px-3 py-2 rounded">User</div>
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;