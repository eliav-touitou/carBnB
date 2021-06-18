mockCarsSeeders = [
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
];

const mockRentalsSeeders = [
  {
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
  {
    transaction_id: 2,
    car_id: 5,
    owner_email: "oded.mar@hotmail.com",
    renter_email: "lea.shosh@walla.co.il",
    start_date: "1969-12-31T23:59:57.000Z",
    end_date: "1969-12-31T23:59:58.000Z",
    total_price: 110,
    createdAt: "2021-06-17T10:49:19.000Z",
    updatedAt: "2021-06-17T10:49:19.000Z",
  },
];

const mockUsersSeeders = [
  {
    user_email: "eyal@gmail.com",
    phone_number: "0545732556",
    first_name: "Eyal",
    last_name: "Zimerman",
    address: "Modiin, fuckyou, 23",
    rating: 1,
    number_of_votes: 1,
    license: null,
    createdAt: "2021-06-17T10:49:19.000Z",
    updatedAt: "2021-06-17T10:49:19.000Z",
  },
  {
    user_email: "jino@gmail.com",
    phone_number: "0545732998",
    first_name: "Jino",
    last_name: "Roz",
    address: "Pisgat -zeev, fuckall, 8",
    rating: 1,
    number_of_votes: 1,
    license: null,
    createdAt: "2021-06-17T10:49:19.000Z",
    updatedAt: "2021-06-17T10:49:19.000Z",
  },
];

module.exports = { mockCarsSeeders, mockRentalsSeeders };
