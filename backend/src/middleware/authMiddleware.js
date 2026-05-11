function protect(req, res, next) {
  // Temporary placeholder until real login/JWT is connected
  req.user = {
    id: "demo-admin-id",
    role: "admin",
  };

  next();
}

function authorizeAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });
  }

  next();
}

module.exports = {
  protect,
  authorizeAdmin,
};