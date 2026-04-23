import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import RecipeCard from "../components/RecipeCard";
import { recipesMock } from "../data/recipesMock";

function MyRecipes() {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container p-4">
        <Topbar />

        <div className="row">
          {recipesMock.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyRecipes;