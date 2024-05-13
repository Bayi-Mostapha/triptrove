import express from "express";
import {
    // getBookings,
    createBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

// router.get("/", getBookings);
router.post("/:pid", createBooking);

export default router;