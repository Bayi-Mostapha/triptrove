import express from "express";
import {
    getAllReports,
    getReports,
    createReport,
    deleteReport
} from "../controllers/review_report.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";
import { verifyTokenAdmin } from "../controllers/verifytokenadmin.js";

const router = express.Router();

router.get("/", verifyTokenAdmin, getAllReports);
router.get("/:pid", verifyTokenAdmin, getReports);
router.post("/:rid", verifyToken, createReport);
router.delete("/:rid", verifyTokenAdmin, deleteReport);

export default router;