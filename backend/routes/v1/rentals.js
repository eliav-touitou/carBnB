require("dotenv").config();
const { Router } = require("express");
const rentals = Router();
const {
  getAllItems,
  getRental,
  addNewRentalToDB,
  whatCarsAreTaken,
  addNewNotification,
} = require("../../../database/queries");
const { Rental, User } = require("../../../database/models");
const { buildPatterns } = require("../../utils/helperFunctions");
const nodemailer = require("nodemailer");
const adminEmail = "rozjino@gmail.com";

transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rozjino@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

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

    /// ## Can build those obj with outer function ## ///
    const mailsOption = [
      (mailToRenterOptions = {
        from: adminEmail,
        to: data.renterEmail,
        subject: "Order summery",
        text: textPatternToRenter,
      }),
      (mailToOwnerOptions = {
        from: adminEmail,
        to: data.ownerEmail,
        subject: "New Order",
        text: textPatternToOwner,
      }),
    ];

    mailsOption.forEach((mail) => {
      transporter.sendMail(mail, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(info);
        }
      });
    });

    await addNewNotification({
      messageFrom: data.renterEmail,
      messageTo: data.ownerEmail,
      title: "New Order incoming",
      content: textPatternToOwner,
    });

    res.status(201).json({ message: "Successes", data: result });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});
module.exports = rentals;
