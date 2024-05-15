import express from "express";
import {
    getProperty,
    createProperty,
} from "../controllers/property.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";

const router = express.Router();

router.get("/:id", getProperty);
router.post("/", verifyToken, createProperty);

export default router;