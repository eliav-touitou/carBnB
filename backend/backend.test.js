const request = require("supertest");
const {
  mockBodyResponseAllCars,
  uniqueCarId,
  mockBodyResponseUniqueCar,
  mockNewCarToUpload,
  mockBodyResponseForUpload,
} = require("./mockDataTests");
const app = require("./app");

describe("Cars route", () => {
  it("Should return all cars from DB", async () => {
    const response = await request(app).get("/api/v1/cars/allcars");

    // Is the status code 200
    expect(response.status).toBe(200);

    expect(response.body).toEqual(mockBodyResponseAllCars);
  });

  it("Should return a unique car from DB", async () => {
    const response = await request(app)
      .post("/api/v1/cars/uniquecar")
      .send(uniqueCarId);

    // Is the status code 200
    expect(response.status).toBe(200);

    expect(response.body).toEqual(mockBodyResponseUniqueCar);
  });

  it("Should success upload new car to DB", async () => {
    const response = await request(app)
      .post("/api/v1/cars/upload")
      .send(mockNewCarToUpload);

    // Is the status code 200
    expect(response.status).toBe(200);

    expect(response.body).toEqual(mockBodyResponseForUpload);
  });
});
