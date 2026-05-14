const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerSpecs = require("./docs/swagger"); 
const authRoutes = require("./routes/authRoutes"); 
const dashboardRoutes = require("./routes/dashboardRoutes");
const myRecipeRoutes = require("./routes/myRecipe.routes");
const favoriteRecipeRoutes = require("./routes/favoriteRecipe.routes");

const authenticate = require("./middleware/authenticate");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs)
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Kitchen Hub API is running",
  });
});

app.get("/api/protected", authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/my-recipes", myRecipeRoutes);
app.use("/api/favorites", favoriteRecipeRoutes);

app.use(errorHandler);

module.exports = app;
