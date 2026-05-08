const express = require("express");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/v1/auth.routes");
const recipeRoutes = require("./routes/v1/recipe.routes");
const myRecipeRoutes = require("./routes/v1/myRecipe.routes");
const favoriteRecipeRoutes = require("./routes/v1/favoriteRecipe.routes");

const app = express();

app.use(express.json());

const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Smart Kitchen Hub API",
    version: "1.0.0",
    description:
      "OpenAPI documentation for Smart Kitchen Hub backend APIs.",
  },
  servers: [
    {
      url: "http://localhost:5000/api/v1",
      description: "Local development server",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Authentication endpoints",
    },
    {
      name: "My Recipes",
      description: "Logged-in user recipe management",
    },
    {
      name: "Favorites",
      description: "Logged-in user favorite recipes",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "69fe422a8af04e27031318cb",
          },
          name: {
            type: "string",
            example: "Noor",
          },
          email: {
            type: "string",
            example: "noor@gmail.com",
          },
          role: {
            type: "string",
            example: "user",
          },
        },
      },
      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
            example: "Noor",
          },
          email: {
            type: "string",
            example: "noor@gmail.com",
          },
          password: {
            type: "string",
            example: "123456",
          },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            example: "noor@gmail.com",
          },
          password: {
            type: "string",
            example: "123456",
          },
        },
      },
      MyRecipe: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "69fe6de15cf6607dbd57ddf5",
          },
          title: {
            type: "string",
            example: "Updated Chicken Salad",
          },
          image: {
            type: "string",
            example: "https://example.com/updated-salad.jpg",
          },
          ingredients: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["Chicken", "Lettuce", "Tomato", "Avocado"],
          },
          instructions: {
            type: "string",
            example: "Mix everything and serve fresh",
          },
          time: {
            type: "number",
            example: 25,
          },
          calories: {
            type: "number",
            example: 390,
          },
          user: {
            type: "string",
            example: "69fe422a8af04e27031318cb",
          },
        },
      },
      MyRecipeRequest: {
        type: "object",
        required: ["title", "ingredients", "instructions", "time", "calories"],
        properties: {
          title: {
            type: "string",
            example: "Healthy Chicken Salad",
          },
          image: {
            type: "string",
            example: "https://example.com/salad.jpg",
          },
          ingredients: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["Chicken", "Lettuce", "Tomato"],
          },
          instructions: {
            type: "string",
            example: "Mix all ingredients together",
          },
          time: {
            type: "number",
            example: 20,
          },
          calories: {
            type: "number",
            example: 350,
          },
        },
      },
      FavoriteRecipe: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "69fe6e8e5cf6607dbd57ddf6",
          },
          recipe: {
            $ref: "#/components/schemas/MyRecipe",
          },
          user: {
            type: "string",
            example: "69fe422a8af04e27031318cb",
          },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "Internal server error",
          },
        },
      },
    },
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        description:
          "Creates a new user account after validating required fields and hashing the password.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
          },
          400: {
            description: "Validation error",
          },
          409: {
            description: "User already exists",
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        description:
          "Authenticates a user and returns a JWT token used for protected routes.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
          },
          400: {
            description: "Missing email or password",
          },
          401: {
            description: "Invalid email or password",
          },
        },
      },
    },
    "/my-recipes": {
      get: {
        tags: ["My Recipes"],
        summary: "Get my recipes",
        description:
          "Returns recipes owned by the authenticated user only.",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Recipes fetched successfully",
          },
          401: {
            description: "Missing or invalid JWT token",
          },
        },
      },
      post: {
        tags: ["My Recipes"],
        summary: "Create my recipe",
        description:
          "Creates a recipe and links it to the authenticated user.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/MyRecipeRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Recipe created successfully",
          },
          400: {
            description: "Validation error",
          },
          401: {
            description: "Missing or invalid JWT token",
          },
        },
      },
    },
    "/my-recipes/{id}": {
      put: {
        tags: ["My Recipes"],
        summary: "Update my recipe",
        description:
          "Updates a recipe only if it belongs to the authenticated user.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/MyRecipeRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Recipe updated successfully",
          },
          404: {
            description: "Recipe not found or not allowed",
          },
        },
      },
      delete: {
        tags: ["My Recipes"],
        summary: "Delete my recipe",
        description:
          "Deletes a recipe only if it belongs to the authenticated user.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Recipe deleted successfully",
          },
          404: {
            description: "Recipe not found or not allowed",
          },
        },
      },
    },
    "/favorites": {
      get: {
        tags: ["Favorites"],
        summary: "Get favorite recipes",
        description:
          "Returns the authenticated user's favorite recipes.",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Favorites fetched successfully",
          },
          401: {
            description: "Missing or invalid JWT token",
          },
        },
      },
    },
    "/favorites/{recipeId}": {
      post: {
        tags: ["Favorites"],
        summary: "Add recipe to favorites",
        description:
          "Adds a recipe to the authenticated user's favorites.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "recipeId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          201: {
            description: "Recipe added to favorites",
          },
          409: {
            description: "Recipe already in favorites",
          },
        },
      },
      delete: {
        tags: ["Favorites"],
        summary: "Remove recipe from favorites",
        description:
          "Removes a recipe from the authenticated user's favorites.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "recipeId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Recipe removed from favorites",
          },
          404: {
            description: "Favorite recipe not found",
          },
        },
      },
    },
  },
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/my-recipes", myRecipeRoutes);
app.use("/api/v1/favorites", favoriteRecipeRoutes);

module.exports = app;