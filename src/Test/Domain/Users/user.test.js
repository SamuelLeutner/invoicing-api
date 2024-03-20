const request = require("supertest");
const app = require("../../../main.js");
const BaseTest = require('../../../Core/Service/BaseTest.js')
const make = new BaseTest()

describe("User", () => {
  it("should return 201 when register a user", async () => {
    const response = await request(app).post("/api/register")
      .send({
        name: "Test User",
        email: "test@test.com",
        password: "Change122!",
        passwordConfirmation: "Change122!",
      });

    expect(response.statusCode).toBe(201);
  });

  it("should return 200 when login", async () => {
    await make.user({
      name: "Test User",
      email: "test@test.com",
      password: "Change122!",
    })

    const response = await request(app).post("/api/login")
      .send({
        email: "test@test.com",
        password: "Change122!",
      });

    expect(response.statusCode).toBe(200);
  });

  it("should return 401 when login with wrong password", async () => {
    await make.user({
      name: "Test User",
      email: "test@test.com",
      password: "Change122!",
    })

    const response = await request(app).post("/api/login")
      .send({
        email: "test@test.com",
        password: "Change1!",
      });

    expect(response.statusCode).toBe(401);
  });

  it("should return 404 when login with wrong email", async () => {
    await make.user({
      name: "Test User",
      email: "test@test.com",
      password: "Change122!",
    })

    const response = await request(app).post("/api/login")
      .send({
        email: "est@test.com",
        password: "Change122!",
      });

    expect(response.statusCode).toBe(404);
  });

  it("should return 200 when send change password", async () => {
    await make.user({
      name: "Test User",
      email: "test@test.com",
      password: "Change122!",
    })

    const response = await request(app).post("/api/change-password")
      .send({
        email: "test@test.com",
      });

    expect(response.statusCode).toBe(200);
  });

  it("should return 200 when change password", async () => {
    await make.user({
      name: "Test User",
      email: "test@test.com",
      password: "Change122!",
    })

    const getTokenResponse = await request(app).post("/api/change-password")
      .send({
        email: "test@test.com",
      });

    const token = getTokenResponse.body.user.token;

    if (!getTokenResponse.body || !token) {
      throw new Error("Token not found in response body");
    }

    const response = await request(app)
      .post(`/api/change-password/temporary_token=${token}`)
      .send({
        newPassword: "ChangeToAnotherPassword123!",
        newPasswordConfirmation: "ChangeToAnotherPassword123!",
      });

    expect(response.statusCode).toBe(200);
  });
});
