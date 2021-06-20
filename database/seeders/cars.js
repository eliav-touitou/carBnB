const date = new Date();
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "cars",
      [
        {
          car_id: 1,
          owner_email: "eyal@gmail.com",
          brand: "Reno",
          year: 2009,
          model: "Megan",
          fuel: "95",
          price_per_day: 30,
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
          brand: "Suzuki",
          year: 2014,
          fuel: "95",
          model: "Alto",
          price_per_day: 25,
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
          brand: "toyota",
          year: 2018,
          fuel: "95",
          model: "CHR",
          price_per_day: 30,
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
          brand: "ford",
          year: 2016,
          fuel: "95",
          model: "focus",
          price_per_day: 10,
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
          brand: "Skoda",
          year: 1989,
          fuel: "Soler",
          model: "Superb",
          price_per_day: 10,
          discount_for_week: "25%",
          discount_for_month: "50%",
          is_rented: true,
          passengers: 5,
          available_from: new Date(),
          available_until: new Date(date.setMonth(date.getMonth() + 1)),
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
