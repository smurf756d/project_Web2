function MostLikedRecipes({ recipes = [] }) {
  return (
    <div className="list-group">
      {recipes.map((recipe, index) => (
        <div
          key={recipe._id || recipe.title || index}
          className="list-group-item d-flex justify-content-between"
        >
          <span>{recipe.title}</span>
          <span>{recipe.count ?? 0}</span>
        </div>
      ))}
    </div>
  );
}

export default MostLikedRecipes;



