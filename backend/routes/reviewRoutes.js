import express from "express";
import { reviewCode, runCode } from "../controllers/reviewController.js";


const router = express.Router();

// POST route
router.post("/", reviewCode);

router.post("/run", runCode);

export default router;