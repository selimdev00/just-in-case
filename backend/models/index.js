const { Sequelize } = require("sequelize");
const { DB_STORAGE } = require("../config");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DB_STORAGE,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("./user")(sequelize, Sequelize);

module.exports = db;
