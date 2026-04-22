const Topbar = () => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
      <div className="w-100" style={{ maxWidth: "350px" }}>
        <input
          type="text"
          className="form-control rounded-3"
          placeholder="Search recipes..."
        />
      </div>

      <div className="d-flex align-items-center gap-3">
        <span className="fs-5">🔔</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="user"
          className="rounded-circle"
          width="40"
          height="40"
        />
      </div>
    </div>
  );
};

export default Topbar;