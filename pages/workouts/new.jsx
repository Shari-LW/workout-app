import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { server } from "../../utils";
import WorkoutDurationSlider from "../components/workoutDurationSlider";

const useStyles = makeStyles((theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`,
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const NewWorkoutForm = () => {
  const classes = useStyles({});
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const { success, data } = await server.postAsync("/auth/login", {
      email,
      password,
    });

    if (success) {
      window.location.replace(data);
      return;
    }
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper} elevation={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Create Workout
          </Typography>
          <Typography component="p" gutterBottom>
            Select workout preferences
          </Typography>
        </Box>
        <form
          method="post"
          className={classes.form}
          onSubmit={handleSubmit}
          noValidate
        >
          <Typography id="Type">Type</Typography>
          <TextField margin="normal" fullWidth id="select" value="20" select>
            <MenuItem value="1">Upper Body</MenuItem>
            <MenuItem value="2">Lower Body</MenuItem>
            <MenuItem value="3">Full Body</MenuItem>
            <MenuItem value="4">Core</MenuItem>
          </TextField>

          {/* // Add slider  */}
          <WorkoutDurationSlider />

          <Box mb={6}>
            <Button
              disabled={submitting}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {submitting && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
              {submitting ? "Creating workout..." : "Create"}
            </Button>
          </Box>
        </form>
      </Paper>
    </main>
  );
};

export default NewWorkoutForm;
