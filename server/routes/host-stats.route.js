import express from "express";
import {
    getStatistics
} from "../controllers/host-stats.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";

const router = express.Router();

router.get("/", verifyToken, getStatistics);

export default router;