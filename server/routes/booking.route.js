import express from "express";
import {
    // getBookings,
    createBooking,
} from "../controllers/booking.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";

const router = express.Router();

// router.get("/", getBookings);
router.post("/:pid", verifyToken, createBooking);

export default router;