const { Router } = require("express");
const search = Router();
const {
  getItemFromDB,
  whatCarsAreTaken,
  getByCity,
  GetCarsByParameters,
} = require("../../database/queries");
const { User, Auth, Car, Rental, Photo } = require("../../database/models");
const models = require("../../database/models");
const { writeLogs } = require("../../utils/helperFunctions");

// Get any items from any table.
search.post("/getitem", async (req, res) => {
  const { data } = req.body;
  const model = models[`${data[0]}`];

  const objToSearchBy = { model: model, column: data[1], columnValue: data[2] };
  try {
    const itemFound = await getItemFromDB(objToSearchBy);
    if (itemFound.length === 0) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    return res.status(200).json({ message: "Success", data: itemFound });
  } catch (err) {
    const objToWrite = {
      date: new Date(),
      error: err,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/search/getitem",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

// Search car by basic parameters.
search.post("/initial", async (req, res) => {
  const { data } = req.body;
  const emails = [];
  try {
    // Get users by city
    const users = await getByCity({ address: data.city });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: `THERE IS NO AVAILABLE CAR IN ${data.city}` });
    }

    users.forEach((user) => emails.push(user.user_email));
    const objToSearchBy = {
      emails: emails,
      passengers: data.passengers,
      dates: { start: new Date(data.startDate), end: new Date(data.endDate) },
    };

    // Get existing cars by parameter (objToSearchBy).
    const carsByParameters = await GetCarsByParameters(objToSearchBy);

    if (carsByParameters.length === 0) {
      return res.status(404).json({
        message: `THERE IS NO AVAILABLE CAR THAT MATCH TO CHOSEN OPTIONS`,
      });
    }

    // Insert into 'carsId' Array id's of taken cars.
    // Check what cars are taken.
    const carsId = [];
    carsByParameters.forEach((car) => carsId.push(car.car_id));

    carsByParameters.forEach((car) => {
      users.forEach((user) => {
        if (car.owner_email === user.user_email) {
          car.dataValues.owner_rating = user.rating;
          car.dataValues.number_of_votes = user.number_of_votes;
          return;
        }
      });
    });

    const takenCars = await whatCarsAreTaken({
      carsId: carsId,
      dates: { start: new Date(data.startDate), end: new Date(data.endDate) },
    });

    // If there is no taken cars return 'carsByParameters'.
    if (takenCars.length === 0) {
      return res
        .status(200)
        .json({ message: "successful", data: carsByParameters });
    }

    // Generates new Array of available cars.
    const carsAvailable = [];
    const takenCarsId = [];
    takenCars.forEach((car) => takenCarsId.push(car.car_id));
    carsByParameters.forEach((car) => {
      if (!takenCarsId.includes(car.car_id)) carsAvailable.push(car);
    });

    // If there is no available cars return message.
    if (carsAvailable.length === 0) {
      return res
        .status(404)
        .json({ message: `THERE IS NO AVAILABLE CAR IN THOSE DATES` });
    }

    return res.status(200).json({ message: "successful", data: carsAvailable });
  } catch (err) {
    const objToWrite = {
      date: new Date(),
      error: err,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/search/initial",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});
module.exports = search;
