import { model, Schema } from "mongoose";

const WorkoutSchema = new Schema({
  type: String,
  duration: Number,
});

const WorkoutModel = model("Workout", WorkoutSchema);

export { WorkoutModel };
