const express = require("express");
const morgan = require("morgan");
const db = require("./models");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  db.sequelize.sync().then(() => {
    console.log("Database synced");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
}

module.exports = app;
