const date = new Date();
mockCarsSeeders = [
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

const mockRentalsSeeders = [
  {
    transaction_id: 1,
    car_id: 3,
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
    car_id: 5,
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
