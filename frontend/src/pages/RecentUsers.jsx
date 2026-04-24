function RecentUsers({ users }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Recent Users</h2>
      <div style={{ border: "1px solid white", padding: "15px", width: "300px" }}>
        {users.map((user) => (
          <p key={user.id}>
            {user.name} - {user.role}
          </p>
        ))}
      </div>
    </div>
  );
}

export default RecentUsers;