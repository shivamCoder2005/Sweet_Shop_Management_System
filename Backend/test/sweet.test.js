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
      const res = await request(app).post("/owner/addSweet").send({
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
      const res = await request(app).post("/owner/addSweet").send({
        sweetData,
      });
      expect(res.status).toBe(409);
    });
  });

  describe("Get Sweets API Test", () => {
    it("/GET should return all sweets data", async () => {
      const res = await request(app).get("/sweet/all");
      expect(res.statusCode).toBe(200);
    });
  });
});
