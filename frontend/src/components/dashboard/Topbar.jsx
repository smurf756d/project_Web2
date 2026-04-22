const Topbar = () => {
  return (
    <div className="topbar-custom mb-4">
      <div className="search-wrapper">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search recipes..."
        />
      </div>

      <div className="d-flex align-items-center gap-3">
        <span className="fs-5">🔔</span>
        <div className="d-flex align-items-center gap-2">
          <div className="user-avatar">👤</div>
          <div className="small fw-semibold lh-sm">
            Welcome,
            <br />
            Rama!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;