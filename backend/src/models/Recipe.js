const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: String,
    ingredients: [String],
    steps: [String],
    cookingTime: String,
    calories: String,
    diet: String,
    cuisine: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);