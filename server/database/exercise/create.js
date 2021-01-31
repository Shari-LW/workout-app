import { ExerciseModel } from "../schema";

async function createExercise({ name, teachingPoints }) {
  return new Promise(async (resolve, reject) => {
    return resolve(
      await ExerciseModel.create({
        name,
        teachingPoints,
      })
    );
  });
}

export { createExercise };
