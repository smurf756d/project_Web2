const {
    registerUser,
    loginUser,
    getUserProfile,
} = require("../services/authService");

/**
 * Auth Controller
 * Controllers only handle request and response.
 */

const testAuth = (req, res) => {
    res.json({
        message: "Auth route works",
    });
};

const register = async (req, res, next) => {
    try {
        const result = await registerUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await loginUser(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const profile = async (req, res, next) => {
    try {
        const user = await getUserProfile(req.user.id);
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    testAuth,
    register,
    login,
    profile,
};