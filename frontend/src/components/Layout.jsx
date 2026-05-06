import "../css/Layout.css";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <div className="sidebar">
        <h2>Smart Kitchen Hub</h2>

        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <Link to="/" className="sidebar-link">
              <span className="sidebar-icon">🏠</span>
              <span className="sidebar-text">Home</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/dashboard" className="sidebar-link">
              <span className="sidebar-icon">📊</span>
              <span className="sidebar-text">User Dashboard</span>
            </Link>
          </li>

          <li className="sidebar-item active">
            <Link to="/generate-recipe" className="sidebar-link">
              <span className="sidebar-icon">✨</span>
              <span className="sidebar-text">Generate Recipe</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/browse-recipes" className="sidebar-link">
              <span className="sidebar-icon">📖</span>
              <span className="sidebar-text">Browse Recipes</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/my-recipes" className="sidebar-link">
              <span className="sidebar-icon">📋</span>
              <span className="sidebar-text">My Recipes</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/favorites" className="sidebar-link">
              <span className="sidebar-icon">❤️</span>
              <span className="sidebar-text">Favorites</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/help" className="sidebar-link">
              <span className="sidebar-icon">💡</span>
              <span className="sidebar-text">Help & Tips</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;