// Import the jsonwebtoken package for JWT functionality
const jwt = require("jsonwebtoken");

// Load environment variables using dotenv
require("dotenv").config();

// Extract JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware function to authenticate JWT token from Authorization header
function authenticateToken(req, res, next) {
  // Extracting the Authorization header from the request
  const authHeader = req.headers.authorization;

  // Extracting the token from the Authorization header
  const token = authHeader && authHeader.split(" ")[1];

  // Checking if token is missing, if so, send 401 Unauthorized status
  if (token == null)
    return res.sendStatus(401).json({
      Message: "No token provided!",
    });

  // Verify the JWT token with the JWT_SECRET
  const decoding = jwt.verify(token, JWT_SECRET, (err, user) => {
    // If there's an error or token is invalid, send 403 Forbidden status
    if (err)
      return res.sendStatus(403).json({
        Message: "Invalid token!",
      });
    req.user = user;
    next();
  });
}

// Export the authenticateToken middleware function
module.exports = authenticateToken;
