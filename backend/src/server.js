require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");
const { swaggerUi, swaggerSpec } = require("./docs/swagger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const recipeRoutes = require("./routes/recipes");
const adminRoutes = require("./routes/admin");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/recipes", recipeRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});