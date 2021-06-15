const models = require("./models");
const { User, Car, Rental, Auth } = require("./models");
const { Op, Sequelize, where } = require("sequelize");
const { sequelize } = require("./models");

// Get unique car
const getCar = async (id) => {
  try {
    const result = await Car.findOne({ where: { car_id: id } });

    return result;
  } catch (error) {
    throw error;
  }
};

// Get unique rental
const getRental = async (id) => {
  try {
    const result = await Rental.findOne({ where: { transaction_id: id } });

    return result;
  } catch (error) {
    throw error;
  }
};

// Get unique user / auth
const getUserOrAuth = async (model, email) => {
  try {
    const result = await model.findOne({ where: { user_email: email } });

    return result;
  } catch (error) {
    throw error;
  }
};

// Get all items from each table
const getAllItems = async (model) => {
  try {
    const data = await model.findAll();
    return data;
    // return JSON.stringify(data, null, 2);
  } catch (error) {
    throw error;
  }
};

//Add new car to users db
const addToCarsDB = async (obj) => {
  try {
    await Car.create({
      owner_email: obj.ownerEmail,
      brand: obj.brand,
      year: obj.year,
      model: obj.model,
      fuel: obj.fuel,
      price_per_day: obj.pricePerDay,
      price_per_week: obj.pricePerWeek,
      price_per_month: obj.pricePerMonth,
      is_rented: false,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

//Add new user to users db
const addToUsersDB = async (obj) => {
  try {
    const { phoneNumber, firstName, lastName, email, address } = obj;
    await User.create({
      phone_number: phoneNumber,
      user_email: email,
      first_name: firstName,
      last_name: lastName,
      address: address,
      rating: null,
      number_of_votes: 0,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

//Add new auth details of user
const addToAuthDB = async (obj) => {
  try {
    const { firstName, lastName, email, password } = obj;
    await Auth.create({
      user_email: email,
      password: password,
      full_name: firstName + " " + lastName,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = {
  getCar,
  getRental,
  getUserOrAuth,
  getAllItems,
  addToCarsDB,
  addToUsersDB,
  addToAuthDB,
};
