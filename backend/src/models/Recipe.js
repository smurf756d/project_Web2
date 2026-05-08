const mongoose = require("mongoose");

/**
 * Recipe Schema
 * Stores user recipes and saved recipes.
 */

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    ingredients: {
      type: [String],
      default: [],
    },

    instructions: {
      type: String,
      default: "",
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;