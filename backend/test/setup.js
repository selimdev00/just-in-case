const db = require("../models");

module.exports = async () => {
  await db.sequelize.sync({ force: true }); // Reset database for each test suite
};
