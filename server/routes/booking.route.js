import express from "express";
import {
    getAllBookings,
    getBookings,
    createBooking,
    createBookingSession,
    cancelBooking
} from "../controllers/booking.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";
import { verifyTokenAdmin } from "../controllers/verifytokenadmin.js";

const router = express.Router();

router.get("/all", verifyTokenAdmin, getAllBookings);
router.get("/", verifyToken, getBookings);
router.post("/:pid", verifyToken, createBooking);
router.post("/payment-session/:pid", verifyToken, createBookingSession);
router.put("/:id", verifyToken, cancelBooking);

export default router;