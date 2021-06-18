const { getMaxListeners } = require("process");

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
      passengers: 5,
      price_per_day: 30,
      price_per_week: 20,
      price_per_month: 10,
      is_rented: false,
      available_from: "2021-06-17T10:49:19.000Z",
      available_until: "2021-08-17T10:49:19.000Z",
      gear: "Manual",
      createdAt: "2021-06-17T10:49:19.000Z",
      updatedAt: "2021-06-17T10:49:19.000Z",
    },
    {
      car_id: 2,
      owner_email: "jino@gmail.com",
      brand: "Suzuki",
      year: 2014,
      model: "Alto",
      fuel: "95",
      passengers: 4,
      price_per_day: 25,
      price_per_week: 20,
      price_per_month: 15,
      is_rented: false,
      available_from: "2021-06-17T10:49:19.000Z",
      available_until: "2021-09-17T10:49:19.000Z",
      gear: "Auto",
      createdAt: "2021-06-17T10:49:19.000Z",
      updatedAt: "2021-06-17T10:49:19.000Z",
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
    passengers: 5,
    price_per_day: 30,
    price_per_week: 20,
    price_per_month: 10,
    is_rented: false,
    available_from: "2021-06-17T10:49:19.000Z",
    available_until: "2021-08-17T10:49:19.000Z",
    gear: "Manual",
    createdAt: "2021-06-17T10:49:19.000Z",
    updatedAt: "2021-06-17T10:49:19.000Z",
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

module.exports = {
  mockBodyResponseAllCars,
  uniqueCarId,
  mockBodyResponseUniqueCar,
  mockNewCarToUpload,
  mockBodyResponseForUpload,
};
