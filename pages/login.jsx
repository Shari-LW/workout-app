import withRoot from "./withRoot";
import React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

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

const LoginForm = () => {
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
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Login
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link href="/register" align="center" underline="always">
              Register here
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
              <Field
                autoComplete="email"
                autoFocus
                component={TextField}
                disabled={submitting}
                fullWidth
                label="Email Address"
                margin="normal"
                name="email"
                id="email"
                required
                size="large"
                defaultValue={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Field
                fullWidth
                size="large"
                component={TextField}
                disabled={submitting}
                required
                name="password"
                autoComplete="current-password"
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
                {submitting ? "Signing in..." : "Sign In"}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
};

export default withRoot(LoginForm);
