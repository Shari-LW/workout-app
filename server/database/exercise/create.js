import { ExerciseModel } from "../schema";

async function createExercise({ name, teachingPoints, workoutType }) {
  return new Promise(async (resolve, reject) => {
    return resolve(
      await ExerciseModel.create({
        name,
        teachingPoints,
        workoutType,
      })
    );
  });
}

export { createExercise };
