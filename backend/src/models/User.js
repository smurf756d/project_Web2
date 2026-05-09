const mongoose = require("mongoose");

/**
 * User Schema
 * Supports local login and future social login providers.
 */
const userSchema = new mongoose.Schema(
    {
        fullName: {
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

        passwordHash: {
            type: String,
            required: function () {
                return this.provider === "local";
            },
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        provider: {
            type: String,
            enum: ["local", "google", "facebook", "apple"],
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
    },
    {
        timestamps: true,
    }
);

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