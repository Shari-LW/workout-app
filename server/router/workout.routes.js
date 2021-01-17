import express from "express";
import { to } from "await-to-js";

const router = express.Router();

router.post("/workouts", async (req, res) => {
  const { type, duration } = req.body;

  console.log(`Type: ${type} Duration: ${duration}`);
});

export default router;
