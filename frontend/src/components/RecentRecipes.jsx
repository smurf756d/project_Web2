function RecentRecipes({ recipes }) {
  return (
    <div className="list-group">
      {recipes.map((recipe, index) => (
        <div
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{recipe}</span>
          <span className="badge bg-primary rounded-pill">Recipe</span>
        </div>
      ))}
    </div>
  );
}

export default RecentRecipes;