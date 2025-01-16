const db = require("../models");

module.exports = async () => {
  await db.sequelize.close(); // Close database connection after tests
};
