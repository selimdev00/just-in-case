const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        password: bcrypt.hashSync("adminpass", 10),
        role: "admin",
        can_access: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user1",
        password: bcrypt.hashSync("user1pass", 10),
        role: "user",
        can_access: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user2",
        password: bcrypt.hashSync("user2pass", 10),
        role: "user",
        can_access: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
