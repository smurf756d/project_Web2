const express = require("express");

const authRoutes = require("./routes/v1/auth.routes");
const recipeRoutes = require("./routes/v1/recipe.routes");
const myRecipeRoutes = require("./routes/v1/myRecipe.routes");
const favoriteRecipeRoutes = require("./routes/v1/favoriteRecipe.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/my-recipes", myRecipeRoutes);
app.use("/api/v1/favorites", favoriteRecipeRoutes);

module.exports = app;