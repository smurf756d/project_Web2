import { useState } from "react";
import "../styles/Layout.css";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = user?.role === "admin";

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <div className="layout">
      <button
        className="mobile-menu-btn"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>

      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <Link to="/auth" className="logo-wrapper" onClick={closeSidebar}>
          <img src={logo} alt="Smart Kitchen Hub" className="sidebar-logo" />
          <h2>Smart Kitchen Hub</h2>
        </Link>

        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <NavLink to="/" className="sidebar-link" onClick={closeSidebar}>
              <span className="sidebar-icon">🏠</span>
              <span className="sidebar-text">Home</span>
            </NavLink>
          </li>

          <li className="sidebar-item">
            <NavLink
              to="/dashboard"
              className="sidebar-link"
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">📊</span>
              <span className="sidebar-text">User Dashboard</span>
            </NavLink>
          </li>

          {isAdmin && (
            <li className="sidebar-item">
              <NavLink
                to="/admin-dashboard"
                className="sidebar-link"
                onClick={closeSidebar}
              >
                <span className="sidebar-icon">🛠️</span>
                <span className="sidebar-text">Admin Dashboard</span>
              </NavLink>
            </li>
          )}

          <li className="sidebar-item">
            <NavLink
              to="/generate-recipe"
              className="sidebar-link"
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">✨</span>
              <span className="sidebar-text">Generate Recipe</span>
            </NavLink>
          </li>

          <li className="sidebar-item">
            <NavLink
              to="/my-recipes"
              className="sidebar-link"
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">📋</span>
              <span className="sidebar-text">My Recipes</span>
            </NavLink>
          </li>

          <li className="sidebar-item">
            <NavLink
              to="/favorites"
              className="sidebar-link"
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">❤️</span>
              <span className="sidebar-text">Favorites</span>
            </NavLink>
          </li>

          <li className="sidebar-item">
            <NavLink to="/help" className="sidebar-link" onClick={closeSidebar}>
              <span className="sidebar-icon">💡</span>
              <span className="sidebar-text">Help & Tips</span>
            </NavLink>
          </li>
        </ul>

        <button className="logout-icon-btn" onClick={handleLogout}>
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;