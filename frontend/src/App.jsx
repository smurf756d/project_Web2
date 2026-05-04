import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyRecipes from "./pages/MyRecipes";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyRecipes />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;