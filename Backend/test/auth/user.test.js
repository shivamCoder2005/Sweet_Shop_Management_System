import mongoose from "mongoose";
import request from "supertest";
import {app} from "../../index.js";

describe("User Signup & Login API Test", () => {
  describe("User Signup Test", () => {
    it("/POST should successfully create user", async () => {
      const res = await request(app)
        .post("/user/signup")
        .send({
          userData: {
            name: "shivam",
            email: "shivam2005@gmail.com",
            password: "123",
          },
        });
      expect(res.status).toBe(200);
    });

    it("/POST should return error as email already exists", async () => {
      const res = await request(app)
        .post("/user/signup")
        .send({
          userData: {
            name: "shivam2",
            email: "shivam2005@gmail.com",
            password: "123",
          },
        });
      expect(res.status).toBe(409);
    });
  });

  describe("User Login Test", () => {
    it("/POST should return user details on valid login", async () => {
      const res = await request(app)
        .post("/user/login")
        .send({
          userData: {
            email: "manav2007@gmail.com",
            password: "manav2007@gmail.com",
          },
        });
      expect(res.status).toBe(200);
    });

    it("/POST should return error as user does not exist", async () => {
      const res = await request(app)
        .post("/user/login")
        .send({
          userData: {
            email: "doesnotexist@gmail.com",
            password: "anything",
          },
        });
      expect(res.status).toBe(404);
    });

    it("/POST should return error as password does not match", async () => {
      const res = await request(app)
        .post("/user/login")
        .send({
          userData: {
            email: "manav2007@gmail.com",
            password: "wrongPassword",
          },
        });
      expect(res.status).toBe(401);
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});