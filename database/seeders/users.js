module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          user_id: 1,
          name: "Eyal",
          phone_number: "0545732556",
          address: "Modiin, fuckyou, 23",
          rating: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          name: "Jino",
          phone_number: "0545732998",
          address: "Pisgat -zeev, fuckall, 8",
          rating: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
          name: "Eliav",
          phone_number: "0545732117",
          address: "Efrat, hagoren, 8",
          rating: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          name: "Lea Shoshnik",
          phone_number: "0545985416",
          address: "edgswg",
          rating: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          name: "Oded Margalit",
          phone_number: "0589623778",
          address: "edgswg",
          rating: 4,
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
