const models = require("./models");
const { User, Car, Rental } = require("./models");
const { Op, Sequelize, where } = require("sequelize");
const { sequelize } = require("./models");

const getItem = async (table, row, id) => {
  const query = `SELECT * FROM ${table} where ${row} = ${id}`;
  try {
    const result = await sequelize.query({
      query,
    });
    // return JSON.stringify(result, null, 2);
    return result;
  } catch (err) {
    throw err;
  }
};

const getAllItems = async (model) => {
  try {
    const data = await model.findAll();
    return data;
    // return JSON.stringify(data, null, 2);
  } catch (err) {
    throw err;
  }
};

//Add new car to users db
const addToCars = async (obj) => {
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
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

//Add new user to users db
const addToUsers = async (obj) => {
  try {
    const { phoneNumber, firstName, lastName, email, address } = obj;
    await User.create({
      user_email: email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address: address,
    });
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

//Add new auth details of user
const addToAuth = async (obj) => {
  try {
    const { firstName, lastName, email, password } = obj;
    await User.create({
      email: email,
      password: password,
      full_name: firstName + " " + lastName,
    });
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

module.exports = { getItem, getAllItems, addCarToDB, addToUsers };
