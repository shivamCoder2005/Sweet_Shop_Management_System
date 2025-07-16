import express from "express";
import { getAllSweets, getOneSweet } from "../controllers/index.js";

const router = express.Router({ mergeParams: true });

router.get("/all", getAllSweets);
router.get("/:sweetId", getOneSweet);

export default router;
