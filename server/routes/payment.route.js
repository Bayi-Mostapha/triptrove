import express from "express";
import
{   createSubscription,
    getPlans
}
from "../controllers/payment.controller.js";
import { verifyToken } from "../controllers/verifytoken.js"

const router = express.Router();

router.post("/create-subscription", verifyToken, createSubscription);
router.post("/get-plans", verifyToken, getPlans);


 
export default router;