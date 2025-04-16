const request = require("supertest");
const app = require("../src/index"); // adjust if needed
const api = request(app);

describe("GET routes", () => {
  test("GET / should return a success message", () => {
    return api.get("/").expect(200).expect("Server operational");
  });

  test("GET /GetRequests/AllRequests should return an array", () => {
    return api
      .get("/GetRequests/AllRequests")
      .expect(200)
      .expect("Content-Type", /json/);
  });

  test("GET /GetRequests/acceptedRequests should return an array", () => {
    return api
      .get("/GetRequests/acceptedRequests")
      .expect(200)
      .expect("Content-Type", /json/);
  });

  test("GET /buildings/get-buildings should return an array", () => {
    return api
      .get("/buildings/get-buildings")
      .expect(200)
      .expect("Content-Type", /json/);
  });

  test("GET /locations/allLocations should return an array", () => {
    return api
      .get("/locations/allLocations")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});

