import express from "express";
import {
    getFavorites,
    isFavorite,
    toggleFav,
} from "../controllers/favorite-property.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";

const router = express.Router();

router.get("/", verifyToken, getFavorites);
router.get("/:pid", verifyToken, isFavorite);
router.post("/:pid", verifyToken, toggleFav);

export default router;