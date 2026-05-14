const mongoose = require("mongoose");

const userPreferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    vegetarian: {
      type: Boolean,
      default: false,
    },

    lowCarb: {
      type: Boolean,
      default: false,
    },

    highProtein: {
      type: Boolean,
      default: false,
    },

    generatedCountToday: {
      type: Number,
      default: 0,
    },

    lastGeneratedDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const UserPreference = mongoose.model(
  "UserPreference",
  userPreferenceSchema
);

module.exports = UserPreference;