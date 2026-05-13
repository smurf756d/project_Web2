/**
 * Temporary authentication middleware.
 * Replace with JWT User authentication after User model is merged.
 */
const authenticate = (req, res, next) => {
  req.user = {
    id: "demo-admin-id",
    role: "admin",
  };

  next();
};

module.exports = authenticate;