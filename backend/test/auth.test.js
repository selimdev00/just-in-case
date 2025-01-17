const request = require("supertest");
const app = require("../server");
const db = require("../models");

let adminToken;
let userToken;

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

afterAll(async () => {
  await db.sequelize.close();
});

describe("Auth Endpoints", () => {
  it("should log in an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "admin",
      password: "adminpass",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not log in with invalid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "admin",
      password: "wrongpass",
    });
    expect(res.statusCode).toBe(401);
  });
});
