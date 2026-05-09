const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

/**
 * Registers a new local user.
 * Business logic stays in the service layer to keep controllers clean.
 */
const registerUser = async ({ fullName, email, password, profileImage }) => {
    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName,
        email: normalizedEmail,
        passwordHash,
        provider: "local",
        profileImage: profileImage || null,
    });

    const token = generateToken(user);

    return {
        message: "User registered successfully",
        token,
        user: user.toSafeObject(),
    };
};

/**
 * Logs in a local user using email and password.
 */
const loginUser = async ({ email, password }) => {
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !user.passwordHash) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(user);

    return {
        message: "Login successful",
        token,
        user: user.toSafeObject(),
    };
};

/**
 * Gets the profile of the logged-in user.
 */
const getUserProfile = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user.toSafeObject();
};

/**
 * Finds or creates a user from Google profile.
 */
const handleGoogleUser = async (profile) => {
    const email = profile.emails?.[0]?.value;
    const profileImage = profile.photos?.[0]?.value;

    let user = await User.findOne({ googleId: profile.id });

    if (!user && email) {
        user = await User.findOne({ email });
    }

    if (!user) {
        user = await User.create({
            fullName: profile.displayName || "Google User",
            email,
            googleId: profile.id,
            provider: "google",
            profileImage: profileImage || null,
            isEmailVerified: true,
        });
    } else {
        user.googleId = profile.id;
        user.provider = user.provider || "google";
        user.profileImage = user.profileImage || profileImage;
        await user.save();
    }

    return user;
};




module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    handleGoogleUser,

};