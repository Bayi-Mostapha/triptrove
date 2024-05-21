import express from "express";
import {
    getAllReports,
    getReports,
    createReport,
    deleteReport
} from "../controllers/property_report.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";
import { verifyTokenAdmin } from "../controllers/verifytokenadmin.js";

const router = express.Router();

router.get("/", verifyTokenAdmin, getAllReports);
router.get("/:id", verifyTokenAdmin, getReports);
router.post("/:id", verifyToken, createReport);
router.delete("/:id", verifyTokenAdmin, deleteReport);

export default router;