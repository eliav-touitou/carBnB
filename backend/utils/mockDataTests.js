// const { getMaxListeners } = require("process");

//---------------------------------------------------------------//
//------------------------- MESSAGES ---------------------------//

const notFoundMessage = { message: "NOT FOUND" };

//---------------------------------------------------------------//
//------------------------- CARS ---------------------------//

const mockBodyResponseAllCars = {
  success: true,
  data: [
    {
      car_id: 1,
      owner_email: "eyal@gmail.com",
      brand: "Reno",
      year: 2009,
      model: "Megan",
      fuel: "95",
    },
    {
      car_id: 2,
      owner_email: "jino@gmail.com",
      brand: "Suzuki",
      year: 2014,
      model: "Alto",
      fuel: "95",
    },
  ],
};

const mockBodyResponseUniqueCar = {
  success: true,
  data: {
    car_id: 1,
    owner_email: "eyal@gmail.com",
    brand: "Reno",
    year: 2009,
    model: "Megan",
    fuel: "95",
  },
};

const uniqueCarId = { id: 1 };

const mockNewCarToUpload = {
  newCar: {
    ownerEmail: "eyal@gmail.com",
    brand: "HONDA",
    model: "CIVIC",
    gear: "Auto",
    year: "2010",
    fuel: "Octan-95",
    passengers: 5,
    pricePerDay: 100,
    pricePerWeek: "5%",
    pricePerMonth: "10%",
  },
};
const mockBodyResponseForUpload = {
  success: true,
  data: {
    ownerEmail: "eyal@gmail.com",
    brand: "HONDA",
    model: "CIVIC",
    gear: "Auto",
    year: "2010",
    fuel: "Octan-95",
    passengers: 5,
    pricePerDay: 100,
    pricePerWeek: 665,
    pricePerMonth: 2700,
  },
};

//---------------------------------------------------------------//
//------------------------- RENTALS ---------------------------//

const mockBodyResponseAllRentals = {
  success: true,
  data: [
    {
      transaction_id: 1,
      car_id: 3,
      owner_email: "eliav@gmail.com",
      renter_email: "eyal@gmail.com",
      start_date: "1969-12-31T23:59:57.000Z",
      end_date: "1969-12-31T23:59:57.000Z",
      total_price: 70,
    },
    {
      transaction_id: 2,
      car_id: 5,
      owner_email: "oded.mar@hotmail.com",
      renter_email: "lea.shosh@walla.co.il",
      start_date: "1969-12-31T23:59:57.000Z",
      end_date: "1969-12-31T23:59:58.000Z",
      total_price: 110,
    },
  ],
};

const mockBodyResponseUniqueRental = {
  success: true,
  data: {
    transaction_id: 1,
    car_id: 3,
    owner_email: "eliav@gmail.com",
    renter_email: "eyal@gmail.com",
    start_date: "1969-12-31T23:59:57.000Z",
    end_date: "1969-12-31T23:59:57.000Z",
    total_price: 70,
    createdAt: "2021-06-17T10:49:19.000Z",
    updatedAt: "2021-06-17T10:49:19.000Z",
  },
};

const uniqueRentalId = { id: 1 };

//---------------------------------------------------------------//
//------------------------- USERS ---------------------------//

module.exports = {
  notFoundMessage,
  mockBodyResponseAllCars,
  uniqueCarId,
  mockBodyResponseUniqueCar,
  mockNewCarToUpload,
  mockBodyResponseForUpload,
  mockBodyResponseAllRentals,
  uniqueRentalId,
  mockBodyResponseUniqueRental,
};
