module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        password: "adminpass",
        role: "admin",
        can_access: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user1",
        password: "userpass1",
        role: "user",
        can_access: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user2",
        password: "userpass2",
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
