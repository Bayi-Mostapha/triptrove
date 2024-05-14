import express from "express";
import {
    // getBookings,
    createBooking,
    createBookingSession,
} from "../controllers/booking.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";

const router = express.Router();

// router.get("/", getBookings);
router.post("/payment-session/:pid", createBookingSession);
router.post("/:pid", verifyToken, createBooking);

export default router;