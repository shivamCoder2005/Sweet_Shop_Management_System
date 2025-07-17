import express from "express";
import {
  getAllSweets,
  getOneSweet,
  sortAndFilterSweets,
} from "../controllers/index.js";

const router = express.Router({ mergeParams: true });

router.get("/all", getAllSweets);
router.get("/:sweetId", getOneSweet);
router.post("/sort-filter", sortAndFilterSweets);

export default router;
