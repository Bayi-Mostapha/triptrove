import express from "express";
import
{   getUser
}
from "../controllers/user.controller.js";
import { verifyToken  } from "../controllers/verifytoken.js";
const router = express.Router();

router.get("/",verifyToken, getUser);

export default router;