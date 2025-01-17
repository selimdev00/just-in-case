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
  const admin2 = await db.User.create({
    username: "admin2",
    password: "adminpass2",
    role: "admin",
  });
  const user = await db.User.create({
    username: "user",
    password: "userpass",
    role: "user",
  });
  adminId = admin.id;
  admin2Id = admin.id;
  userId = user.id;

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

describe("Admin Endpoints", () => {
  it("should allow admin to access the dashboard", async () => {
    const res = await request(app)
      .get("/api/admin/dashboard")
      .set("Authorization", adminToken);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Welcome to the admin dashboard");
  });

  it("should prevent a user from accessing the admin dashboard", async () => {
    const res = await request(app)
      .get("/api/admin/dashboard")
      .set("Authorization", userToken);
    expect(res.statusCode).toBe(403);
  });

  it("should allow admin to retrieve all users", async () => {
    const res = await request(app)
      .get("/api/admin/users")
      .set("Authorization", adminToken);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(3);
    expect(res.body[0]).toHaveProperty("username");
    expect(res.body[0]).toHaveProperty("role");
  });

  it("should deny access to non-admin users", async () => {
    const res = await request(app)
      .get("/api/admin/users")
      .set("Authorization", userToken);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden");
  });

  it("should deny access without a token", async () => {
    const res = await request(app).get("/api/admin/users");
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("No token provided");
  });

  it("should allow admin to toggle user access", async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${userId}`)
      .set("Authorization", adminToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.can_access).toBe(false); // Access toggled off
  });

  it("should prevent admin from toggling their own access", async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${adminId}`)
      .set("Authorization", adminToken);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Cannot toggle access for admin users");
  });

  it("should return 404 if user does not exist", async () => {
    const res = await request(app)
      .patch(`/api/admin/users/9999`)
      .set("Authorization", adminToken);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  it("should prevent toggling access for admin users", async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${admin2Id}`)
      .set("Authorization", adminToken);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Cannot toggle access for admin users");
  });
});
