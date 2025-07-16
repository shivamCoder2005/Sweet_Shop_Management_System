import express from "express";
import { loginOwner, signupOwner, addNewSweet } from "../controllers/index.js";

const router = express.Router({ mergeParams: true });

router.post("/login", loginOwner);
router.post("/signup", signupOwner);

router.post("/addSweet", addNewSweet);

export default router;
