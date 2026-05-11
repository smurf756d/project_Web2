import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import GenerateRecipe from "./pages/GenerateRecipe";
import AdminDashboard from "./pages/AdminDashboard";
import MyRecipes from "./pages/MyRecipes";
import Favorites from "./pages/Favorites";
import HelpTips from "./pages/HelpTips";
import AuthPage from "./pages/AuthPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  useEffect(() => {
    const handleGoogleLogin = async () => {
      const hash = window.location.hash;

      if (hash.includes("token=")) {
        const token = hash.split("token=")[1];

        localStorage.setItem("token", token);

        try {
          const response = await axios.get(
            "http://localhost:5000/api/v1/auth/profile",
            {
              headers: {
                Authorization: Bearer ${token},
              },
            }
          );

          localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
          );
        } catch (error) {
          console.error("Failed to fetch user profile");
        }

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );

        alert("Google login successful");
      }
    };

    handleGoogleLogin();
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

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="generate-recipe"
            element={
              <ProtectedRoute>
                <GenerateRecipe />
              </ProtectedRoute>
            }
          />

          <Route
            path="my-recipes"
            element={
              <ProtectedRoute>
                <MyRecipes />
              </ProtectedRoute>
            }
          />

          <Route
            path="favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route path="help" element={<HelpTips />} />

          <Route
            path="admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;