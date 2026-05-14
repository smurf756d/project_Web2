const mongoose = require("mongoose");

<<<<<<< HEAD
const userSchema = new mongoose.Schema(
  {
    name: {
=======
/**
 * User Schema
 * Supports local login and future social login providers.
 */

const userSchema = new mongoose.Schema(
  {
    fullName: {
>>>>>>> 6558e606d5332cb48aa21e35946e7852dfdc96eb
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

<<<<<<< HEAD
    password: {
      type: String,
      required: true,
      minlength: 6,
=======
    passwordHash: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
>>>>>>> 6558e606d5332cb48aa21e35946e7852dfdc96eb
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
<<<<<<< HEAD
=======

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
      default: null,
    },

    facebookId: {
      type: String,
      default: null,
    },

    profileImage: {
      type: String,
      default: null,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
>>>>>>> 6558e606d5332cb48aa21e35946e7852dfdc96eb
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
module.exports = mongoose.model(
  "User",
  userSchema
);
=======
/**
 * Returns safe user data without passwordHash.
 */
userSchema.methods.toSafeObject = function () {
  return {
    id: this._id,
    fullName: this.fullName,
    email: this.email,
    role: this.role,
    provider: this.provider,
    profileImage: this.profileImage,
    isEmailVerified: this.isEmailVerified,
  };
};

module.exports = mongoose.model("User", userSchema);
>>>>>>> 6558e606d5332cb48aa21e35946e7852dfdc96eb
