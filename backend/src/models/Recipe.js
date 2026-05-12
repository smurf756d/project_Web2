const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
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

    // Link recipe to the logged-in user
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

module.exports = mongoose.model("Recipe", recipeSchema);