const Sidebar = () => {
  return (
    <aside className="sidebar-panel h-100">
      <div>
        <div className="d-flex align-items-center gap-2 mb-4">
          <div className="logo-box">🍃</div>
          <div>
            <h5 className="mb-0 fw-bold">Smart</h5>
            <h5 className="mb-0 fw-bold">Kitchen Hub</h5>
          </div>
        </div>

        <div className="nav flex-column gap-2">
          <a href="#" className="sidebar-link active-link">Dashboard</a>
          <a href="#" className="sidebar-link">Generate Recipe</a>
          <a href="#" className="sidebar-link">My Recipes</a>
          <a href="#" className="sidebar-link">My Profile</a>
          <a href="#" className="sidebar-link">Diet Preferences</a>
          <a href="#" className="sidebar-link">Logout</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;