import express from "express";
import {
  loginOwner,
  signupOwner,
  addNewSweet,
  updateSweet,
  deleteSweet,
  addStockToInventory,
} from "../controllers/index.js";

const router = express.Router({ mergeParams: true });

router.post("/login", loginOwner);
router.post("/signup", signupOwner);

router.post("/sweets", addNewSweet);
router.put("/sweets/:sweetId", updateSweet);
router.delete("/sweets/:sweetId", deleteSweet);

router.post("/sweets/addStock", addStockToInventory);

export default router;
