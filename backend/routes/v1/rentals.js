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
  getItemFromDB,
  getAllCarsByIdsArr,
} = require("../../../database/queries");
const { Rental, Car } = require("../../../database/models");
const {
  buildPatterns,
  sendMail,
  createPDFToSend,
  buildInvoice,
} = require("../../utils/helperFunctions");
const path = process.env.PDF_PATH;
// Gets a unique rental
rentals.post("/uniquerental", async (req, res) => {
  const { id } = req.body;

  try {
    const rental = await getRental(id);

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
  const { rentalDetails, userDetails } = req.body.data;
  try {
    // Checks if car already ordered in this dates => if true ⬇
    const takenCars = await whatCarsAreTaken({
      carsId: [rentalDetails.carId],
      dates: {
        start: new Date(rentalDetails.startDate),
        end: new Date(rentalDetails.endDate),
      },
    });

    // Return message that the car already ordered
    if (takenCars.length !== 0) {
      return res
        .status(400)
        .json({ message: "Oops... the car is already taken 😥" });
    }

    // Save rental detail to DB
    const result = await addNewRentalToDB(rentalDetails);

    // Get details of ordered car
    let orderedCar = await getItemFromDB({
      model: Car,
      column: ["car_id"],
      columnValue: [result.car_id],
    });
    orderedCar = orderedCar[0].toJSON();

    // Create invoice and send pdf to user
    const invoice = await buildInvoice(userDetails, result, orderedCar);

    await createPDFToSend(invoice, path);

    // Build pattern texts for emails
    const { textPatternToRenter, textPatternToOwner } = buildPatterns({
      transactionId: String(result.transaction_id),
      startDate: rentalDetails.startDate,
      endDate: rentalDetails.endDate,
    });

    sendMail({
      from: process.env.ADMIN_MAIL,
      to: rentalDetails.renterEmail,
      subject: "Order summery",
      text: textPatternToRenter,
    });

    sendMail({
      from: process.env.ADMIN_MAIL,
      to: rentalDetails.ownerEmail,
      subject: "New Order",
      text: textPatternToOwner,
    });

    await addNewNotification({
      from: rentalDetails.renterEmail,
      to: rentalDetails.ownerEmail,
      title: "New Order incoming",
      content: textPatternToOwner,
      transactionId: result.transaction_id,
    });

    return res.status(201).json({ message: "Successes", data: result });
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

    return res.status(200).json({ message: "Successes" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

rentals.post("/myorders", async (req, res) => {
  const { data } = req.body;
  try {
    // Get all my orders
    const myOrders = await getItemFromDB({
      model: Rental,
      column: [data[1]],
      columnValue: [data[0]],
    });

    // Get ids of my ordered cars
    const carsIds = [];
    myOrders.forEach((order) => {
      if (!carsIds.includes(order.car_id)) {
        carsIds.push(order.car_id);
      }
    });

    // Get all my orders cars
    const carsOfMyOrders = await getAllCarsByIdsArr(carsIds);

    const arrOfOrdersToClient = [];
    myOrders.forEach((order) => {
      carsOfMyOrders.forEach((car) => {
        if (order.car_id === car.car_id) {
          const orderObj = {
            transactionId: order.transaction_id,
            totalPrice: order.total_price,
            ownerEmail: order.owner_email,
            startDate: order.start_date,
            endDate: order.end_date,
            isActive: order.is_active,
            brand: car.brand,
            model: car.model,
            year: car.year,
            gear: car.gear,
            passengers: car.passengers,
            fuel: car.fuel,
          };
          arrOfOrdersToClient.push(orderObj);
        }
      });
    });
    return res
      .status(200)
      .json({ message: "Successes", data: arrOfOrdersToClient });
  } catch (error) {
    console.log(error);
  }
});

module.exports = rentals;
