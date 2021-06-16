const { Router } = require("express");
const cars = Router();
const { Car } = require("../../../database/models");
const { calculateDiscount } = require("../../helperFunctions");
const {
  getAllItems,
  getCar,
  addToCarsDB,
} = require("../../../database/queries");

// Gets a unique car
cars.post("/uniquecar", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const car = await getCar(id);
    console.log(car);
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
    console.log(cars);
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
cars.post("/upload", async (req, res) => {
  try {
    const { newCar } = req.body;
    let { pricePerWeek, pricePerMonth, pricePerDay } = newCar;

    newCar.pricePerWeek = calculateDiscount(pricePerDay, pricePerWeek, 7);
    newCar.pricePerMonth = calculateDiscount(pricePerDay, pricePerMonth, 30);

    await addToCarsDB(newCar);
    return res.status(200).json({ success: true, data: newCar });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

module.exports = cars;
