// Import Mongoose
const mongoose = require("mongoose");

// Define the schema for the Country model
const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

// Create the Country model using the defined schema
const Country = mongoose.model("Country", countrySchema);

// Export the Country model
module.exports = Country;
