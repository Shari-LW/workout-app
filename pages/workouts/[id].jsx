import React, { useState, useEffect } from "react";
import withRoot from "../withRoot";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../components/typography";
import AppAppBar from "../components/appAppBar";
import AppFooter from "../components/appFooter";
import AppForm from "../form/appForm";
import FormButton from "../form/formButton";
import Image from "next/image";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Grid from "@material-ui/core/Grid";

import { set } from "mongoose";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 450,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
}));

const humaniseString = (str) => {
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const WelcomeMessage = ({ type, duration, classes, children }) => {
  return (
    <main>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Let's do it!
      </Typography>

      <Typography variant="body2" align="center">
        You have selected a <strong>{duration / 60} </strong> minute{" "}
        <strong>{humaniseString(type)} </strong>workout.
      </Typography>
      <div>
        &nbsp; <br />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={`/type/${type}.png`}
          alt="me"
          width="175"
          height="175"
          style={{ alignSelf: "center" }}
        />
      </div>
      <div>
        &nbsp; <br />
      </div>
      <Typography variant="body2" align="center">
        <h5>Make sure to warm-up before starting.</h5>
      </Typography>

      {children}
    </main>
  );
};

const exerciseDuration = 45;

const ExerciseTimer = () => (
  <CountdownCircleTimer
    width="100"
    height="100"
    onComplete={() => {
      // do your stuff here
      // return [RestTimer]();
      return [true, 1000]; // repeat animation in 1.5 seconds
    }}
    isPlaying
    duration={exerciseDuration}
    colors="#00c5cd"
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
);

const RestTimer = () => (
  <CountdownCircleTimer
    width="100"
    height="100"
    onComplete={() => {
      // do your stuff here
      // return [true, 1500]; // repeat animation in 1.5 seconds
    }}
    isPlaying
    duration={15}
    colors="#fc46aa"
  >
    <h3>Rest</h3>
  </CountdownCircleTimer>
);

const Exercise = ({ exercise, children }) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item timer>
          {" "}
          <ExerciseTimer />{" "}
        </Grid>
        <Grid item image={12} sm container>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={`/exercises/${exercise.name}.png`}
              alt="me"
              width="350"
              height="350"
              style={{ alignSelf: "center" }}
            />
          </div>
        </Grid>
        <Grid item text>
          <h2>{humaniseString(exercise.name)}</h2>
          <ul>
            {exercise.teachingPoints.map((tp) => (
              <li>{tp}</li>
            ))}
          </ul>
          <div>
            &nbsp; <br />{" "}
          </div>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

const Workout = ({ workout, exercises }) => {
  const { type, duration } = workout;
  const classes = useStyles({});
  const [playerStatus, setPlayerStatus] = React.useState("stopped");
  const [currentExerciseIndex, setCurrentExerciseIndex] = React.useState(0);
  const [timer, setTimer] = React.useState(null);

  React.useEffect(() => {
    console.log("useEffect", currentExerciseIndex);
    const timeOut = exerciseDuration * 1000;
    if (
      currentExerciseIndex > 0 &&
      currentExerciseIndex + 1 < exercises.length
    ) {
      setTimer(setInterval(() => showNextExercise(), timeOut));
    } else if (currentExerciseIndex + 1 >= exercises.length)
      return () => clearInterval(timer);
  }, [currentExerciseIndex]);

  const onClickStartButton = (e) => {
    setPlayerStatus("playing");
    // setInterval(() => showNextExercise(), 2000);
    showNextExercise();
  };

  const showNextExercise = () => {
    // console.log("Before", currentExerciseIndex);
    setCurrentExerciseIndex(currentExerciseIndex + 1);
    // console.log("After", currentExerciseIndex);
    // setInterval(() => showNextExercise(), 2000);
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        {playerStatus === "stopped" ? (
          <WelcomeMessage classes={classes} duration={duration} type={type}>
            <FormButton
              className={classes.submit}
              type="button"
              size="large"
              color="secondary"
              fullWidth
              onClick={onClickStartButton}
            >
              Start
            </FormButton>
          </WelcomeMessage>
        ) : (
          <main>
            <Exercise exercise={exercises[currentExerciseIndex]}>
              {currentExerciseIndex === exercises.length - 1 || (
                <FormButton
                  type="button"
                  size="large"
                  color="secondary"
                  fullWidth
                  onClick={showNextExercise}
                >
                  Next
                </FormButton>
              )}
            </Exercise>
          </main>
        )}
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const response = await fetch(
    `http://localhost:3000/api/workouts/${params.id}`
  );
  const workoutData = await response.json();

  const res = await fetch(
    `http://localhost:3000/api/exercises/${workoutData.workout.type}`
  );
  const exerciseData = await res.json();

  // TODO: understand better how to display nice message to user if workout isn't found
  // TODO: render a 404 response, the code below isnt working

  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      workout: workoutData.workout,
      exercises: exerciseData.exercises,
    },
  };
}

export default withRoot(Workout);
