import express from "express";
import
{   
    signin,
    getAdmin,  
    getAll,
    createAdmin,
    deleteAdmin,
    changeAdminRole,
}
from "../controllers/admin.controller.js";
import { verifyTokenAdmin  } from "../controllers/verifytokenadmin.js";

  
const router = express.Router();


router.post("/signin", signin);
router.get("/",verifyTokenAdmin, getAdmin);
router.get("/get-all",verifyTokenAdmin, getAll);
router.post("/create",verifyTokenAdmin, createAdmin);
router.delete("/",verifyTokenAdmin, deleteAdmin);
router.post("/upgrade-downgrade",verifyTokenAdmin, changeAdminRole);

export default router;