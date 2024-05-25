import express from "express";
import {
    getHostBookings,
    getBookings,
    createBooking,
    createBookingSession,
    cancelBooking
} from "../controllers/booking.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";

const router = express.Router();

router.get("/host", verifyToken, getHostBookings);
router.get("/", verifyToken, getBookings);
router.post("/:pid", verifyToken, createBooking);
router.post("/payment-session/:pid", verifyToken, createBookingSession);
router.put("/:id", verifyToken, cancelBooking);

export default router;