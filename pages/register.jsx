import withRoot from "./withRoot";
import React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "./components/typography";
import AppAppBar from "./components/appAppBar";
import AppFooter from "./components/appFooter";
import AppForm from "./form/appForm";
import RFTextField from "./form/rFTextField";
import FormButton from "./form/formButton";
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
                    component={RFTextField}
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
                    component={RFTextField}
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
                component={RFTextField}
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
                component={RFTextField}
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

// import React from "react";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import { server } from "../utils";

// const useStyles = makeStyles((theme) => ({
//   layout: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     maxWidth: "768px",
//     margin: "0 auto",
//   },
//   paper: {
//     padding: theme.spacing(2),
//     [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
//       marginTop: theme.spacing(8),
//       padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`,
//     },
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   buttonProgress: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginTop: -12,
//     marginLeft: -12,
//   },
// }));

// const Register = () => {
//   const classes = useStyles({});
//   const [formData, setFormData] = React.useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });
//   const [submitting, setSubmitting] = React.useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { firstName, lastName, email, password } = formData;
//     const { success, data } = await server.postAsync("/auth/register", {
//       firstName,
//       lastName,
//       email,
//       password,
//     });
//     if (success) {
//       window.location.replace(data);
//       return;
//     }
//   };

//   return (
//     <main className={classes.layout}>
//       <Paper className={classes.paper} elevation={2}>
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           flexDirection="column"
//         >
//           <Typography component="h1" variant="h4" gutterBottom>
//             Register
//           </Typography>
//         </Box>
//         <form
//           method="post"
//           className={classes.form}
//           noValidate
//           onSubmit={handleSubmit}
//         >
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="firstName"
//             label="First Name"
//             name="firstName"
//             autoComplete="fname"
//             autoFocus
//             defaultValue={formData.firstName}
//             onChange={(e) =>
//               setFormData({ ...formData, firstName: e.target.value })
//             }
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="lastName"
//             label="Last Name"
//             name="lastName"
//             autoComplete="lname"
//             defaultValue={formData.lastName}
//             onChange={(e) =>
//               setFormData({ ...formData, lastName: e.target.value })
//             }
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             defaultValue={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="new-password"
//             defaultValue={formData.password}
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//           />
//           <Box mb={6}>
//             <Button
//               disabled={submitting}
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//             >
//               {submitting && (
//                 <CircularProgress
//                   size={24}
//                   className={classes.buttonProgress}
//                 />
//               )}
//               {submitting ? "Registering..." : "Register"}
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </main>
//   );
// };

// export default Register;
