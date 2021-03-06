const date = new Date();
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "cars",
      [
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
        {
          car_id: 3,
          owner_email: "eliav@gmail.com",
          brand: "TOYOTA",
          year: 2018,
          fuel: "OCTAN-95",
          model: "COROLLA",
          price_per_day: 45,
          discount_for_week: "10%",
          discount_for_month: "20%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getMonth() + 3)),
          gear: "Manual",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 4,
          owner_email: "lea.shosh@walla.co.il",
          brand: "FORD",
          year: 2016,
          fuel: "OCTAN-95",
          model: "TAURUS",
          price_per_day: 45,
          discount_for_week: "5%",
          discount_for_month: "20%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getMonth() + 4)),
          gear: "Manual",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 5,
          owner_email: "oded.mar@hotmail.com",
          brand: "SKODA",
          year: 1989,
          fuel: "SOLER",
          model: "SUPERB",
          price_per_day: 20,
          discount_for_week: "5%",
          discount_for_month: "20%",
          is_rented: true,
          passengers: 9,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getDay() + 50)),
          gear: "Manual",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 6,
          owner_email: "yone@gmail.com",
          brand: "MAZDA",
          year: 2002,
          fuel: "SOLER",
          model: "MAZDA3",
          price_per_day: 30,
          discount_for_week: "10%",
          discount_for_month: "25%",
          is_rented: true,
          passengers: 9,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getMonth() + 3)),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 7,
          owner_email: "zimermaneyal@gmail.com",
          brand: "AUDI",
          year: 2012,
          fuel: "ELECTRIC",
          model: "A4",
          price_per_day: 90,
          discount_for_week: "5%",
          discount_for_month: "25%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getMonth() + 12)),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 8,
          owner_email: "rozjino@hotmail.com",
          brand: "TOYOTA",
          year: 2020,
          fuel: "OCTAN-95",
          model: "YARIS",
          price_per_day: 55,
          discount_for_week: "20%",
          discount_for_month: "25%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getMonth() + 8)),
          gear: "Manual",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 9,
          owner_email: "mosemose@hotmail.com",
          brand: "BMW",
          year: 2018,
          fuel: "ELECTRIC",
          model: "135I",
          price_per_day: 110,
          discount_for_week: "5%",
          discount_for_month: "25%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getMonth() + 6)),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 10,
          owner_email: "gil@hotmail.com",
          brand: "HONDA",
          year: 2017,
          fuel: "GAS",
          model: "PILOT",
          price_per_day: 60,
          discount_for_week: "10%",
          discount_for_month: "25%",
          is_rented: true,
          passengers: 7,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getMonth() + 12)),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 11,
          owner_email: "gil@hotmail.com",
          brand: "LEXUS",
          year: 2005,
          fuel: "OCTAN-95",
          model: "JS",
          price_per_day: 150,
          discount_for_week: "0%",
          discount_for_month: "0%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getMonth() + 4)),
          gear: "Manual",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 12,
          owner_email: "rozjino@hotmail.com",
          brand: "MAZDA",
          year: 2014,
          fuel: "SOLER",
          model: "MAZDA5",
          price_per_day: 50,
          discount_for_week: "25%",
          discount_for_month: "50%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getMonth() + 3)),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 13,
          owner_email: "zimermaneyal@gmail.com",
          brand: "PEUGEOT",
          year: 2021,
          fuel: "OCTAN-95",
          model: "LOOXOR",
          price_per_day: 98,
          discount_for_week: "0%",
          discount_for_month: "10%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getMonth() + 1)),
          gear: "Manual",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 14,
          owner_email: "yone@gmail.com",
          brand: "VOLVO",
          year: 2019,
          fuel: "ELECTRIC",
          model: "C70",
          price_per_day: 130,
          discount_for_week: "15%",
          discount_for_month: "30%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getMonth() + 9)),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 15,
          owner_email: "mosemose@hotmail.com",
          brand: "TOYOTA",
          year: 2000,
          fuel: "GAS",
          model: "COROLLA",
          price_per_day: 30,
          discount_for_week: "10%",
          discount_for_month: "25%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getMonth() + 7)),
          gear: "Manual",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 16,
          owner_email: "gil@hotmail.com",
          brand: "TESLA",
          year: 2021,
          fuel: "ELECTRIC",
          model: "MODEL X",
          price_per_day: 180,
          discount_for_week: "0%",
          discount_for_month: "5%",
          is_rented: true,
          passengers: 2,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getMonth() + 2)),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 17,
          owner_email: "yoel@hotmail.com",
          brand: "TOYOTA",
          year: 2020,
          fuel: "ELECTRIC",
          model: "Corolla",
          price_per_day: 60,
          discount_for_week: "5%",
          discount_for_month: "15%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(
            new Date().setMonth(new Date().getMonth() + 2)
          ),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 3)
          ),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 18,
          owner_email: "yoel@hotmail.com",
          brand: "TOYOTA",
          year: 2020,
          fuel: "Octan-95",
          model: "PRIUS",
          price_per_day: 50,
          discount_for_week: "5%",
          discount_for_month: "10%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 19,
          owner_email: "mose@hotmail.com",
          brand: "BMW",
          year: 2018,
          fuel: "Octan-95",
          model: "M3",
          price_per_day: 95,
          discount_for_week: "0%",
          discount_for_month: "20%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 2)
          ),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 20,
          owner_email: "mose@hotmail.com",
          brand: "FORD",
          year: 2016,
          fuel: "Octan-95",
          model: "Focus",
          price_per_day: 35,
          discount_for_week: "5%",
          discount_for_month: "20%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 2)
          ),
          gear: "Manuel",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 21,
          owner_email: "mose@hotmail.com",
          brand: "FORD",
          year: 2012,
          fuel: "Octan-95",
          model: "Fusion",
          price_per_day: 20,
          discount_for_week: "10%",
          discount_for_month: "10%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 5)
          ),
          gear: "Manuel",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 22,
          owner_email: "mose@hotmail.com",
          brand: "MAZDA",
          year: 2017,
          fuel: "Electric",
          model: "Mazda6",
          price_per_day: 55,
          discount_for_week: "10%",
          discount_for_month: "15%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 8)
          ),
          gear: "Automat",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 23,
          owner_email: "dodo1212@hotmail.com",
          brand: "MAZDA",
          year: 2014,
          fuel: "Octan-95",
          model: "CX-5",
          price_per_day: 55,
          discount_for_week: "5%",
          discount_for_month: "15%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(
            new Date().setMonth(new Date().getMonth() + 2)
          ),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 8)
          ),
          gear: "Automat",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 24,
          owner_email: "dodo1212@hotmail.com",
          brand: "TESLA",
          year: 2021,
          fuel: "Electric",
          model: "Model Y",
          price_per_day: 95,
          discount_for_week: "0%",
          discount_for_month: "0%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(
            new Date().setMonth(new Date().getMonth() + 2)
          ),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 7)
          ),
          gear: "Automat",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 25,
          owner_email: "asfasa@hotmail.com",
          brand: "TESLA",
          year: 2020,
          fuel: "Electric",
          model: "Model X",
          price_per_day: 100,
          discount_for_week: "5%",
          discount_for_month: "5%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 3)
          ),
          gear: "Manuel",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 26,
          owner_email: "asfasa@hotmail.com",
          brand: "TESLA",
          year: 2017,
          fuel: "Electric",
          model: "Model S",
          price_per_day: 100,
          discount_for_week: "5%",
          discount_for_month: "5%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(
            new Date().setMonth(new Date().getMonth() + 2)
          ),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 4)
          ),
          gear: "Automat",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 27,
          owner_email: "eli@hotmail.com",
          brand: "PEUGEOT",
          year: 2000,
          fuel: "Octan-95",
          model: "505",
          price_per_day: 20,
          discount_for_week: "5%",
          discount_for_month: "15%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          ),
          gear: "Manuel",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 28,
          owner_email: "eli@hotmail.com",
          brand: "PEUGEOT",
          year: 2003,
          fuel: "Octan-95",
          model: "405",
          price_per_day: 67,
          discount_for_week: "10%",
          discount_for_month: "15%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 2)
          ),
          gear: "Automat",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 29,
          owner_email: "michel@hotmail.com",
          brand: "PEUGEOT",
          year: 2020,
          fuel: "Octan-95",
          model: "504",
          price_per_day: 90,
          discount_for_week: "5%",
          discount_for_month: "5%",
          is_rented: false,
          passengers: 7,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ),
          gear: "Automat",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 30,
          owner_email: "meirav@hotmail.com",
          brand: "TOYOTA",
          year: 2020,
          fuel: "Soler",
          model: "Land Cruiser",
          price_per_day: 100,
          discount_for_week: "10%",
          discount_for_month: "15%",
          is_rented: false,
          passengers: 7,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 4)
          ),
          gear: "Automat",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 31,
          owner_email: "Efi@gmail.com",
          brand: "PEUGEOT",
          year: 1995,
          model: "505",
          fuel: "OCTAN-95",
          price_per_day: 60,
          discount_for_week: "5%",
          discount_for_month: "10%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ),
          gear: "Manual",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 32,
          owner_email: "Eitan.ach@gmail.com",
          brand: "MAZDA",
          year: 2014,
          fuel: "OCTAN-95",
          model: "Mazda3",
          price_per_day: 85,
          discount_for_week: "10%",
          discount_for_month: "15%",
          is_rented: false,
          passengers: 4,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 33,
          owner_email: "Pittie@gmail.com",
          brand: "TOYOTA",
          year: 2018,
          fuel: "OCTAN-95",
          model: "COROLLA",
          price_per_day: 75,
          discount_for_week: "10%",
          discount_for_month: "20%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 3)
          ),
          gear: "Manual",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 34,
          owner_email: "lior.amz@walla.co.il",
          brand: "FORD",
          year: 2016,
          fuel: "OCTAN-95",
          model: "Focus",
          price_per_day: 78,
          discount_for_week: "5%",
          discount_for_month: "10%",
          is_rented: false,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 2)
          ),
          gear: "Manual",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 35,
          owner_email: "Meshi.B@hotmail.com",
          brand: "PEUGEOT",
          year: 2016,
          fuel: "SOLER",
          model: "405",
          price_per_day: 20,
          discount_for_week: "5%",
          discount_for_month: "10%",
          is_rented: true,
          passengers: 9,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 4)
          ),
          gear: "Manual",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 36,
          owner_email: "Sonia@gmail.com",
          brand: "MAZDA",
          year: 2002,
          fuel: "SOLER",
          model: "Mazda3",
          price_per_day: 39,
          discount_for_week: "10%",
          discount_for_month: "25%",
          is_rented: true,
          passengers: 9,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 2)
          ),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 37,
          owner_email: "Eyal.Shani@gmail.com",
          brand: "TESLA",
          year: 2012,
          fuel: "ELECTRIC",
          model: "Model 3",
          price_per_day: 90,
          discount_for_week: "5%",
          discount_for_month: "25%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 12)
          ),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 38,
          owner_email: "Elizour@hotmail.com",
          brand: "TOYOTA",
          year: 2020,
          fuel: "OCTAN-95",
          model: "YARIS",
          price_per_day: 55,
          discount_for_week: "20%",
          discount_for_month: "25%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 8)
          ),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 39,
          owner_email: "Moshe@hotmail.com",
          brand: "BMW",
          year: 2018,
          fuel: "Soler",
          model: "X6",
          price_per_day: 110,
          discount_for_week: "5%",
          discount_for_month: "25%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 14)
          ),
          gear: "Manuel",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 40,
          owner_email: "Harry@hotmail.com",
          brand: "FORD",
          year: 2017,
          fuel: "GAS",
          model: "Transit",
          price_per_day: 100,
          discount_for_week: "10%",
          discount_for_month: "15%",
          is_rented: true,
          passengers: 7,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 8)
          ),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 41,
          owner_email: "Pittie@gmail.com",
          brand: "TOYOTA",
          year: 2021,
          fuel: "OCTAN-95",
          model: "PRIUS",
          price_per_day: 75,
          discount_for_week: "0%",
          discount_for_month: "5%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getDay() + 17)
          ),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 42,
          owner_email: "lior.amz@walla.co.il",
          brand: "MAZDA",
          year: 1989,
          fuel: "SOLER",
          model: "Mazda6",
          price_per_day: 50,
          discount_for_week: "25%",
          discount_for_month: "50%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          ),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 43,
          owner_email: "Moshe@hotmail.com",
          brand: "PEUGEOT",
          year: 2013,
          fuel: "OCTAN-95",
          model: "505",
          price_per_day: 110,
          discount_for_week: "0%",
          discount_for_month: "10%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 8)
          ),
          gear: "Manual",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 44,
          owner_email: "Moshe@hotmail.com",
          brand: "BMW",
          year: 2019,
          fuel: "Gas",
          model: "128i",
          price_per_day: 130,
          discount_for_week: "15%",
          discount_for_month: "30%",
          is_rented: true,
          passengers: 2,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 4)
          ),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 45,
          owner_email: "Pittie@gmail.com",
          brand: "TOYOTA",
          year: 2000,
          fuel: "GAS",
          model: "COROLLA",
          price_per_day: 30,
          discount_for_week: "10%",
          discount_for_month: "25%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 9)
          ),
          gear: "Manual",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          car_id: 46,
          owner_email: "Meshi.B@hotmail.com",
          brand: "TESLA",
          year: 2020,
          fuel: "ELECTRIC",
          model: "MODEL X",
          price_per_day: 165,
          discount_for_week: "0%",
          discount_for_month: "5%",
          is_rented: true,
          passengers: 2,
          available_from: new Date(),
          available_until: new Date(
            new Date().setMonth(new Date().getMonth() + 22)
          ),
          gear: "Auto",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cars", null, {});
  },
};
