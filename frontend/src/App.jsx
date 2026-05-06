import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyRecipes from "./pages/MyRecipes";
import Favorites from "./pages/Favorites";
import HelpTips from "./pages/HelpTips";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyRecipes />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/help" element={<HelpTips />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;