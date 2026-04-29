function RecentUsers({ users }) {
  return (
    <div className="list-group">
      {users.map((user) => (
        <div className="list-group-item d-flex justify-content-between align-items-center" key={user.id}>
          <div>
            <strong>{user.name}</strong>
            <small className="d-block text-muted">{user.role}</small>
          </div>
          <span className="badge bg-success rounded-pill">Active</span>
        </div>
      ))}
    </div>
  );
}

export default RecentUsers;