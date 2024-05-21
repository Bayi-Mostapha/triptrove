import express from "express";
import {
    getReviews,
    createReview,
    deleteReview,
    updateReview
} from "../controllers/review.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";

const router = express.Router();

router.get("/:pid", getReviews);
router.post("/:pid", verifyToken, createReview);
router.delete("/:id", verifyToken, deleteReview);
router.put("/:id", verifyToken, updateReview);

export default router;