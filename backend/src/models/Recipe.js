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

    steps: {
      type: [String],
      required: true,
    },

    cookingTime: {
      type: String,
      required: true,
    },

    calories: {
      type: String,
      required: true,
    },

    diet: {
      type: String,
      required: true,
    },

   sourceIngredients: {
  type: [String],
  default: [],
},

    cuisine: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema)