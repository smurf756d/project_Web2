const mongoose = require("mongoose");

const myRecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    ingredients: {
      type: [String],
      required: true,
    },

    instructions: {
      type: String,
      required: true,
    },

    time: {
      type: Number,
      required: true,
    },

    calories: {
      type: Number,
      required: true,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    // Reference to canonical Recipe document when applicable
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: false,
    },

/**
 * Link recipe to logged-in user
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

module.exports = mongoose.model(
    "MyRecipe", 
    myRecipeSchema
);