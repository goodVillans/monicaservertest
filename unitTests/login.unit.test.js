const app = require("../app");
const mongoose = require("mongoose");

describe("Login Endpoint", () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(
      "mongodb+srv://Monica2:WebDev24@monica2024.fme9srs.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  });

  afterAll(async () => {
    // Close the connection to the test database
    await mongoose.connection.close();
  });

  it("should login an existing user", async () => {
    // Data for logging in an existing user
    const userData = {
      username: "username",
      password: "password",
    };

    // Simulate a request to the login endpoint directly
    const response = await app.post("/api/user/login").send(userData);

    // Ensure that the response has a status code 200
    expect(response.status).toBe(200);
    // Add further assertions if necessary
  });
});
