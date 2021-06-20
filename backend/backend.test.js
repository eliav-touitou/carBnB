const request = require("supertest");
const {
  notFoundMessage,
  mockBodyResponseAllCars,
  uniqueCarId,
  mockBodyResponseUniqueCar,
  mockNewCarToUpload,
  mockBodyResponseForUpload,
  mockBodyResponseAllRentals,
  uniqueRentalId,
  mockBodyResponseUniqueRental,
} = require("./utils/mockDataTests");
const app = require("./app");
const { Car, Rental } = require("../database/models");
const {
  mockCarsSeeders,
  mockRentalsSeeders,
} = require("./utils/mockDataTestsSeeders");

describe("Cars route", () => {
  //seeding data before each test
  beforeEach(async () => {
    console.log("before each");
    try {
      await Car.bulkCreate(mockCarsSeeders);
    } catch (err) {
      console.log(err);
    }
  });

  //remove data before each test
  afterEach(async () => {
    console.log("after each");
    try {
      await Car.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });

  it("Should return all cars from DB", async () => {
    const response = await request(app).get("/api/v1/cars/allcars");

    const arrToCheck = { success: true, data: [] };
    response.body.data.forEach((car) => {
      const temp = {
        car_id: car.car_id,
        owner_email: car.owner_email,
        brand: car.brand,
        year: car.year,
        model: car.model,
        fuel: car.fuel,
      };
      arrToCheck.data.push(temp);
    });

    // Is the status code 200
    expect(response.status).toBe(200);
    // Is the response equals to mock response
    expect(arrToCheck).toEqual(mockBodyResponseAllCars);
  });

  it("Should return a unique car from DB by id", async () => {
    const response = await request(app)
      .post("/api/v1/cars/uniquecar")
      .send(uniqueCarId);

    const data = {
      success: true,
      data: {
        car_id: response.body.data.car_id,
        owner_email: response.body.data.owner_email,
        brand: response.body.data.brand,
        year: response.body.data.year,
        model: response.body.data.model,
        fuel: response.body.data.fuel,
      },
    };

    // Is the status code 200
    expect(response.status).toBe(200);
    // Is the response equals to mock response
    expect(data).toEqual(mockBodyResponseUniqueCar);
  });

  it("Should success upload new car to DB", async () => {
    const responseAllCarsBefore = await request(app).get(
      "/api/v1/cars/allcars"
    );
    const response = await request(app)
      .post("/api/v1/cars/upload")
      .send(mockNewCarToUpload);

    const responseAllCarsAfter = await request(app).get("/api/v1/cars/allcars");

    // Is the status code 200
    expect(response.status).toBe(200);
    // Is the response equals to mock response
    expect(response.body).toEqual(mockBodyResponseForUpload);

    // Check if the length of all cars before upload is less then after
    expect(responseAllCarsBefore.body.data.length).toBeLessThan(
      responseAllCarsAfter.body.data.length
    );
  });
  // Checks error side
  describe("Inner Car route", () => {
    beforeEach(async () => {
      console.log("before each");
      try {
        await Car.destroy({ where: {} });
      } catch (err) {
        console.log(err);
      }
    });

    it("Should return 404 error if there no car that have the id", async () => {
      const response = await request(app)
        .post("/api/v1/cars/uniquecar")
        .send({ id: 8 });

      // Is the status code 404
      expect(response.status).toBe(404);
      // Is the response equals to mock response
      expect(response.body).toEqual(notFoundMessage);
    });
  });
});

describe("Rental route", () => {
  it("Should return all rentals from DB", async () => {
    const response = await request(app).get("/api/v1/rentals/allrentals");

    const arrToCheck = { success: true, data: [] };
    response.body.data.forEach((rental) => {
      const temp = {
        transaction_id: rental.transaction_id,
        car_id: rental.car_id,
        owner_email: rental.owner_email,
        renter_email: rental.renter_email,
        start_date: rental.start_date,
        end_date: rental.end_date,
        total_price: rental.total_price,
      };
      arrToCheck.data.push(temp);
    });

    // Is the status code 200
    expect(response.status).toBe(200);
    // Is the response equals to mock response
    expect(arrToCheck).toEqual(mockBodyResponseAllRentals);
  });

  // ############### need to change ############### //

  //   it("Should return a unique rental from DB", async () => {
  //     const response = await request(app)
  //       .post("/api/v1/rentals/uniquerental")
  //       .send(uniqueRentalId);

  //     // Is the status code 200
  //     expect(response.status).toBe(200);

  //     expect(response.body).toEqual(mockBodyResponseUniqueRental);
  //   });

  // Checks error side
  describe("Inner Rental route", () => {
    beforeEach(async () => {
      console.log("before each");
      try {
        await Rental.destroy({ where: {} });
      } catch (err) {
        console.log(err);
      }
    });

    afterEach(async () => {
      console.log("after each");
      try {
        await Rental.bulkCreate(mockRentalsSeeders);
      } catch (err) {
        console.log(err);
      }
    });

    it("Should return 404 error if there no rental", async () => {
      const response = await request(app).get("/api/v1/rentals/allrentals");

      // Is the status code 404
      expect(response.status).toBe(404);
      // Is the response equals to mock response
      expect(response.body).toEqual(notFoundMessage);
    });
  });
});
