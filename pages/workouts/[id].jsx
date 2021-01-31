import React from "react";
import withRoot from "../withRoot";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "../components/typography";
import AppAppBar from "../components/appAppBar";
import AppFooter from "../components/appFooter";
import AppForm from "../form/appForm";
import FormButton from "../form/formButton";

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

const humaniseWorkoutType = (type) => {
  const result = type.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const onClickStartButton = (e) => {
  e.preventDefault();
  console.log("HEllo");
};

const Workout = ({ workout, exercises }) => {
  const { type, duration } = workout;
  const classes = useStyles({});

  // TODO: Change AppForm element

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
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
              {humaniseWorkoutType(type)} workout. Go you!
            </Typography>
            <FormButton
              className={classes.submit}
              type="button"
              size="large"
              color="secondary"
              fullWidth
              onClick={onClickStartButton}
            >
              start
            </FormButton>
          </main>
        </React.Fragment>
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
