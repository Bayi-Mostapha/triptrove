import express from "express";
import
{   createSubscription
}
from "../controllers/payment.controller.js";


const router = express.Router();

router.post("/create-subscription", createSubscription);


export default router;