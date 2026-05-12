/**
 * Simple validation helpers.
 * These functions keep validation rules reusable and clean.
 */

const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
};

const validateRegister = (body) => {
    const errors = [];

    if (!body.fullName || !body.fullName.trim()) {
        errors.push("Full name is required");
    }

    if (!body.email || !body.email.trim()) {
        errors.push("Email is required");
    } else if (!isValidEmail(body.email)) {
        errors.push("Please enter a valid email");
    }

    if (!body.password) {
        errors.push("Password is required");
    } else if (body.password.length < 8) {
        errors.push("Password must be at least 8 characters");
    }

    if (!body.confirmPassword) {
        errors.push("Confirm password is required");
    } else if (body.password !== body.confirmPassword) {
        errors.push("Passwords do not match");
    }

    return errors;
};

/**
 * Validate login request body.
 */
const validateLogin = (body) => {
    const errors = [];

    if (!body.email || !body.email.trim()) {
        errors.push("Email is required");
    }

    if (!body.password) {
        errors.push("Password is required");
    }

    return errors;
};

module.exports = {
    validateRegister,
    validateLogin,
};