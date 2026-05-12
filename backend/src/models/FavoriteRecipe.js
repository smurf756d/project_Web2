const mongoose = require("mongoose");

const favoriteRecipeSchema =
  new mongoose.Schema(
    {
      /**
       * Favorite recipe reference
       */
      recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MyRecipe",
        required: true,
      },

      /**
       * Logged-in user reference
       */
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

/**
 * Prevent duplicate favorite recipes
 * for the same user
 */
favoriteRecipeSchema.index(
  { user: 1, recipe: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "FavoriteRecipe",
  favoriteRecipeSchema
);