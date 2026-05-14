const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const openApiSpec = require("./docs/swagger");

const authRoutes = require("./routes/auth.routes");
const myRecipeRoutes = require("./routes/myRecipe.routes");
const favoriteRecipeRoutes = require("./routes/favoriteRecipe.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

/**
 * Enable CORS for frontend requests
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * Parse incoming JSON requests
 */
app.use(express.json());

/**
 * Swagger API documentation setup
 */
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(openApiSpec)
);

/**
 * Health check route
 */
app.get("/", (req, res) => {
  res.send("API is running");
});

/**
 * API routes
 */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/my-recipes", myRecipeRoutes);
app.use("/api/v1/favorites", favoriteRecipeRoutes);


/**
 * Global error handling middleware
 */
app.use(errorHandler);

module.exports = app;