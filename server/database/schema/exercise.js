// HOMEWORK: create a schema for the exercise database model

import { model, Schema } from "mongoose";

const ExerciseSchema = new Schema({
  name: String,
  teachingPoints: String,
});

const ExerciseModel = model("Exercise", ExerciseSchema);

export { ExerciseModel };
