import express from "express";
import { getAllSweets } from "../controllers/index.js";

const router = express.Router({ mergeParams: true });

router.get("/all", getAllSweets);

export default router;
