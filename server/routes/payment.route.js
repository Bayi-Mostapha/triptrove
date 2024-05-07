import express from "express";
import
{   createSubscription
}
from "../controllers/payment.controller.js";
import { verifyToken } from "../controllers/verifytoken.js"

const router = express.Router();

router.post("/create-subscription", verifyToken, createSubscription);


 
export default router;