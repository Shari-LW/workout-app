import express from "express";
import { to } from "await-to-js";
import { createWorkout } from "../database/workout";

const router = express.Router();

router.post("/", async (req, res) => {
  const { type, duration } = req.body;
  console.log(`Type: ${type} Duration: ${duration}`);

  // TODO: Think about validation

  let [err, workout] = await to(
    createWorkout({
      type,
      duration,
    })
  );

  if (err) {
    return res
      .status(500)
      .json({ success: false, data: `Error saving workout: ${err}` });
  }

  return res.status(200).json({
    success: true,
    data: `/workouts/${workout.id}`,
  });
});

export default router;
