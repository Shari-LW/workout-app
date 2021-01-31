import React from "react";
import withRoot from "../withRoot";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "../components/typography";
import AppAppBar from "../components/appAppBar";
import AppFooter from "../components/appFooter";
import AppForm from "../form/appForm";
import FormButton from "../form/formButton";

import Image from 'next/image'

import { set } from "mongoose";

// TODO: delete this once we hook up to the database!!
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
}));

const humaniseString = (str) => {
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};


const WelcomeMessage = ({ type, duration, classes, children }) => {
  return (
    <main>
      <Typography
      variant="h3"
      gutterBottom
      marked="center"
      align="center"
    >
      Let's do it!
    </Typography>
    <Typography variant="body2" align="center">
      You have selected a {duration / 60} minute{" "}
      {humaniseString(type)} workout. Go you!
    </Typography>
    {children}
  </main>
  )
}

const Exercise = ({ exercise, children }) => {
  return (
    <div>
      {/* <Image src={`exercises/${exercise.name}.jpg`} alt="me" width="64" height="64" /> */}
      {/* <Image src={exercise.imageUrl} alt="me" width="64" height="64" /> */}
      <h2>{humaniseString(exercise.name)}</h2>
      <ul>
        {exercise.teachingPoints.map((tp) => <li>{tp}</li>)}
      </ul>
      {children}
    </div>
  )
}

const Workout = ({ workout, exercises }) => {
  const { type, duration } = workout;
  const classes = useStyles({});
  const [playerStatus, setPlayerStatus] = React.useState("stopped");
  const [currentExerciseIndex, setCurrentExerciseIndex] = React.useState(0)

  const onClickStartButton = (e) => {
    setPlayerStatus("playing");
  };

  const showNextExercise = () => {
    setCurrentExerciseIndex(currentExerciseIndex + 1)
  };

  // TODO: Change AppForm element

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        {
          playerStatus === "stopped" ? (
            <WelcomeMessage classes={classes} duration={duration} type={type}>
              <FormButton className={classes.submit} type="button" size="large" color="secondary" fullWidth onClick={onClickStartButton}>
                Start
              </FormButton>
            </WelcomeMessage>
          ) : (
            <main>
              <Exercise exercise={exercises[currentExerciseIndex]}>
                <FormButton type="button" size="large" color="secondary" fullWidth onClick={showNextExercise}>Next</FormButton>
              </Exercise>
            </main>
          )
        }
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
};

// TODO: convert this from two API call's to one

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
