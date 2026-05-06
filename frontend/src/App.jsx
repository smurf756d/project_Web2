import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import GenerateRecipe from "./pages/GenerateRecipe";
import AdminDashboard from "./pages/AdminDashboard";

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
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="generate-recipe" element={<GenerateRecipe />} />
          <Route path="browse-recipes" element={<BrowseRecipes />} />
          <Route path="my-recipes" element={<MyRecipes />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="help" element={<Help />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;