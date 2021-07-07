const { Router } = require("express");
const favorite = Router();
const { Favorite } = require("../../../database/models");

const {
  addToFavoriteDB,
  removeFromFavoriteDB,
  getItemFromDB,
  getAllCarsByIdsArr,
  whatCarsAreTaken,
} = require("../../../database/queries");
const { writeLogs } = require("../../utils/helperFunctions");

favorite.post("/add", async (req, res) => {
  const { carId, userEmail } = req.body.data;

  try {
    const favorite = await addToFavoriteDB({ userEmail, carId });
    return res.status(201).json({ message: "Favorite saved!", data: favorite });
  } catch (err) {
    console.log(err);
    const objToWrite = {
      date: new Date(),
      error: err,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/favorite/add",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

favorite.post("/remove", async (req, res) => {
  const { userEmail, carId } = req.body.data;
  try {
    await removeFromFavoriteDB({ userEmail, carId });
    return res.status(200).json({ message: "Favorite removed!" });
  } catch (err) {
    console.log(err);
    const objToWrite = {
      date: new Date(),
      error: err,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/favorite/remove",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

favorite.post("/all", async (req, res) => {
  const { userEmail } = req.body;

  try {
    const allFavoriteById = await getItemFromDB({
      model: Favorite,
      column: ["user_email"],
      columnValue: [userEmail],
    });

    const carIdArr = [];
    allFavoriteById.forEach((car) => carIdArr.push(car.car_id));
    const allFavorite = await getAllCarsByIdsArr(carIdArr);
    return res.status(201).json({ message: "Successes", data: allFavorite });
  } catch (err) {
    console.log(err);
    const objToWrite = {
      date: new Date(),
      error: err,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/favorite/all",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

favorite.post("/checkavailability", async (req, res) => {
  const { carId, startDate, endDate } = req.body;
  try {
    // Checks if car already ordered in this dates => if true ⬇
    const takenCars = await whatCarsAreTaken({
      carsId: [carId],
      dates: {
        start: new Date(startDate),
        end: new Date(endDate),
      },
    });

    // Return message that the car already ordered
    if (takenCars.length !== 0) {
      return res.status(400).send(false);
    }
    res.status(200).send(true);
  } catch (err) {
    console.log(err);
    const objToWrite = {
      date: new Date(),
      error: err,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/favorite/checkavailability",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

module.exports = favorite;
