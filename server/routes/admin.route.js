import express from "express";
import
{   
    signin,
    getAdmin
}
from "../controllers/admin.controller.js";
import { verifyTokenAdmin  } from "../controllers/verifytokenadmin.js";

const router = express.Router();


router.post("/signin", signin);
router.get("/",verifyTokenAdmin, getAdmin);

export default router;