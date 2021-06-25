import withRoot from "./withRoot";
import React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "./components/AppTypography";
import AppAppBar from "./components/AppAppBar";
import AppFooter from "./components/AppFooter";
import AppForm from "./form/AppForm";
import TextField from "./components/TextField";
import FormButton from "./form/FormButton";
import FormFeedback from "./form/FormFeedback";
import { server } from "../utils";

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
}));

const Register = () => {
  const classes = useStyles({});
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;
    const { success, data } = await server.postAsync("/auth/register", {
      firstName,
      lastName,
      email,
      password,
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
            Register
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/login" align="center" underline="always">
              Already have an account?
            </Link>
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={TextField}
                    autoComplete="fname"
                    fullWidth
                    label="First Name"
                    name="firstName"
                    id="firstName"
                    required
                    defaultValue={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    autoComplete="lname"
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    id="lastName"
                    required
                    defaultValue={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={TextField}
                disabled={submitting}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                id="email"
                required
                defaultValue={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Field
                fullWidth
                component={TextField}
                disabled={submitting}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                type="password"
                id="password"
                margin="normal"
                defaultValue={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback className={classes.feedback} error>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
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
                {submitting ? "Registering.." : "Register"}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
};

export default withRoot(Register);
