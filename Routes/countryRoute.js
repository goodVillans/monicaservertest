// Import Express framework and router
const express = require("express");
const router = express.Router();
const countryController = require("../Controllers/countryController");
const authenticateToken = require("../Middleware/authMiddleware");
const authRole = require("../Middleware/authRole");

// Route to fetch all countries
router.get("/", countryController.getAllCountries);

// Route to fetch details of a single country by ID
router.get("/:countryId", countryController.getCountryById);

// Route to create a new country
router.post("/", countryController.addCountry);

// Route to delete a country by ID
router.delete(
  "/:countryId",
  [authenticateToken, authRole("admin")],
  countryController.deleteCountry
);

// Route to edit a country by ID
router.put(
  "/:countryId",
  // Middleware to authenticate token and check role
  [authenticateToken, authRole("admin")],
  countryController.editCountry
);

module.exports = router;
