import express from "express";
import {
  createUrl,
  getAllUrl,
  getMonthlyUrl,
  todayCreatedUrl,
  updateClickedCount,
} from "../controllers/urlController.js";

const router = express.Router();

router.post("/createURL", createUrl);
router.post("/all-urls", getAllUrl);
router.post("/today", todayCreatedUrl);
router.post("/monthly", getMonthlyUrl);
router.post("/click-count", updateClickedCount);

export default router;
