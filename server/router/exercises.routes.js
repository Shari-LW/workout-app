import express from "express";
import { to } from "await-to-js";
import { createExercise, getExerciseByWorkoutType } from "../database/exercise";

const router = express.Router();

router.get("/:workoutType", async (req, res) => {
  const { workoutType } = req.params;
  const [err, exercises] = await to(getExerciseByWorkoutType(workoutType));
  res.json({ exercises });
});

export default router;
