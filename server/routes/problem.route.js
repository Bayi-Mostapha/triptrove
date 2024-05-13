import express from "express";
import
{   
    createProblemReport,
    createMessage,
    getAllProblemsWithMessages,
    closeTicket,
}
from "../controllers/problem.controller.js";
import { verifyToken  } from "../controllers/verifytoken.js";

  
const router = express.Router();

router.post('/create', createProblemReport);
router.post('/:problemId/messages', createMessage);
router.get('/problems', getAllProblemsWithMessages);
router.post('/:problemId/close', closeTicket);

export default router;