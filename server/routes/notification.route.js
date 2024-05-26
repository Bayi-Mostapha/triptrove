import express from "express";
import
{   
    getUserNotifications,
    markNotificationAsRead,
}
from "../controllers/notification.controller.js";
import { verifyTokenAdmin  } from "../controllers/verifytokenadmin.js";
import { verifyToken  } from "../controllers/verifytoken.js";

  
const router = express.Router();


router.get("/",verifyToken, getUserNotifications);
router.get("/admin",verifyTokenAdmin, getUserNotifications);
router.post("/read", markNotificationAsRead);

export default router;