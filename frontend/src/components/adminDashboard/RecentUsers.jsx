function RecentUsers({ users }) {
  return (
    <div className="list-group">
      {users.map((user) => (
        <div className="list-group-item d-flex justify-content-between align-items-center" key={user._id || user.id}>
          <div>
            <strong>{user.name || user.email || "Unknown User"}</strong>
            <small className="d-block text-muted">{user.role || "user"}</small>
          </div>
          <span className="badge bg-success rounded-pill">Active</span>
        </div>
      ))}
    </div>
  );
}

export default RecentUsers;
