import express from "express";
import {
    getReviews,
    createReview,
    deleteReview,
    updateReview
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/:pid", getReviews);
router.post("/:pid", createReview);
router.delete("/:id", deleteReview);
router.put("/:id", updateReview);

export default router;