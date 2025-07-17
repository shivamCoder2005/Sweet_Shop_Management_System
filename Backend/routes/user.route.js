import express from "express";
import { loginUser, signupUser, purchaseSweets } from "../controllers/index.js";

const router = express.Router({ mergeParams: true });

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/sweets/buy", purchaseSweets);

export default router;
