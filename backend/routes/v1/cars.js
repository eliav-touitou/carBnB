const { Router } = require("express");
const cars = Router();
const { Car } = require("../../../database/models");
const { validToken } = require("../../utils/authentication");
const {
  getAllItems,
  getCar,
  addToCarsDB,
} = require("../../../database/queries");

// Gets a unique car
cars.post("/uniquecar", async (req, res) => {
  const { id } = req.body;

  try {
    const car = await getCar(id);

    if (!car) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    return res.status(200).json({ success: true, data: car });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

// Get all cars
cars.get("/allcars", async (req, res) => {
  try {
    const cars = await getAllItems(Car);
    if (!cars) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    return res.status(200).json({ success: true, data: cars });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

// Upload new car
cars.post("/upload", validToken, async (req, res) => {
  try {
    const { newCar } = req.body;
    const savedCar = await addToCarsDB(newCar);
    savedCar.dataValues.car_id = savedCar.null;
    return res.status(200).json({ success: true, data: savedCar });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

module.exports = cars;
