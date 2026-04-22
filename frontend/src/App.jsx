import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import GenerateRecipe from "./pages/GenerateRecipe";

function Home() {
  return <h2>Home Page</h2>;
}

function Dashboard() {
  return <h2>User Dashboard</h2>;
}

function BrowseRecipes() {
  return <h2>Browse Recipes Page</h2>;
}

function MyRecipes() {
  return <h2>My Recipes Page</h2>;
}

function Favorites() {
  return <h2>Favorites Page</h2>;
}

function Help() {
  return <h2>Help & Tips Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="generate-recipe" element={<GenerateRecipe />} />
          <Route path="browse-recipes" element={<BrowseRecipes />} />
          <Route path="my-recipes" element={<MyRecipes />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;