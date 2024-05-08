import express from "express";
import {
    createReport
} from "../controllers/review_report.controller.js";

const router = express.Router();

// router.get("/:pid", getReports);
router.post("/:rid", createReport);

export default router;