import withRoot from "../withRoot";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "../components/typography";
import AppAppBar from "../components/appAppBar";
import AppFooter from "../components/appFooter";
import AppForm from "../form/appForm";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Field, Form, FormSpy } from "react-final-form";
import FormButton from "../form/formButton";
import Grid from "@material-ui/core/Grid";
import { server } from "../../utils";
import WorkoutDurationSlider from "../components/workoutDurationSlider";

const WORKOUT_TYPES = {
  UpperBody: "upperBody",
  LowerBody: "lowerBody",
  Core: "core",
};

const marks = [
  { value: 0, label: "5" },
  { value: 50, label: "10" },
  { value: 100, label: "15" },
];

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

const getDurationInSeconds = (duration) => {
  let matchedMark = marks.filter(function (mark) {
    return mark.value === duration;
  })[0];

  let durationInMinutes = parseInt(matchedMark.label);
  return durationInMinutes * 60;
};

const NewWorkoutForm = () => {
  const DEFAULT_SLIDER_VALUE = 50;
  const classes = useStyles({});
  const [formData, setFormData] = React.useState({
    type: WORKOUT_TYPES.UpperBody,
    duration: getDurationInSeconds(DEFAULT_SLIDER_VALUE),
  });
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { type, duration } = formData;
    const { success, data } = await server.postAsync("/workouts", {
      type,
      duration,
    });

    if (success) {
      window.location.replace(data);
      return;
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Create Workout
          </Typography>
          <Typography variant="body2" align="center">
            Select workout preferences below.
          </Typography>
        </React.Fragment>

        <Form onSubmit={handleSubmit}>
          {({ handleSubmit2, submitting }) => (
            <form
              method="post"
              className={classes.form}
              onSubmit={handleSubmit}
              noValidate
            >
              <Typography>Type:</Typography>
              <FormControl variant="outlined" className={classes.formControl}>
                {/* <InputLabel></InputLabel> */}

                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  displayEmpty
                  className={classes.selectEmpty}
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  name="type"
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value={WORKOUT_TYPES.UpperBody}>
                    Upper Body
                  </MenuItem>
                  <MenuItem value={WORKOUT_TYPES.LowerBody}>
                    Lower Body
                  </MenuItem>
                  <MenuItem value={WORKOUT_TYPES.Core}>Core</MenuItem>
                </Select>
              </FormControl>
              <div>
                &nbsp; <br />{" "}
              </div>
              <Typography>Duration (minutes):</Typography>
              <div>
                &nbsp; <br />{" "}
              </div>
              <WorkoutDurationSlider
                classes={classes}
                name="duration"
                defaultValue={DEFAULT_SLIDER_VALUE}
                marks={marks}
                onChange={(e, v) =>
                  setFormData({
                    ...formData,
                    duration: getDurationInSeconds(v),
                  })
                }
              />
              <div>
                &nbsp; <br />{" "}
              </div>
              <FormButton
                className={classes.submit}
                disabled={submitting}
                type="submit"
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
                {submitting ? "Creating workout..." : "Create"}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
};

export default withRoot(NewWorkoutForm);
