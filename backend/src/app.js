const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const swaggerSpecs = require("./docs/swagger");
const authenticate = require("./middleware/authenticate");
const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(cors());
app.use(express.json());

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
app.use("/api/dashboard", dashboardRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);


app.use(errorHandler);

module.exports = app;