// Import necessary dependencies for the test
const { getCountryById } = require("../Controllers/countryController");
const Country = require("./Models/modelsCountry");

// Describe the test
describe("getCountryById", () => {
  it("returns the country if found", async () => {
    // Create a mock country
    const mockCountry = { _id: "1", name: "Test Country" };
    // Simulate the behavior of the Country model's findById function
    Country.findById.mockResolvedValue(mockCountry);

    // Create a mock request with necessary parameters
    const req = { params: { countryId: "1" } };
    // Create a mock response with a jest.fn() to check behavior
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    // Call the getCountryById function with mock parameters
    await getCountryById(req, res);

    // Check that the function responds with the correct country
    expect(res.json).toHaveBeenCalledWith(mockCountry);
    // Check that the function responds with status 200 (optional)
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("returns 404 if country not found", async () => {
    // Simulate the behavior of the Country model's findById function not finding the country
    Country.findById.mockResolvedValue(null);

    // Create a mock request with parameters for a non-existent country
    const req = { params: { countryId: "nonexistent" } };
    // Create a mock response with a jest.fn() to check behavior
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    // Call the getCountryById function with mock parameters
    await getCountryById(req, res);

    // Check that the function responds with status 404
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
