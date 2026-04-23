function Sidebar() {
  return (
    <div
      className="bg-light vh-100 p-4 border-end"
      style={{ width: "240px", minWidth: "240px" }}
    >
      <h3 className="fw-bold mb-4 text-success">Smart Kitchen</h3>

      <ul className="nav flex-column">
        <li className="nav-item mb-3">
          <span className="nav-link active fw-semibold text-success">
            My Recipes
          </span>
        </li>
        <li className="nav-item mb-3">
          <span className="nav-link text-dark">Generate Recipe</span>
        </li>
        <li className="nav-item mb-3">
          <span className="nav-link text-dark">Favorites</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;