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
  mockBodyResponseGetCarByCityName,
  mockBodyResponseTopCars,
  mockBodyResponseTopOwners,
  mockBodyResponseTopLocations,
  uniqueUser,
  mockBodyResponseUniqueUser,
  minRateForUser,
  mockBodyResponseUsersByRating,
  mockNewUserRegister,
  mockBodyResponseUserRegister,
} = require("./utils/mockDataTests");
const app = require("./app");
const { Car, Rental, User, Auth } = require("../database/models");
const {
  mockCarsSeeders,
  mockRentalsSeeders,
  mockUsersSeeders,
  mockAuthSeeders,
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

  // it("Should success upload new car to DB", async () => {
  //   const responseAllCarsBefore = await request(app).get(
  //     "/api/v1/cars/allcars"
  //   );
  //   const response = await request(app)
  //     .post("/api/v1/cars/upload")
  //     .send(mockNewCarToUpload);

  //   const responseAllCarsAfter = await request(app).get("/api/v1/cars/allcars");

  //   // Is the status code 200
  //   expect(response.status).toBe(200);
  //   // Is the response equals to mock response
  //   expect(response.body).toEqual(mockBodyResponseForUpload);

  //   // Check if the length of all cars before upload is less then after
  //   expect(responseAllCarsBefore.body.data.length).toBeLessThan(
  //     responseAllCarsAfter.body.data.length
  //   );
  // });

  it("Should return a car from DB by city name", async () => {
    const response = await request(app).get("/api/v1/cars/bycity/HAIFA");

    const data = {
      car_id: response.body.data[0].car_id,
      owner_email: response.body.data[0].owner_email,
      brand: response.body.data[0].brand,
      year: response.body.data[0].year,
      model: response.body.data[0].model,
      fuel: response.body.data[0].fuel,
      passengers: response.body.data[0].passengers,
      price_per_day: response.body.data[0].price_per_day,
      discount_for_week: response.body.data[0].discount_for_week,
      discount_for_month: response.body.data[0].discount_for_month,
    };

    // Is the status code 200
    expect(response.status).toBe(200);
    // Is the response equals to mock response
    expect(data).toEqual(mockBodyResponseGetCarByCityName);
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

  it("Should return a unique rental from DB", async () => {
    const response = await request(app)
      .post("/api/v1/rentals/uniquerental")
      .send(uniqueRentalId);

    const data = {
      success: true,
      data: {
        transaction_id: response.body.data.transaction_id,
        car_id: response.body.data.car_id,
        owner_email: response.body.data.owner_email,
        renter_email: response.body.data.renter_email,
        start_date: response.body.data.start_date,
        end_date: response.body.data.end_date,
        total_price: response.body.data.total_price,
        is_active: response.body.data.is_active,
      },
    };

    // Is the status code 200
    expect(response.status).toBe(200);

    expect(data).toEqual(mockBodyResponseUniqueRental);
  });

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

describe("Top route", () => {
  beforeEach(async () => {
    console.log("before each");
    try {
      await Car.bulkCreate(mockCarsSeeders);
    } catch (err) {
      console.log(err);
    }
  });

  // remove data before each test
  afterEach(async () => {
    console.log("after each");
    try {
      await Car.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });

  it("Should return top 5 or less cars from db", async () => {
    const response = await request(app).get("/api/v1/top/cars");

    const arrToCheck = { success: true, data: [] };
    response.body.data.forEach((car) => {
      const temp = {
        car_id: car.car_id,
        owner_email: car.owner_email,
        brand: car.brand,
        model: car.model,
        year: car.year,
        fuel: car.fuel,
        passengers: car.passengers,
        price_per_day: car.price_per_day,
        discount_for_week: car.discount_for_week,
        discount_for_month: car.discount_for_month,
        gear: car.gear,
      };
      arrToCheck.data.push(temp);
    });

    // Is the status code 200
    expect(response.status).toBe(200);
    // Is the response equals to mock response
    expect(arrToCheck).toEqual(mockBodyResponseTopCars);
  });
  it("Should return top 5 or less owners from db", async () => {
    const response = await request(app).get("/api/v1/top/owners");

    const arrToCheck = { success: true, data: [] };
    response.body.data.forEach((owner) => {
      const temp = {
        user_email: owner.user_email,
        phone_number: owner.phone_number,
        first_name: owner.first_name,
        last_name: owner.last_name,
        address: owner.address,
        rating: owner.rating,
        number_of_votes: owner.number_of_votes,
      };
      arrToCheck.data.push(temp);
    });

    // Is the status code 200
    expect(response.status).toBe(200);
    // Is the response equals to mock response
    expect(arrToCheck).toEqual(mockBodyResponseTopOwners);
  });

  it("Should return top 5 or less locations from db", async () => {
    const response = await request(app).get("/api/v1/top/locations");

    const arrToCheck = { success: true, data: [] };
    response.body.data.forEach((location) => {
      const temp = {
        city: location.city,
        description: location.description,
      };
      arrToCheck.data.push(temp);
    });

    // Is the status code 200
    expect(response.status).toBe(200);
    // Is the response equals to mock response
    expect(arrToCheck).toEqual(mockBodyResponseTopLocations);
  });
});

describe("Users route", () => {
  //seeding data before each test
  beforeEach(async () => {
    console.log("before each");
    try {
      await User.destroy({ where: {} });
      await User.bulkCreate(mockUsersSeeders);
      await Auth.destroy({ where: {} });
      await Auth.bulkCreate(mockAuthSeeders);
    } catch (err) {
      console.log(err);
    }
  });

  //remove data before each test
  afterAll(async () => {
    console.log("after each");
    try {
      await User.destroy({ where: {} });
      await User.bulkCreate(mockUsersSeeders);
      await Auth.destroy({ where: {} });
      await Auth.bulkCreate(mockAuthSeeders);
    } catch (err) {
      console.log(err);
    }
  });
  it("Should return data on unique user", async () => {
    const response = await request(app)
      .post("/api/v1/users/uniqueuser")
      .send(uniqueUser);

    const data = {
      success: true,
      data: {
        user_email: response.body.data.user_email,
        phone_number: response.body.data.phone_number,
        first_name: response.body.data.first_name,
        last_name: response.body.data.last_name,
        address: response.body.data.address,
        rating: response.body.data.rating,
        number_of_votes: response.body.data.number_of_votes,
        license: response.body.data.license,
      },
    };

    // // Is the status code 200
    expect(response.status).toBe(200);
    // // Is the response equals to mock response
    expect(data).toEqual(mockBodyResponseUniqueUser);
  });

  it("Should return all users that their rate above the given number", async () => {
    const response = await request(app)
      .post("/api/v1/users/rated")
      .send(minRateForUser);

    const arrToCheck = { success: true, data: [] };
    response.body.data.forEach((user) => {
      const temp = {
        user_email: user.user_email,
        phone_number: user.phone_number,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        rating: user.rating,
        number_of_votes: user.number_of_votes,
        license: user.license,
      };
      arrToCheck.data.push(temp);
    });

    // Is the status code 200
    expect(response.status).toBe(200);
    // Is the response equals to mock response
    expect(arrToCheck).toEqual(mockBodyResponseUsersByRating);
  });

  it("Should success to register new user to system", async () => {
    const response = await request(app)
      .post("/api/v1/users/register")
      .send(mockNewUserRegister);

    // Is the status code 200
    expect(response.status).toBe(200);
    // // Is the response equals to mock response
    expect(response.body).toEqual(mockBodyResponseUserRegister);
  });
});
