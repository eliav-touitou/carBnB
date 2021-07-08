const {
  User,
  Car,
  Rental,
  Auth,
  Favorite,
  Notification,
  Photo,
} = require("./models");
const { Op, Sequelize, where, col } = require("sequelize");
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

// Get unique car photo
const getPhoto = async (id) => {
  try {
    const result = await Photo.findOne({ where: { car_id: id } });

    return result;
  } catch (error) {
    throw error;
  }
};

// Get unique user / auth
const getUserOrAuth = async (obj) => {
  const { model, email } = obj;
  try {
    const result = await model.findOne({ where: { user_email: email } });

    return result;
  } catch (error) {
    throw error;
  }
};
//
const top5Owners = async () => {
  try {
    const result = await User.findAll({
      order: [["rating", "DESC"]],
      limit: 5,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const top5Cars = async () => {
  try {
    const result = await Rental.findAll({
      attributes: [
        "car_id",
        [sequelize.fn("count", sequelize.col("car_id")), "total_orders"],
      ],
      group: ["car_id"],
      limit: 5,
    });
    let carArray = [];
    result.map((car) => carArray.push(car.toJSON()));
    carArray.sort((a, b) => b.total_orders - a.total_orders);
    let idArray = [];
    carArray.forEach((car) => idArray.push(car.car_id));

    console.log(idArray);
    const sortedCars = await getAllCarsByIdsArr(idArray);
    console.log(sortedCars);
    return sortedCars;
  } catch (error) {
    throw error;
  }
};

// Get item from DB by specific column-value
const getItemFromDB = async (obj) => {
  const { model, column, columnValue } = obj;
  const query = {};

  column.forEach(async (col, i) => {
    query[col] = columnValue[i];
  });

  try {
    const data = await model.findAll({ where: query });
    return data;
  } catch (err) {
    throw err;
  }
};

const top5Locations = async () => {
  try {
    const result = await User.findAll({
      attributes: ["address"],
      include: [
        {
          model: Car,
          required: true,
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("car_id")), "cars_number"],
          ],
        },
      ],
      group: ["address"],
    });
    // console.log(typeof result);
    console.log(result[0].Cars[0].dataValues.cars_number);
    result.sort(
      (a, b) =>
        b.Cars[0].dataValues.cars_number - a.Cars[0].dataValues.cars_number
    );
    let cities = [];

    for (let i = 0; i < 5; i++) {
      cities.push(result[i].address);
    }

    return cities;
  } catch (error) {
    throw error;
  }
};

// Get all items from each table
const getAllItems = async (model) => {
  try {
    const data = await model.findAll();
    return data;
  } catch (error) {
    throw error;
  }
};

//  Add new car to users db
const addToCarsDB = async (obj) => {
  try {
    const savedCar = await Car.create({
      owner_email: obj.ownerEmail,
      brand: obj.brand,
      year: obj.year,
      gear: obj.gear,
      model: obj.model,
      fuel: obj.fuel,
      passengers: obj.passengers,
      price_per_day: obj.pricePerDay,
      discount_for_week: obj.discountPerWeek,
      discount_for_month: obj.discountPerMonth,
      available_from: obj.from,
      available_until: obj.until,
      is_rented: false,
    });
    return savedCar;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

//  Add new user to users db
const addToUsersDB = async (obj) => {
  try {
    const { phoneNumber, firstName, lastName, email, address } = obj;
    return await User.create({
      phone_number: phoneNumber,
      user_email: email,
      first_name: firstName,
      last_name: lastName,
      address: address,
      rating: 0,
      number_of_votes: 0,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

//  Add new auth details of user
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
// Add new Photos To the db
const addToPhotosDB = async (arr) => {
  try {
    await Photo.bulkCreate(arr, { returning: true });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const updateItemToDB = async (obj) => {
  try {
    const { table, column, primaryKey, primaryKeyValue, content } = obj;
    const query = {};

    column.forEach(async (col, i) => {
      query[col] = content[i];
    });

    await table.update(query, {
      where: { [primaryKey]: primaryKeyValue },
    });
  } catch (error) {
    throw error;
  }
};

const getByCity = async (obj) => {
  const { address } = obj;
  try {
    return await User.findAll({
      where: { address: { [Op.like]: `%${address}%` } },
    });
  } catch (error) {
    throw error;
  }
};

const GetCarsByParameters = async (obj) => {
  const arrOfEmails = obj.emails;
  const numOfPassengers = obj.passengers;
  const startDate = obj.dates.start;
  const endDate = obj.dates.end;
  try {
    const result = await Car.findAll({
      where: {
        [Op.and]: {
          [Op.or]: [
            {
              available_from: {
                [Op.lte]: startDate,
              },

              available_until: {
                [Op.gte]: endDate,
              },
            },
            {
              available_from: { [Op.is]: null },
            },
          ],

          passengers: { [Op.gte]: numOfPassengers },
          owner_email: { [Op.in]: arrOfEmails },
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const whatCarsAreTaken = async (obj) => {
  const arrOfCarsId = obj.carsId;
  const startDate = obj.dates.start;
  const endDate = obj.dates.end;
  try {
    const takenCars = await Rental.findAll({
      where: {
        [Op.and]: {
          start_date: {
            [Op.lte]: startDate,
          },
          end_date: {
            [Op.gte]: startDate,
          },
          [Op.or]: {
            start_date: {
              [Op.lte]: endDate,
            },
            end_date: {
              [Op.gte]: endDate,
            },
          },
          car_id: { [Op.in]: arrOfCarsId },
          [Op.or]: [{ is_active: "pending" }, { is_active: "confirm" }],
        },
      },
    });
    return takenCars;
  } catch (error) {
    throw error;
  }
};

const getUserByRating = async (minRate) => {
  try {
    const ratedUser = await User.findAll({
      where: {
        rating: {
          [Op.gte]: minRate,
        },
      },
    });
    return ratedUser;
  } catch (error) {
    throw error;
  }
};

const addToFavoriteDB = async ({ userEmail, carId }) => {
  try {
    return await Favorite.create({
      user_email: userEmail,
      car_id: carId,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const removeFromFavoriteDB = async ({ userEmail, carId }) => {
  try {
    return await Favorite.destroy({
      where: {
        [Op.and]: { user_email: userEmail, car_id: carId },
      },
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const addNewRentalToDB = async (obj) => {
  const objToSave = {
    car_id: obj.carId,
    owner_email: obj.ownerEmail,
    renter_email: obj.renterEmail,
    start_date: obj.startDate,
    end_date: obj.endDate,
    total_price: obj.totalPrice,
    is_active: "pending",
  };
  try {
    const rental = await Rental.create(objToSave);
    rental.dataValues.transaction_id = rental.null;
    return rental;
  } catch (error) {
    throw error;
  }
};

const addNewNotification = async (obj) => {
  const objToSave = {
    message_from: obj.from,
    message_to: obj.to,
    title: obj.subject,
    content: obj.text,
    transaction_id: obj.transactionId,
    read: false,
  };
  try {
    await Notification.create(objToSave);
  } catch (error) {
    throw error;
  }
};

//delete any wanted items from any wanted table by any wanted row
const deleteItems = async (model, row, items) => {
  model.destroy({ where: { [row]: items } }).then((del) => console.log(del));
};
// const saveItems = async (model, row, items) => {
//   model.destroy({ where: { [row]: items } }).then((del) => console.log(del));
// };

const getAllCarsByIdsArr = async (arr) => {
  try {
    const carsOfMyOrders = await Car.findAll({
      where: { car_id: { [Op.in]: arr } },
    });
    return carsOfMyOrders;
  } catch (error) {
    throw error;
  }
};

const getAllOptionalFinishOrders = async () => {
  try {
    const result = await Rental.findAll({ where: { is_active: "confirm" } });

    return result;
  } catch (error) {
    throw error;
  }
};

const getCarsByCity = async (city) => {
  const users = await getByCity({ address: city });
  const promises = [];
  users.forEach((user) => {
    promises.push(
      getItemFromDB({
        model: Car,
        column: ["owner_email"],
        columnValue: [user.user_email],
      })
    );
  });
  const tempArr = await Promise.all(promises);
  const allCarsByCity = [].concat.apply([], tempArr);
  return allCarsByCity;
};

getCarsByCity("Haifa");

module.exports = {
  getCar,
  getRental,
  deleteItems,
  getUserOrAuth,
  getAllItems,
  addToCarsDB,
  addToUsersDB,
  addToAuthDB,
  addToPhotosDB,
  updateItemToDB,
  getByCity,
  GetCarsByParameters,
  whatCarsAreTaken,
  getItemFromDB,
  getUserByRating,
  addToFavoriteDB,
  removeFromFavoriteDB,
  addNewRentalToDB,
  addNewNotification,
  getAllCarsByIdsArr,
  getPhoto,
  getAllOptionalFinishOrders,
  top5Cars,
  top5Owners,
  top5Locations,
  getCarsByCity,
};
