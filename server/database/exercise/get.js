import { ExerciseModel } from "../schema";

async function getExerciseByWorkoutType(type) {
  return await ExerciseModel.findByWorkoutType(type).exec();
}

export { getExerciseByWorkoutType };
