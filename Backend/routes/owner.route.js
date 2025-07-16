import express from "express";
import {
  loginOwner,
  signupOwner,
  addNewSweet,
  updateSweet,
} from "../controllers/index.js";

const router = express.Router({ mergeParams: true });

router.post("/login", loginOwner);
router.post("/signup", signupOwner);

router.post("/sweets", addNewSweet);
router.put("/sweets/:sweetId", updateSweet);

export default router;
