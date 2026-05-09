const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const connectDB = require("./config/db");
const passport = require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const swaggerSpec = require("./docs/swagger");

const app = express();

/**
 * CORS allows the frontend React app to communicate with the backend.
 * credentials: true is needed for OAuth/session-based redirects.
 */
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);

/**
 * Allows the backend to read JSON request bodies.
 * The limit is increased because profile images may be sent as base64 temporarily.
 */
app.use(express.json({ limit: "5mb" }));

/**
 * Session is required for Passport OAuth redirect flow.
 * JWT is still the main authentication method after login.
 */
app.use(
    session({
        secret: process.env.SESSION_SECRET || "default_session_secret",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

/**
 * Swagger / OpenAPI documentation.
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Health check route.
 * Used to confirm that the backend server is running.
 */
app.get("/", (req, res) => {
    res.json({
        message: "Smart Kitchen Hub backend is running",
        database: "MongoDB Atlas",
    });
});

/**
 * Authentication routes.
 * Includes local auth, protected profile route, Google OAuth, and Facebook OAuth.
 */
app.use("/api/v1/auth", authRoutes);

/**
 * Global error handler should always be after all routes.
 */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

/**
 * Start the server only after MongoDB Atlas connection succeeds.
 * This prevents the API from running without a database connection.
 */
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
    });
});