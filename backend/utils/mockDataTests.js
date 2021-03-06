// const { getMaxListeners } = require("process");

//---------------------------------------------------------------//
//------------------------- MESSAGES ---------------------------//

const notFoundMessage = { message: "NOT FOUND" };
const userOrPasswordIncorrect = {
  message: "Username or password is incorrect",
};
const invalidTokenMessage = { message: "Access denied invalid token" };

const notFoundCarInThisCity = { message: "THERE IS NO AVAILABLE CAR IN EILAT" };
const notFoundCarByParameters = {
  message: `THERE IS NO AVAILABLE CAR THAT MATCH TO CHOSEN OPTIONS`,
};

//---------------------------------------------------------------//
//------------------------- CARS ---------------------------//

const mockBodyResponseAllCars = {
  success: true,
  data: [
    {
      car_id: 1,
      owner_email: "eyal@gmail.com",
      brand: "PEUGEOT",
      year: 2009,
      model: "505",
      fuel: "OCTAN-95",
    },
    {
      car_id: 2,
      owner_email: "jino@gmail.com",
      brand: "SUZUKI",
      year: 2014,
      model: "VERONA",
      fuel: "OCTAN-95",
    },
  ],
};

const mockBodyResponseUniqueCar = {
  success: true,
  data: {
    car_id: 1,
    owner_email: "eyal@gmail.com",
    brand: "PEUGEOT",
    year: 2009,
    model: "505",
    fuel: "OCTAN-95",
  },
};

const uniqueCarId = { id: 1 };

const mockBodyResponseGetCarByCityName = {
  car_id: 2,
  owner_email: "jino@gmail.com",
  brand: "SUZUKI",
  model: "VERONA",
  year: 2014,
  fuel: "OCTAN-95",
  passengers: 4,
  price_per_day: 30,
  discount_for_week: "10%",
  discount_for_month: "15%",
};

//---------------------------------------------------------------//
//------------------------- RENTALS ---------------------------//

