import express from "express";
import
{   getUser,
    uploadProfileImage,
    updateUserData,
    updateUserPassword,
    getAllUser,
    deleteUser,
}
from "../controllers/user.controller.js";
import
{ 
    upgrade,
    cancelSubs,
}
from "../controllers/payment.controller.js";
import { verifyToken  } from "../controllers/verifytoken.js";
import { verifyTokenAdmin  } from "../controllers/verifytokenadmin.js";
import multer from 'multer';
const router = express.Router();

const upload = multer({ dest: 'uploads/' });
    
router.get("/",verifyToken, getUser);
router.get("/get-all",verifyToken, getAllUser);
router.post("/profile",verifyToken ,upload.single('image'), uploadProfileImage);
router.post("/update",verifyToken , updateUserData);
router.post("/update-passwords",verifyToken , updateUserPassword);
router.delete("/",verifyTokenAdmin, deleteUser);
router.get("/subscription-cancel",verifyToken, cancelSubs);
router.get("/subscription-update",verifyToken, upgrade);

export default router;