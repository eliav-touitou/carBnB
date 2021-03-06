const date = new Date();

//---------------------------------------------------------------//
//------------------------- CARS SEEDERS ---------------------------//
const mockCarsSeeders = [
  {
    car_id: 1,
    owner_email: "eyal@gmail.com",
    brand: "PEUGEOT",
    year: 2009,
    model: "505",
    fuel: "OCTAN-95",
    price_per_day: 50,
    discount_for_week: "5%",
    discount_for_month: "10%",
    is_rented: false,
    passengers: 5,
    available_from: new Date(),
    available_until: new Date(date.setMonth(date.getMonth() + 2)),
    gear: "Manual",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    car_id: 2,
    owner_email: "jino@gmail.com",
    brand: "SUZUKI",
    year: 2014,
    fuel: "OCTAN-95",
    model: "VERONA",
    price_per_day: 30,
    discount_for_week: "10%",
    discount_for_month: "15%",
    is_rented: false,
    passengers: 4,
    available_from: new Date(),
    available_until: new Date(date.setMonth(date.getMonth() + 1)),
    gear: "Auto",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

//---------------------------------------------------------------//
//------------------------- RENTALS SEEDERS ---------------------------//
const mockRentalsSeeders = [
  {
    transaction_id: 1,
    car_id: 1,
    owner_email: "eliav@gmail.com",
    renter_email: "eyal@gmail.com",
    start_date: "1969-12-31T23:59:57.000Z",
    end_date: "1969-12-31T23:59:57.000Z",
    total_price: 70,
    is_active: "confirm",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    transaction_id: 2,
    car_id: 2,
    owner_email: "oded.mar@hotmail.com",
    renter_email: "lea.shosh@walla.co.il",
    start_date: "1969-12-31T23:59:57.000Z",
    end_date: "1969-12-31T23:59:58.000Z",
    total_price: 110,
    is_active: "reject",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

//---------------------------------------------------------------//
//------------------------- USERS SEEDERS ---------------------------//
const mockUsersSeeders = [
  {
    user_email: "eliav@gmail.com",
    phone_number: "0545732117",
    first_name: "Eliav",
    last_name: "Touitou",
    address: "EFRATA",
    rating: 4,
    number_of_votes: 2,
    license: "fake licence",
    createdAt: "2021-07-05T06:17:26.000Z",
    updatedAt: "2021-07-05T06:17:26.000Z",
  },
  {
    user_email: "eyal@gmail.com",
    phone_number: "0545732556",
    first_name: "Eyal",
    last_name: "Zimerman",
    address: "MODI'IN-MAKKABBIM-RE",
    rating: 1,
    number_of_votes: 1,
    license: null,
    createdAt: "2021-07-05T06:17:26.000Z",
    updatedAt: "2021-07-05T06:17:26.000Z",
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
    createdAt: "2021-07-05T06:17:26.000Z",
    updatedAt: "2021-07-05T06:17:26.000Z",
  },
  {
    user_email: "jino@gmail.com",
    phone_number: "0545732998",
    first_name: "Jino",
    last_name: "Roz",
    address: "HAIFA",
    rating: 1,
    number_of_votes: 1,
    license: null,
    createdAt: "2021-07-05T06:17:26.000Z",
    updatedAt: "2021-07-05T06:17:26.000Z",
  },
  {
    user_email: "lea.shosh@walla.co.il",
    phone_number: "0545985416",
    first_name: "Lea",
    last_name: "Shoshnik",
    address: "KEFAR HARO'E",
    rating: 2,
    number_of_votes: 4,
    license: null,
    createdAt: "2021-07-05T06:17:26.000Z",
    updatedAt: "2021-07-05T06:17:26.000Z",
  },
  {
    user_email: "mosemose@hotmail.com",
    phone_number: "0589623778",
    first_name: "mose",
    last_name: "mose",
    address: "HERZELIYYA",
    rating: 1,
    number_of_votes: 10,
    license: null,
    createdAt: "2021-07-05T06:17:26.000Z",
    updatedAt: "2021-07-05T06:17:26.000Z",
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
    createdAt: "2021-07-05T06:17:26.000Z",
    updatedAt: "2021-07-05T06:17:26.000Z",
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
    createdAt: "2021-07-05T06:17:26.000Z",
    updatedAt: "2021-07-05T06:17:26.000Z",
  },
  {
    user_email: "yone@gmail.com",
    phone_number: "0589623778",
    first_name: "jino",
    last_name: "rozma",
    address: "JERUSALEM",
    rating: 2,
    number_of_votes: 10,
    license: null,
    createdAt: "2021-07-05T06:17:26.000Z",
    updatedAt: "2021-07-05T06:17:26.000Z",
  },
  {
    user_email: "zimerman1998@gmail.com",
    phone_number: null,
    first_name: "eyal",
    last_name: "zimerman",
    address: "HAIFA",
    rating: 0.499999,
    number_of_votes: 10,
    license: null,
    createdAt: "2021-07-05T06:24:18.000Z",
    updatedAt: "2021-07-08T18:15:19.000Z",
  },
  {
    user_email: "zimermaneyal@gmail.com",
    phone_number: "0589623778",
    first_name: "eyal",
    last_name: "zim",
    address: "TEL AVIV - YAFO",
    rating: 3,
    number_of_votes: 10,
    license: null,
    createdAt: "2021-07-05T06:17:26.000Z",
    updatedAt: "2021-07-09T11:30:16.000Z",
  },
];

//---------------------------------------------------------------//
//------------------------- AUTH SEEDERS ---------------------------//
const mockAuthSeeders = [
  {
    id: 1,
    user_email: "eyal@gmail.com",
    password: "12345",
    full_name: "	Eyal",
    reset_code: null,
    createdAt: "2021-07-05 06:17:26",
    updatedAt: "2021-07-05 06:17:26",
  },
  {
    id: 2,
    user_email: "jino@gmail.com",
    password: "12345",
    full_name: "Jino",
    reset_code: null,
    createdAt: "2021-07-05 06:17:26",
    updatedAt: "2021-07-05 06:17:26",
  },
  {
    id: 3,
    user_email: "eliav@gmail.com",
    password: "42345",
    full_name: "Eliav",
    reset_code: null,
    createdAt: "2021-07-05 06:17:26",
    updatedAt: "2021-07-05 06:17:26",
  },
  {
    id: 4,
    user_email: "lea.shosh@walla.co.il",
    password: "22345",
    full_name: "	Lea Shoshnik",
    reset_code: null,
    createdAt: "2021-07-05 06:17:26",
    updatedAt: "2021-07-05 06:17:26",
  },
  {
    id: 5,
    user_email: "oded.mar@hotmail.com",
    password: "42345",
    full_name: "Oded Margalit",
    reset_code: null,
    createdAt: "2021-07-05 06:17:26",
    updatedAt: "2021-07-05 06:17:26",
  },
  {
    id: 6,
    user_email: "yone@gmail.com",
    password: "1232131231345",
    full_name: "jino rozma",
    reset_code: null,
    createdAt: "2021-07-05 06:17:26",
    updatedAt: "2021-07-05 06:17:26",
  },
  {
    id: 7,
    user_email: "zimermaneyal@gmail.com",
    password: "4243534636345",
    full_name: "eyal zim",
    reset_code: null,
    createdAt: "2021-07-05 06:17:26",
    updatedAt: "2021-07-05 06:17:26",
  },
  {
    id: 8,
    user_email: "rozjino@hotmail.com",
    password: "423rewr45",
    full_name: "rozi jinobigo",
    reset_code: null,
    createdAt: "2021-07-05 06:17:26",
    updatedAt: "2021-07-05 06:17:26",
  },
  {
    id: 9,
    user_email: "mosemose@hotmail.com",
    password: "	423887784hh45",
    full_name: "mose mose",
    reset_code: null,
    createdAt: "2021-07-05 06:17:26",
    updatedAt: "2021-07-05 06:17:26",
  },
  {
    id: 10,
    user_email: "gil@hotmail.com",
    password: "liav",
    full_name: "gil naaman",
    reset_code: null,
    createdAt: "2021-07-05 06:17:26",
    updatedAt: "2021-07-05 06:17:26",
  },
  {
    id: 11,
    user_email: "zimerman1998@gmail.com",
    password: "$2b$10$K2ExOdRdRPXEUIOasgnm3ep56yiF59taoGPFoJvBrWB8HFeDgVT0a",
    full_name: "eyal zimerman",
    reset_code: null,
    createdAt: "	2021-07-05 06:24:18",
    updatedAt: "2021-07-07 07:21:57",
  },
];

module.exports = {
  mockCarsSeeders,
  mockRentalsSeeders,
  mockUsersSeeders,
  mockAuthSeeders,
};
