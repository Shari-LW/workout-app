import React from "react";

// TODO: delete this once we hook up to the database!!
import EXERCISES from "../../data/exercises";

const Workout = ({ data }) => {
  const { workout } = data;
  const { type, duration } = workout;
  const exercises = EXERCISES[workout.type];

  return (
    <main>
      <div>
        <h2>
          This workout is of type {type} and duration {duration}
        </h2>
        <ul>
          The workout's exercises are:
          {exercises.map((exercise) => (
            <li>{exercise.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const res = await fetch(`http://localhost:3000/api/workouts/${params.id}`);
  const data = await res.json();

  // export async function getExerciseByWorkoutType(context) {
  //     const { params } = context;
  //     const res = await fetch(`http://localhost:3000/api/exercises/${workout.type}`);
  //     const data = await res.json();

  // HOMEWORK: Use data.workout.type to make another request to http://localhost:3000/api/exercises/${workout.type}
  // returning the exersices for the current workout type. Then pass exercises to props below on line 40!

  // TODO: understand better how to display nice message to user if workout isn't found
  // TODO: render a 404 response, the code below isnt working
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}

export default Workout;
