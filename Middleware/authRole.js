// Middleware function to check user role
const authRole = (...role) => {
  // Return middleware function
  return (req, res, next) => {
    // Check if user exists and if their role is included in the specified roles
    if (!req.user || !role.includes(req.user.userRole)) {
      // If user role is not authorized, send forbidden status and message
      return res.status(403).json({ Message: "No permission!" });
    }
    // If user role is authorized, proceed to the next middleware
    next();
  };
};

// Export authRole middleware function
module.exports = authRole;
