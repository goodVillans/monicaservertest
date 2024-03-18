// Importing Express framework
const express = require("express");
const path = require("path");
// Importing the mongoose library for MongoDB operations
const mongoose = require("mongoose");
// Importing cookie-parser for parsing cookies
const cookieParser = require("cookie-parser");
// Importing morgan for logging requests
const logger = require("morgan");
// Load environment variables using dotenv
require("dotenv").config();
// Importing the cors middleware for enabling Cross-Origin Resource Sharing (CORS)
const cors = require("cors");

const app = express();
const PORT = 8000;
const corsOption = {
  origin: "http://localhost:3000",
};

// Logging middleware for development environment
app.use(logger("dev"));
// Middleware for parsing incoming JSON bodies
app.use(express.json());
// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware for parsing cookie headers
app.use(cookieParser());
// Middleware for enabling CORS using the provided options
app.use(cors(corsOption));
// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "frontend", "build")));

// Connect to MongoDB database
mongoose
  .connect("mongodb+srv://Monica2:WebDev24@monica2024.fme9srs.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

//Importing the Routers
const userRoutes = require("./Routes/userRoutes");
const countryRoutes = require("./Routes/countryRoute");

app.use("/api/user", userRoutes);
app.use("/api/countries", countryRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
