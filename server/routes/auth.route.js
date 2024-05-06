import express from "express";
import
{   signup,
    signin,
    googleAuth, 
    generateCode,
    verifyResetCode,
    resetPassword,
}
from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", googleAuth);
router.post("/reset-password", generateCode);
router.post("/reset-password-code", verifyResetCode);
router.post("/reset-newpassword", resetPassword);

export default router;