const mockBodyResponseAllRentals = {
  success: true,
  data: [
    {
      transaction_id: 1,
      car_id: 1,
      owner_email: "eliav@gmail.com",
      renter_email: "eyal@gmail.com",
      start_date: "1969-12-31T23:59:57.000Z",
      end_date: "1969-12-31T23:59:57.000Z",
      total_price: 70,
    },
    {
      transaction_id: 2,
      car_id: 2,
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
    car_id: 1,
    owner_email: "eliav@gmail.com",
    renter_email: "eyal@gmail.com",
    start_date: "1969-12-31T23:59:57.000Z",
    end_date: "1969-12-31T23:59:57.000Z",
    total_price: 70,
    is_active: "confirm",
  },
};

const uniqueRentalId = { id: 1 };

//---------------------------------------------------------------//
//------------------------- TOPS ---------------------------//

const mockBodyResponseTopCars = {
  success: true,
  data: [
    {
      car_id: 1,
      owner_email: "eyal@gmail.com",
      brand: "PEUGEOT",
      model: "505",
      year: 2009,
      fuel: "OCTAN-95",
      passengers: 5,
      price_per_day: 50,
      discount_for_week: "5%",
      discount_for_month: "10%",
      gear: "Manual",
    },
    {
      car_id: 2,
      owner_email: "jino@gmail.com",
      brand: "SUZUKI",
      model: "VERONA",
      year: 2014,
      fuel: "OCTAN-95",
      passengers: 4,
      price_per_day: 30,
      discount_for_week: "10%",
      discount_for_month: "15%",
      gear: "Auto",
    },
  ],
};

const mockBodyResponseTopOwners = {
  success: true,
  data: [
    {
      user_email: "gil@hotmail.com",
      phone_number: "0589623778",
      first_name: "gil",
      last_name: "naaman",
      address: "HAIFA",
      rating: 5,
      number_of_votes: 50,
    },
    {
      user_email: "rozjino@hotmail.com",
      phone_number: "0589623778",
      first_name: "rozi",
      last_name: "jinobigo",
      address: "HAIFA",
      rating: 5,
      number_of_votes: 10,
    },
    {
      user_email: "eliav@gmail.com",
      phone_number: "0545732117",
      first_name: "Eliav",
      last_name: "Touitou",
      address: "EFRATA",
      rating: 4,
      number_of_votes: 2,
    },
    {
      user_email: "oded.mar@hotmail.com",
      phone_number: "0589623778",
      first_name: "Oded",
      last_name: "Margalit",
      address: "HAIFA",
      rating: 4,
      number_of_votes: 10,
    },
    {
      user_email: "zimermaneyal@gmail.com",
      phone_number: "0589623778",
      first_name: "eyal",
      last_name: "zim",
      address: "TEL AVIV - YAFO",
      rating: 3,
      number_of_votes: 10,
    },
  ],
};
const mockBodyResponseTopLocations = {
  success: true,
  data: [
    { city: "MODI'IN-MAKKABBIM-RE", description: null },
    {
      city: "HAIFA",
      description:
        "Haifa  is the third-largest city in Israel???after Jerusalem and Tel Aviv???with a population of 285,316 in 2019. The city of Haifa forms part of the Haifa metropolitan area, the third-most populous metropolitan area in Israel. It is home to the Bah?????? Faith's Bah?????? World Centre, and is a UNESCO World Heritage Site and a destination for Bah?????? pilgrimage.",
    },
  ],
};

//---------------------------------------------------------------//
//------------------------- USERS ---------------------------//

const uniqueUser = { email: "eliav@gmail.com" };

const mockBodyResponseUniqueUser = {
  success: true,
  data: {
    user_email: "eliav@gmail.com",
    phone_number: "0545732117",
    first_name: "Eliav",
    last_name: "Touitou",
    address: "EFRATA",
    rating: 4,
    number_of_votes: 2,
    license: "fake licence",
  },
};

const minRateForUser = { minRate: 4 };

const mockBodyResponseUsersByRating = {
  success: true,
  data: [
    {
      user_email: "eliav@gmail.com",
      phone_number: "0545732117",
      first_name: "Eliav",
      last_name: "Touitou",
      address: "EFRATA",
      rating: 4,
      number_of_votes: 2,
      license: "fake licence",
    },
    {
      user_email: "gil@hotmail.com",
      phone_number: "0589623778",
      first_name: "gil",
      last_name: "naaman",
      address: "HAIFA",
      rating: 5,
      number_of_votes: 50,
      license: null,
    },
    {
      user_email: "oded.mar@hotmail.com",
      phone_number: "0589623778",
      first_name: "Oded",
      last_name: "Margalit",
      address: "HAIFA",
      rating: 4,
      number_of_votes: 10,
      license: null,
    },
    {
      user_email: "rozjino@hotmail.com",
      phone_number: "0589623778",
      first_name: "rozi",
      last_name: "jinobigo",
      address: "HAIFA",
      rating: 5,
      number_of_votes: 10,
      license: null,
    },
  ],
};

const mockNewUserRegister = {
  newUser: {
    firstName: "testi",
    lastName: "test",
    address: "tester",
    phoneNumber: "00000000000",
    email: "test@test.com",
    password: "testi-test",
  },
};

const mockBodyResponseUserRegister = {
  success: true,
  data: {
    firstName: "testi",
    lastName: "test",
    address: "tester",
    phoneNumber: "00000000000",
    email: "test@test.com",
  },
};

const mockUserLogin = {
  user: { email: "test@test.com", password: "testi-test" },
};

const mockBodyResponseUserLogin = {
  message: "Login Successfully!",
  data: {
    user_email: "test@test.com",
    phone_number: "00000000000",
    first_name: "testi",
    last_name: "test",
    address: "tester",
    rating: 0,
    number_of_votes: 0,
    license: null,
  },
};

const mockResponseExistUser = { success: false, message: "User already exist" };

const mockNotExistUserLogin = {
  user: { email: "testerChoice@test.com", password: "testi-test" },
};

//---------------------------------------------------------------//
//------------------------- PHOTOS ---------------------------//

const mockNewPhotoToUpload = [{ file: "new photo to upload", car_id: 3 }];

const mockResponseSavePhoto = { success: true };

//---------------------------------------------------------------//
//------------------------- Auth ---------------------------//

const mockUserToChangePassword = { userEmail: "eliav@gmail.com" };

const mockResponseUserToChangePassword = {
  message: "Check your mail box, reset link successfully send",
};

const mockResponseAfterPasswordChanged = {
  message: "Your new password successfully updated",
};

const mockResponseUserNotExist = { message: "This email does not exist" };
const mockResponseResetCodeIncorrect = { message: "Incorrect Reset Code" };

//---------------------------------------------------------------//
//------------------------- Search ---------------------------//

const mockDataToGetDetails = {
  data: ["Car", ["owner_email"], ["jino@gmail.com"]],
};
const mockResponseDetailsOfItem = {
  message: "Success",
  data: [
    {
      car_id: 2,
      owner_email: "jino@gmail.com",
      brand: "SUZUKI",
      model: "VERONA",
      year: 2014,
      fuel: "OCTAN-95",
      passengers: 4,
      price_per_day: 30,
      discount_for_week: "10%",
      discount_for_month: "15%",
      is_rented: false,
      gear: "Auto",
    },
  ],
};

const mockInitialSearch = {
  data: {
    city: "MODI'IN-MAKKABBIM-RE",
    startDate: "2021-07-21T09:00:00.000Z",
    endDate: "2021-07-23T09:00:00.000Z",
    passengers: 4,
  },
};

const mockResponseForInitialSearch = {
  message: "successful",
  data: [
    {
      car_id: 1,
      owner_email: "eyal@gmail.com",
      brand: "PEUGEOT",
      model: "505",
      year: 2009,
      fuel: "OCTAN-95",
      passengers: 5,
      price_per_day: 50,
      discount_for_week: "5%",
      discount_for_month: "10%",
      is_rented: false,
      gear: "Manual",
      owner_rating: 1,
      number_of_votes: 1,
    },
  ],
};

const mockNotExistDataToGetDetails = {
  data: ["Car", ["owner_email"], ["aaaaaa@aaaa.com"]],
};

const mockNoCityInitialSearch = {
  data: {
    city: "EILAT",
    startDate: "2021-07-21T09:00:00.000Z",
    endDate: "2021-07-23T09:00:00.000Z",
    passengers: 4,
  },
};
const mockNoAvailableCarsByParameters = {
  data: {
    city: "MODI'IN-MAKKABBIM-RE",
    startDate: "2021-07-21T09:00:00.000Z",
    endDate: "2021-07-23T09:00:00.000Z",
    passengers: 6,
  },
};

module.exports = {
  notFoundMessage,
  mockBodyResponseAllCars,
  uniqueCarId,
  mockBodyResponseUniqueCar,
  mockBodyResponseAllRentals,
  uniqueRentalId,
  mockBodyResponseUniqueRental,
  mockBodyResponseGetCarByCityName,
  mockBodyResponseTopCars,
  mockBodyResponseTopOwners,
  mockBodyResponseTopLocations,
  uniqueUser,
  mockBodyResponseUniqueUser,
  minRateForUser,
  mockBodyResponseUsersByRating,
  mockNewUserRegister,
  mockBodyResponseUserRegister,
  mockUserLogin,
  mockBodyResponseUserLogin,
  mockResponseExistUser,
  mockNotExistUserLogin,
  userOrPasswordIncorrect,
  mockNewPhotoToUpload,
  mockResponseSavePhoto,
  mockUserToChangePassword,
  mockResponseUserToChangePassword,
  mockResponseAfterPasswordChanged,
  mockResponseUserNotExist,
  mockResponseResetCodeIncorrect,
  invalidTokenMessage,
  mockDataToGetDetails,
  mockResponseDetailsOfItem,
  mockInitialSearch,
  mockResponseForInitialSearch,
  mockNotExistDataToGetDetails,
  mockNoCityInitialSearch,
  notFoundCarInThisCity,
  mockNoAvailableCarsByParameters,
  notFoundCarByParameters,
};
