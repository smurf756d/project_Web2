const mongoose = require("mongoose");

const favoriteRecipeSchema = new mongoose.Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MyRecipe",
      required: true,
    },

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

favoriteRecipeSchema.index({ user: 1, recipe: 1 }, { unique: true });

module.exports = mongoose.model("FavoriteRecipe", favoriteRecipeSchema);