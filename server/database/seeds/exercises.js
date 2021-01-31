import { ExerciseModel } from '../schema'
import mongoose from 'mongoose'
import exerciseSeeds from './data/exercises'

const { Types } = mongoose

mongoose.connect("mongodb://localhost:27017/workouts?authSource=admin&w=1", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

ExerciseModel.insertMany(exerciseSeeds, function(err, exercises) {
  if (err) {
    console.error(`Failed to seed Exercises: ${err}`);
    return;
  }

  console.log(`Seeded exercises: ${exercises}`);
});