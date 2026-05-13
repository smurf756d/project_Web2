/**
 * Validation middleware.
 * Receives a validator function and returns validation errors if found.
 */
const validate = (validator) => {
  return (req, res, next) => {
    const errors = validator(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    next();
  };
};

module.exports = validate;