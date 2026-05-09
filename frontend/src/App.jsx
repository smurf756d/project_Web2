import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import GenerateRecipe from "./pages/GenerateRecipe";
import AdminDashboard from "./pages/AdminDashboard";
import MyRecipes from "./pages/MyRecipes";
import Favorites from "./pages/Favorites";
import HelpTips from "./pages/HelpTips";
import AuthPage from "./pages/AuthPage";

function BrowseRecipes() {
    return <h2>Browse Recipes Page</h2>;
}

function App() {

    useEffect(() => {
        const hash = window.location.hash;

        if (hash.includes("token=")) {
            const token = hash.split("token=")[1];

            localStorage.setItem("token", token);

            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            );

            alert("Google login successful");
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>

                {/* Auth */}
                <Route path="/auth" element={<AuthPage />} />

                {/* Main Layout */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="dashboard" element={<UserDashboard />} />
                    <Route path="generate-recipe" element={<GenerateRecipe />} />
                    <Route path="browse-recipes" element={<BrowseRecipes />} />
                    <Route path="my-recipes" element={<MyRecipes />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="help" element={<HelpTips />} />
                    <Route path="admin-dashboard" element={<AdminDashboard />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;