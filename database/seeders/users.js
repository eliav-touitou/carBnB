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
          address: "MODI'IN-MAKKABBIM-RE",
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
          address: "GIV'AT SHAPPIRA",
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
          address: "EFRATA",
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
          address: "KEFAR HARO'E",
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
          address: "YOQNE'AM ILLIT",
          rating: 4,
          number_of_votes: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "yone@gmail.com",
          first_name: "jino",
          last_name: "rozma",
          phone_number: "0589623778",
          address: "JERUSALEM",
          rating: 2,
          number_of_votes: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "zimermaneyal@gmail.com",
          first_name: "eyal",
          last_name: "zim",
          phone_number: "0589623778",
          address: "TEL AVIV - YAFO",
          rating: 3,
          number_of_votes: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "rozjino@hotmail.com",
          first_name: "rozi",
          last_name: "jinobigo",
          phone_number: "0589623778",
          address: "HAIFA",
          rating: 5,
          number_of_votes: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "mosemose@hotmail.com",
          first_name: "mose",
          last_name: "mose",
          phone_number: "0589623778",
          address: "HERZELIYYA",
          rating: 1,
          number_of_votes: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "gil@hotmail.com",
          first_name: "gil",
          last_name: "naaman",
          phone_number: "0589623778",
          address: "BEIT JANN",
          rating: 5,
          number_of_votes: 50,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Efi@gmail.com",
          first_name: "Efi",
          last_name: "Tirsh",
          phone_number: "0542732556",
          address: "TEL AVIV - YAFO",
          rating: 4,
          number_of_votes: 12,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Eitan.ach@gmail.com",
          first_name: "Eitan",
          last_name: "Ach",
          phone_number: "0505732998",
          address: "TEL AVIV - YAFO",
          rating: 2.6,
          number_of_votes: 46,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Pittie@gmail.com",
          first_name: "Pittie",
          last_name: "Leshem",
          phone_number: "0525732117",
          address: "TEL AVIV - YAFO",
          rating: 4,
          number_of_votes: 145,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "lior.amz@walla.co.il",
          first_name: "Lior",
          last_name: "Amzalleg",
          phone_number: "0545985666",
          address: "TEL AVIV - YAFO",
          rating: 0.7,
          number_of_votes: 45,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Meshi.B@hotmail.com",
          first_name: "Meshi",
          last_name: "Barouch",
          phone_number: "0589678778",
          address: "TEL AVIV - YAFO",
          rating: 5,
          number_of_votes: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Sonia@gmail.com",
          first_name: "Sonia",
          last_name: "Fish",
          phone_number: "0588623778",
          address: "TEL AVIV - YAFO",
          rating: 2,
          number_of_votes: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Eyal.Shani@gmail.com",
          first_name: "Eyal",
          last_name: "Shani",
          phone_number: "0589623678",
          address: "TEL AVIV - YAFO",
          rating: 3,
          number_of_votes: 22,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Elizour@hotmail.com",
          first_name: "Elizour",
          last_name: "Pour",
          phone_number: "0589623778",
          address: "TEL AVIV - YAFO",
          rating: 5,
          number_of_votes: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Moshe@hotmail.com",
          first_name: "Moshe",
          last_name: "Rabenu",
          phone_number: "0589623778",
          address: "TEL AVIV - YAFO",
          rating: 1,
          number_of_votes: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Harry@hotmail.com",
          first_name: "Harry",
          last_name: "Potter",
          phone_number: "058963778",
          address: "TEL AVIV - YAFO",
          rating: 5,
          number_of_votes: 50,
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
