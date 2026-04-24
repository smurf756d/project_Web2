function RecentRecipes({ recipes }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Recent Recipes</h2>
      <div style={{ border: "1px solid white", padding: "15px", width: "300px" }}>
        {recipes.map((recipe, index) => (
          <p key={index}>{recipe}</p>
        ))}
      </div>
    </div>
  );
}

export default RecentRecipes;