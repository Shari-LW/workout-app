import { ExerciseModel } from '../schema'
import mongoose from 'mongoose'
import seeds from './data/exercises'

const { Types } = mongoose

mongoose.connect("mongodb://localhost:27017/workouts?authSource=admin&w=1", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


ExerciseModel.insertMany(seeds, function(err, docs) {
  if (err) {
    console.error(`Failed to seed Exercises: ${err}`);
    return;
  }

  console.log(`Seeded exercises: ${docs}`);
});