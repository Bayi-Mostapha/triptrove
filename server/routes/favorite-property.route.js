import express from "express";
import {
    getFavorites,
    toggleFav,
} from "../controllers/favorite-property.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";

const router = express.Router();

router.get("/", verifyToken, getFavorites);
router.post("/:pid", verifyToken, toggleFav);

export default router;