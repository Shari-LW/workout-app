import React from "react";

// TODO: delete this once we hook up to the database!!

const Workout = ({ workout, exercises }) => {
  const { type, duration } = workout;

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

// TODO: convert this from two API call's to one

export async function getServerSideProps(context) {
  const { params } = context;
  const response = await fetch(
    `http://localhost:3000/api/workouts/${params.id}`
  );
  const workoutData = await response.json();

  // export async function getExerciseByWorkoutType(context) {
  //     const { params } = context;
  const res = await fetch(
    `http://localhost:3000/api/exercises/${workoutData.workout.type}`
  );
  const exerciseData = await res.json();

  // HOMEWORK: Use data.workout.type to make another request to http://localhost:3000/api/exercises/${workout.type}
  // returning the exersices for the current workout type. Then pass exercises to props below on line 40!

  // TODO: understand better how to display nice message to user if workout isn't found
  // // TODO: render a 404 response, the code below isnt working

  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: { workout: workoutData.workout, exercises: exerciseData.exercises },
  };
}

export default Workout;
