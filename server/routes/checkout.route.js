import express from "express";
import {
    createStripeAccountLink,
    checkoutWallet,
    hasAccount
} from "../controllers/checkout.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";

const router = express.Router();

router.get('/has-account', verifyToken, hasAccount)
router.post('/create-link', verifyToken, createStripeAccountLink)
router.post('/checkout', verifyToken, checkoutWallet)

export default router;