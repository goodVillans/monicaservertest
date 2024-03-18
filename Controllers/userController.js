const User = require("../Models/modelsUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET } = process.env;

// Function to generate a JWT access token
function generateAccessToken(userId, userName, userRole) {
  return jwt.sign({ userId, userName, userRole }, JWT_SECRET, {
    expiresIn: "15m",
  });
}

// Route for handling registration
const registerUser = async (req, res) => {
  try {
    // Simulate example registration logic
    const {
      username,
      fullName,
      surname,
      address,
      dateOfBirth,
      phone,
      email,
      password,
    } = req.body;

    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exist" });
    }

    //  // Create new user instance & Save credentials to database
    const user = new User({
      username: username,
      fullName: fullName,
      surname: surname,
      address: address,
      dateOfBirth: dateOfBirth,
      phone: phone,
      email: email,
      password: password,
      role: "normal",
    });

    // Save the new user to the database
    await user.save();
    // Generate JWT access token
    const accessToken = generateAccessToken(user._id, user.username, user.role);

    // Respond with success message
    res.status(200).json({
      message: "Registration successful",
      token: accessToken,
      userRole: user.role,
    });
  } catch (err) {
    // Return an error response if there was a problem saving to the database
    console.error("Error saving user:", err);
    res.status(500).json({ message: "Error saving user to database" });
  }
};

// Route for handling login
const loginUser = async (req, res) => {
  try {
    // Retrieve login data from request body
    const { username, password } = req.body;
    // Find user by username
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    // Generate JWT access token
    const accessToken = generateAccessToken(user._id, user.username, user.role);
    // Respond with success message and token
    const test = res.status(200).json({
      message: "Login successful",
      token: accessToken,
      userRole: user.role,
    });
    console.log(test);
  } catch (error) {
    res.status(500).json({ message: "Error logging", error: error.message });
  }
};
// Route for getting all users
const getUsers = async (req, res) => {
  try {
    // Retrieve all users from database
    const users = await User.find(
      {},
      "username fullName surname address dateOfBirth phone email role"
    );
    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get users!", error: error.message });
  }
};

// Route for editing user role
const editUserRole = async (req, res) => {
  const { userId, newRole } = req.body;
  // Check if the new role is valid
  if (!["normal", "admin"].includes(newRole)) {
    return res.status(400).json({ message: "Invalid Role" });
  }
  try {
    // Update user's role in the database
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    );
    // Return error if user is not found
    if (!updateUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    // Respond with success message
    res.status(200).json({ message: "User updated!" });
  } catch (error) {
    res
      .status(500)
      // Return error response if failed to update user role
      .json({ message: "Failed to update users role!", error: error.message });
  }
};

// Export controller functions
module.exports = {
  registerUser,
  loginUser,
  getUsers,
  editUserRole,
};
