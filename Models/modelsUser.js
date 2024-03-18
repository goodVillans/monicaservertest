// Import Mongoose
const mongoose = require("mongoose");

// Definition of the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  surname: { type: String, required: true },
  address: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["normal", "admin"],
    default: "normal",
  },
});

// Creating the user model using the defined schema
const User = mongoose.model("User", userSchema);

// Exporting the user model to use it elsewhere in the application
module.exports = User;
