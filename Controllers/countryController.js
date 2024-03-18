// Importing the Country model
const Country = require("../Models/modelsCountry");

// Controller function to fetch all countries
const getAllCountries = async (req, res) => {
  try {
    // Fetch all countries from the database
    const countries = await Country.find();
    // Respond with the fetched countries
    res.status(200).json(countries);
    // Handle errors
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};
// Controller function to fetch a country by ID
const getCountryById = async (req, res) => {
  const { countryId } = req.params;
  try {
    // Find the country by ID
    const country = await Country.findById(countryId);
    // If country is not found, return 404 error
    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }
    // Respond with the country object
    res.json(country);
    console.log(country);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to add a new country
const addCountry = async (req, res) => {
  const { name, description, date } = req.body;
  try {
    // Create a new country object with provided details
    const newCountry = new Country({ name, description, date });
    // Save the new country to the database
    await newCountry.save();
    // Respond with the newly created country object
    res.status(201).json(newCountry);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to delete a country by ID
const deleteCountry = async (req, res) => {
  // const { countryId } = req.params;
  try {
    // Find and delete the country by ID
    const deletedCountry = await Country.findByIdAndDelete(
      req.params.countryId
    );
    // If country is not found, return 404 error
    if (!deletedCountry) {
      return res.status(404).json({ error: "Country not found" });
    }
    // Respond with the deleted country object
    res.status(200).json(deletedCountry);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to edit a country by ID
const editCountry = async (req, res) => {
  const { countryId } = req.params;
  const { name, description, date, image } = req.body;
  try {
    // Find and update the country by ID with provided details
    const updatedCountry = await Country.findByIdAndUpdate(
      countryId,
      { name, description, date, image },
      { new: true }
    );
    // If country is not found, return 404 error
    if (!updatedCountry) {
      return res.status(404).json({ error: "Country not found" });
    }
    // Respond with success message and updated country object
    res.json({
      message: "Country edited successfully",
      country: updatedCountry,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllCountries,
  addCountry,
  deleteCountry,
  editCountry,
  getCountryById,
};
