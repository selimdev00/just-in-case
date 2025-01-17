const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const { User } = require("../models");

const router = express.Router();

router.get("/dashboard", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ message: "Welcome to the admin dashboard" });
});

router.get("/users", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "role", "can_access"],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching users." });
  }
});

router.patch(
  "/users/:id",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    try {
      const { id } = req.params;

      if (id === req.user.id) {
        return res
          .status(403)
          .json({ message: "Cannot toggle access for admin users" });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.role === "admin") {
        return res
          .status(403)
          .json({ message: "Cannot toggle access for admin users" });
      }

      user.can_access = !user.can_access;
      await user.save();

      res
        .status(200)
        .json({ message: "User access toggled successfully", user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while toggling user access" });
    }
  },
);

module.exports = router;
