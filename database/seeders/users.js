module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          user_email: "eyal@gmail.com",
          first_name: "Eyal",
          last_name: "Zimerman",
          phone_number: "0545732556",
          address: "Modiin, fuckyou, 23",
          rating: 1,
          number_of_votes: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "jino@gmail.com",
          first_name: "Jino",
          last_name: "Roz",
          phone_number: "0545732998",
          address: "Pisgat -zeev, fuckall, 8",
          rating: 1,
          number_of_votes: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "eliav@gmail.com",
          first_name: "Eliav",
          last_name: "Touitou",
          phone_number: "0545732117",
          address: "Efrat, hagoren, 8",
          rating: 4,
          number_of_votes: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "lea.shosh@walla.co.il",
          first_name: "Lea",
          last_name: "Shoshnik",
          phone_number: "0545985416",
          address: "cfar haroee",
          rating: 2,
          number_of_votes: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "oded.mar@hotmail.com",
          first_name: "Oded",
          last_name: "Margalit",
          phone_number: "0589623778",
          address: "Yokneam",
          rating: 4,
          number_of_votes: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
