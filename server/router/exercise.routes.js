import express from "express";
import { to } from "await-to-js";
import { createExercise, getExerciseByWorkoutType } from "../database/exercise";

const router = express.Router();

router.get("/:workout-type", async (req, res) => {
  const { id } = req.params;
  const [err, exercise] = await to(getExerciseByWorkoutType(type));
  res.json({ exercise });
});

export default router;
