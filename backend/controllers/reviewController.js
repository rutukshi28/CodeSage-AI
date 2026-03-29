import { analyzeCode, predictOutputAI } from "../services/aiService.js";
import axios from "axios";

export const reviewCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({
        error: "Code is required",
      });
    }

    const result = await analyzeCode(code, language);

    res.json(result);

    console.log("LANGUAGE RECEIVED:", req.body.language);
console.log("CODE RECEIVED:", req.body.code);

  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const runCode = async (req, res) => {

  console.log("RUN API HIT");

  try {
    const { code, language } = req.body;

    const result = await predictOutputAI(code, language);

    res.json(result);
  } catch (error) {
    console.log("❌ RUN ERROR:", error);
    res.status(500).json({ error: "Prediction failed" });
  }
};


