import express from "express";
import {
    // getReports,
    createReport
} from "../controllers/review_report.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";

const router = express.Router();

// router.get("/:pid", getReports);
router.post("/:rid", verifyToken, createReport);

export default router;