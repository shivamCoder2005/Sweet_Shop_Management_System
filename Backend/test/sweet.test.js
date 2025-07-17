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
      const sweetId = "6877fa114e7e24f2005fb90e";
      const res = await request(app).get(`/sweets/${sweetId}`);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Update Sweet API Test", () => {
    it("/UPDATE should succesfully update sweet", async () => {
      const sweetData = {
        name: "demoUpdateSweet",
        category: "nuts",
        price: 1000,
        quantity: 500,
      };
      const sweetId = "6877fa4dc06c87a2a9a718b4";
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

  // make sure that sweet exist because after runnig it one time we need to change sweetId as old already delete
  describe("Delete Sweet API Test", () => {
    it("/DELETE should delete sweet", async () => {
      const sweetId = "6877faa97198157e4f397bc0";
      const res = await request(app).delete(`/owner/sweets/${sweetId}`);
      expect(res.statusCode).toBe(200);
    });

    it("/DELETE should return error as sweet not exist", async () => {
      const sweetId = "000000000000000000000000";
      const res = await request(app).delete(`/owner/sweets/${sweetId}`);
      expect(res.statusCode).toBe(500);
    });
  });

  describe("Get filterd sweet API Test", () => {
    const sortFilterOptions = {
      name: "",
      category: "nuts",
      sortBy: "price",
      sort: 1,
      minVal: 100,
      maxVal: 500,
    };
    it("/POST should return filterd sweets", async () => {
      const res = await request(app)
        .post("/sweets/sort-filter")
        .send({ sortFilterOptions });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Update Stock API Test", () => {
    it("/POST should update the existing stock", async () => {
      const updatedStock = [
        {
          _id: "6877fa114e7e24f2005fb90e",
          updatedSweetQuantity: 200,
        },
        { _id: "6877fa4dc06c87a2a9a718b4", updatedSweetQuantity: 200 },
      ];

      const res = await request(app)
        .post("/owner/sweets/addStock")
        .send({ updatedStock });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Buy Sweet API Test", () => {
    it("/POST should successfully buy sweets", async () => {
      const purchaseData = {
        _id: "6877fa4dc06c87a2a9a718b4",
        buyQuantity: 100,
      };

      const res = await request(app)
        .post("/user/sweets/buy")
        .send({ purchaseData });

      expect(res.statusCode).toBe(200);
    });

    it("/POST should return error as not enough stock", async () => {
      const purchaseData = {
        _id: "6877fa4dc06c87a2a9a718b4",
        buyQuantity: 1000000000000,
      };

      const res = await request(app)
        .post("/user/sweets/buy")
        .send({ purchaseData });

      expect(res.statusCode).toBe(400);
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
