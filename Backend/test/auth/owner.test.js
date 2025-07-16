import mongoose from "mongoose";
import request from "supertest";
import {app} from "../../index.js";

describe("Owner Signup & Login API Test", () => {
  describe("Owner Signup Test", () => {
    it("/POST should successfully create owner", async () => {
      const res = await request(app)
        .post("/owner/signup")
        .send({
          ownerData: {
            name: "demo",
            email: "demo@gmail.com",
            password: "123",
          },
        });
      expect(res.status).toBe(200);
    });

    it("/POST should return error as email already exists", async () => {
      const res = await request(app)
        .post("/owner/signup")
        .send({
          ownerData: {
            name: "demo2",
            email: "demo@gmail.com",
            password: "123",
          },
        });
      expect(res.status).toBe(409);
    });
  });

  describe("Owner Login Test", () => {
    it("/POST should return user details on valid login", async () => {
      const res = await request(app)
        .post("/owner/login")
        .send({
          ownerData: {
            email: "makwanashivam1709@gmail.com",
            password: "makwanashivam1709@gmail.com",
          },
        });
      expect(res.status).toBe(200);
    });

    it("/POST should return error as user does not exist", async () => {
      const res = await request(app)
        .post("/owner/login")
        .send({
          ownerData: {
            email: "doesnotexist@gmail.com",
            password: "anything",
          },
        });
      expect(res.status).toBe(404);
    });

    it("/POST should return error as password does not match", async () => {
      const res = await request(app)
        .post("/owner/login")
        .send({
          ownerData: {
            email: "makwanashivam1709@gmail.com",
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