const { Router } = require("express");
const cars = Router();
const { getAllItems, getItem, addCarToDB } = require("../../../database");
const { Car } = require("../../../database/models");

// Gets a unique car
cars.post("/uniquecar", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const car = await getItem("cars", "car_id", id);
    console.log(car);
    res.status(200).json({ success: true, data: car });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: "NOT FOUND", error: err.message });
  }
});

// Get all cars
cars.get("/allcars", async (req, res) => {
  try {
    const cars = await getAllItems(Car);
    console.log(cars);
    res.status(200).json({ success: true, data: cars });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: "NOT FOUND", error: err.message });
  }
});

cars.post("/upload", async (req, res) => {
  try {
    const { newCar } = req.body;
    await addCarToDB(newCar);
    res.status(200).json({ success: true, data: newCar });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "NOT FOUND", error: err.message });
  }
});

module.exports = cars;
