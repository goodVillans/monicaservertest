// Import Express framework and router
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

//Route to register a new user
router.post("/register", userController.registerUser);

// Route to login an existing user
router.post("/login", userController.loginUser);

// Route to get all users
router.get("/", userController.getUsers);

// Route to edit user role
router.put("/role", userController.editUserRole);

module.exports = router;
