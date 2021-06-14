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

const addCarToDB = async (obj) => {
  const ownerName = obj.ownerName;
  const ownerId = await User.findOne({
    attributes: ["user_id"],
    where: { name: ownerName },
  });
  await Car.create({
    car_id: obj.carId,
    owner_id: ownerId,
    brand: obj.brand,
    year: obj.year,
    model: obj.model,
    fuel: obj.fuel,
    price_per_day: obj.pricePerDay,
    price_per_week: obj.pricePerWeek,
    price_per_month: obj.pricePerMonth,
    is_rented: false,
  });
};

// //test 1
// getItem("users", "user_id", 2).then((x) => {
//   console.log(x);
// });

// //test 2
// getAllItems(Car).then((x) => {
//   console.log(x);
// });

module.exports = { getItem, getAllItems, addCarToDB };
