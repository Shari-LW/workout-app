import { WorkoutModel } from "../schema";

async function getWorkoutById(id) {
  return await WorkoutModel.findById(id).exec();
}

export { getWorkoutById };
