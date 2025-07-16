import mongoose from "mongoose";
import request from "supertest";
import { app } from "../index.js";

describe("Sweet API Test", () => {
  describe("Add Sweet API Test", () => {
    it("/POST should successfully add sweet", async () => {
      const sweetData = {
        name: "kaju katli",
        category: "nuts",
        price: 1000,
        quantity: 5,
      };
      const res = await request(app).post("/owner/sweets").send({
        sweetData,
      });
      expect(res.status).toBe(200);
    });

    it("/POST should return error as sweet with same name already exist", async () => {
      const sweetData = {
        name: "demoSweet",
        category: "nuts",
        price: 1000,
        quantity: 5,
      };
      const res = await request(app).post("/owner/sweets").send({
        sweetData,
      });
      expect(res.status).toBe(409);
    });
  });

  describe("Get Sweets API Test", () => {
    it("/GET should return all sweets data", async () => {
      const res = await request(app).get("/sweets/all");
      expect(res.statusCode).toBe(200);
    });

    it("/GET should return particular sweets data", async () => {
      const sweetId = "68776af5ef5a1a580c5e75e5";
      const res = await request(app).get(`/sweets/${sweetId}`);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Update Sweet API Test", () => {
    it("/UPDATE should succesfully update sweet", async () => {
      const sweetData = {
        name: "demo sweet2",
        category: "nuts",
        price: 1000,
        quantity: 500,
      };
      const sweetId = "68776af5ef5a1a580c5e75e5";
      const res = await request(app).put(`/owner/sweets/${sweetId}`).send({
        sweetData,
      });
      expect(res.status).toBe(200);
    });

    it("/UPDATE should return error as sweet not found", async () => {
      const sweetData = {
        name: "demo sweet",
        category: "nuts",
        price: 1000,
        quantity: 50,
      };
      const sweetId = "000000000000000000000000";
      const res = await request(app).put(`/owner/sweets/${sweetId}`).send({
        sweetData,
      });
      expect(res.status).toBe(500);
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
