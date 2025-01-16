require("dotenv").config();

const env = process.env.NODE_ENV || "development";

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  DB_STORAGE: env === "test" ? ":memory:" : "database.sqlite",
};
