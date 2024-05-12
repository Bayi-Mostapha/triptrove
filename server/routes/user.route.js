import express from "express";
import
{   getUser,
    uploadProfileImage,
    updateUserData,
    updateUserPassword,
    getAllUser,
}
from "../controllers/user.controller.js";
import { verifyToken  } from "../controllers/verifytoken.js";
import multer from 'multer';
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get("/",verifyToken, getUser);
router.get("/get-all",verifyToken, getAllUser);
router.post("/profile",verifyToken ,upload.single('image'), uploadProfileImage);
router.post("/update",verifyToken , updateUserData);
router.post("/update-passwords",verifyToken , updateUserPassword);

export default router;