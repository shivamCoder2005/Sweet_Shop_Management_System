import mongoose from "mongoose";
import request from "supertest";
import { app } from "../index.js";

describe("User Signup & Login API Test", () => {
  describe("User Signup Test", () => {
    it("/POST should successfully create user", async () => {
      const userData = {
        name: "shivam",
        email: "shivam2005@gmail.com",
        password: "123",
      };

      const res = await request(app).post("/user/signup").send({ userData });
      expect(res.status).toBe(200);
    });

    it("/POST should return error as email already exists", async () => {
      const userData = {
        name: "shivam2",
        email: "shivam2005@gmail.com",
        password: "123",
      };
      const res = await request(app).post("/user/signup").send({
        userData,
      });
      expect(res.status).toBe(409);
    });
  });

  describe("User Login Test", () => {
    it("/POST should return user details on valid login", async () => {
      const userData = {
        email: "demouser123@gmail.com",
        password: "123",
      };
      const res = await request(app).post("/user/login").send({
        userData,
      });
      expect(res.status).toBe(200);
    });

    it("/POST should return error as user does not exist", async () => {
      const userData = {
        email: "doesnotexist@gmail.com",
        password: "anything",
      };
      const res = await request(app).post("/user/login").send({
        userData,
      });
      expect(res.status).toBe(404);
    });

    it("/POST should return error as password does not match", async () => {
      const userData = {
        email: "demouser123@gmail.com",
        password: "wrongPassword",
      };
      const res = await request(app).post("/user/login").send({
        userData,
      });
      expect(res.status).toBe(401);
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
