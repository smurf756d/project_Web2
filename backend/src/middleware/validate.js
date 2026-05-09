/**
 * Validation middleware.
 * It receives a validator function and returns errors if request body is invalid.
 */
const validate = (validator) => {
    return (req, res, next) => {
        const errors = validator(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validation failed",
                errors,
            });
        }

        next();
    };
};

module.exports = validate;