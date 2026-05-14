require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");

const connectDB = require("./config/db");
const passport = require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/generateRecipeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const errorHandler = require("./middleware/errorHandler");
const swaggerSpec = require("./docs/swagger");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`\n📨 INCOMING: ${req.method} ${req.path}`);
  next();
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get("/", (req, res) => {
  res.json({
    message: "Smart Kitchen Hub backend is running",
    database: "MongoDB Atlas",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.use("/api", (req, res) => {
  console.log(`❌ 404: ${req.method} ${req.originalUrl} not found in API routes`);
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(
        `Swagger docs: http://localhost:${PORT}/api-docs`
      );
    });
  })
  .catch((err) => {
    console.error(
      "Database connection failed:",
      err.message
    );

    process.exit(1);
  });