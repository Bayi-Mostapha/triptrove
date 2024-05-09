import express from "express";
import
{   getUser,
    uploadProfileImage,
    updateUserData,
}
from "../controllers/user.controller.js";
import { verifyToken  } from "../controllers/verifytoken.js";
import multer from 'multer';
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get("/",verifyToken, getUser);
router.post("/profile",verifyToken ,upload.single('image'), uploadProfileImage);
router.post("/update",verifyToken , updateUserData);

export default router;