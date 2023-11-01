import mongoose from "mongoose";
import request from "supertest";
import app from "../../app.js";

const { DB_HOST, PORT = 3000 } = process.env;

describe("test signin route", () => {
  let testServer = null;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    testServer = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    testServer.close();
  });

  test("test signin with correct data", async () => {
    const signinData = {
      email: "test@test.com",
      password: "testtest",
    };

    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(signinData);

    expect(statusCode).toBe(200);

    expect(body).toStrictEqual({
      token: expect.any(String),
      user: expect.objectContaining({
        email: signinData.email,
        subscription: expect.stringMatching(/starter|pro|business/),
      }),
    });
  });
});
