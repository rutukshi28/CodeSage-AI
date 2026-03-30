import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

app.use(
  cors({
    origin: "code-sage-ai-rose.vercel.app",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running");
});

app.use("/api/review", reviewRoutes);

export default app;