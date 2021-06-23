require("dotenv").config();
const { Router } = require("express");
const rentals = Router();
const {
  getAllItems,
  getRental,
  addNewRentalToDB,
  whatCarsAreTaken,
  addNewNotification,
  updateItemToDB,
} = require("../../../database/queries");
const { Rental } = require("../../../database/models");
const { buildPatterns, sendMail } = require("../../utils/helperFunctions");

// Gets a unique rental
rentals.post("/uniquerental", async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  try {
    const rental = await getRental(id);
    console.log(rental);
    if (!rental) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    return res.status(200).json({ success: true, data: rental });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

// Get all rentals
rentals.get("/allrentals", async (req, res) => {
  try {
    const rentals = await getAllItems(Rental);

    if (rentals.length === 0) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    return res.status(200).json({ success: true, data: rentals });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

// Add new rental to rentals DB
rentals.post("/new", async (req, res) => {
  const { data } = req.body;

  try {
    // Checks if car already ordered in this dates => if true ⬇
    const takenCars = await whatCarsAreTaken({
      carsId: [data.carId],
      dates: { start: new Date(data.startDate), end: new Date(data.endDate) },
    });

    // Return message that the car already ordered
    if (takenCars.length !== 0) {
      return res
        .status(400)
        .json({ message: "Oops... the car is already taken 😥" });
    }

    // Save rental detail to DB
    const result = await addNewRentalToDB(data);

    // Build pattern texts for emails
    const { textPatternToRenter, textPatternToOwner } = buildPatterns({
      transactionId: String(result.transaction_id),
      startDate: data.startDate,
      endDate: data.endDate,
    });

    sendMail({
      from: process.env.ADMIN_MAIL,
      to: data.renterEmail,
      subject: "Order summery",
      text: textPatternToRenter,
    });

    sendMail({
      from: process.env.ADMIN_MAIL,
      to: data.ownerEmail,
      subject: "New Order",
      text: textPatternToOwner,
    });

    await addNewNotification({
      messageFrom: data.renterEmail,
      messageTo: data.ownerEmail,
      title: "New Order incoming",
      content: textPatternToOwner,
      transactionId: result.transaction_id,
    });

    res.status(201).json({ message: "Successes", data: result });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

rentals.patch("/status", async (req, res) => {
  const { transactionId, status } = req.body.data;
  try {
    await updateItemToDB({
      table: Rental,
      column: ["is_active"],
      primaryKey: "transaction_id",
      primaryKeyValue: transactionId,
      content: [status],
    });

    res.status(200).json({ message: "Successes" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

module.exports = rentals;
