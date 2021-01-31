import { ExerciseModel } from "../schema";

async function getExerciseByWorkoutType(type) {
  return await ExerciseModel.find({ workoutType: type }).exec();
}

export { getExerciseByWorkoutType };
