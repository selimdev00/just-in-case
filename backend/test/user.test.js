const request = require("supertest");
const app = require("../server");
const db = require("../models");

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
  const admin = await db.User.create({
    username: "admin",
    password: "adminpass",
    role: "admin",
  });
  const user = await db.User.create({
    username: "user",
    password: "userpass",
    role: "user",
  });

  // Get tokens
  const adminResponse = await request(app).post("/api/auth/login").send({
    username: admin.username,
    password: "adminpass",
  });
  adminToken = adminResponse.body.token;

  const userResponse = await request(app).post("/api/auth/login").send({
    username: user.username,
    password: "userpass",
  });
  userToken = userResponse.body.token;
});

describe("User Endpoints", () => {
  it("should allow a user to access their profile", async () => {
    const res = await request(app)
      .get("/api/user/profile")
      .set("Authorization", userToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("Welcome");
  });

  it("should allow admin to access user profile", async () => {
    const res = await request(app)
      .get("/api/user/profile")
      .set("Authorization", adminToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("Welcome");
  });
});
