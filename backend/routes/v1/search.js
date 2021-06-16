const { Router } = require("express");
const search = Router();
const {
  getItemFromDB,
  whatCarsAreTaken,
  getByCity,
  getExistCars,
} = require("../../../database/queries");
const { User, Auth, Car, Rental } = require("../../../database/models");
const models = require("../../../database/models");

search.post("/getitem", async (req, res) => {
  const { data } = req.body;
  //   console.log(data);
  const model = models[`${data[0]}`];

  const objToSearchBy = { model: model, column: data[1], columnValue: data[2] };
  try {
    const itemFound = await getItemFromDB(objToSearchBy);
    console.log(itemFound);
    if (itemFound.length === 0) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    return res.status(200).json({ message: "Success", data: itemFound });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

search.post("/initial", async (req, res) => {
  const { data } = req.body;
  const emails = [];
  try {
    const users = await getByCity(data.city);
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: `THERE IS NO AVAILABLE CAR IN ${data.city}` });
    }

    users.forEach((user) => emails.push(user.email));
    const objToSearchBy = {
      emails: emails,
      passengers: data.passengers,
      dates: { start: new Date(data.startDate), end: new Date(data.endDate) },
    };

    const existCars = await getExistCars(objToSearchBy);
    if (existCars.length === 0) {
      return res.status(404).json({
        message: `THERE IS NO AVAILABLE CAR THAT MATCH TO CHOSEN OPTIONS`,
      });
    }

    const carsId = [];
    existCars.forEach((car) => carsId.push(car.car_id));
    const takenCars = await whatCarsAreTaken({
      carsId: carsId,
      dates: { start: new Date(data.startDate), end: new Date(data.endDate) },
    });

    const carsAvailable = [];
    const takenCarsId = [];
    takenCars.forEach((car) => takenCarsId.push(car.car_id));
    existCars.forEach((car) => {
      if (!takenCarsId.includes(car.car_id)) carsAvailable.push(car);
    });

    if (takenCars.length === ex) {
      return res
        .status(404)
        .json({ message: `THERE IS NO AVAILABLE CAR IN THOSE DATES` });
    }

    return res.status(200).json({ message: "successful", data: carsAvailable });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});
module.exports = search;
