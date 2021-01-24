import { WorkoutModel } from "../schema";

async function createWorkout({ type, duration }) {
  return new Promise(async (resolve, reject) => {
    return resolve(
      await WorkoutModel.create({
        type,
        duration,
      })
    );
  });
}

export { createWorkout };
