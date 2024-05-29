import express from "express";
import {
    createProblemReport,
    createMessage,
    getAllUserProblemsWithMessages,
    getAllProblemsWithMessages,
    closeTicket,
    deleteTicket,
} from "../controllers/problem.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";
import { verifyTokenAdmin } from "../controllers/verifytokenadmin.js";


const router = express.Router();

router.post('/create', verifyToken, createProblemReport);
router.post('/:problemId/messages/user', verifyToken, createMessage);
router.post('/:problemId/messages', verifyTokenAdmin, createMessage);
router.get('/problems/user', verifyToken, getAllUserProblemsWithMessages);
router.get('/problems', verifyTokenAdmin, getAllProblemsWithMessages);
router.post('/:problemId/close', verifyTokenAdmin, closeTicket);
router.delete('/', verifyTokenAdmin, deleteTicket);

export default router;