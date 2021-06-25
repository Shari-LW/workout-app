import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Typography from "./AppTypography";
import TextField from "./TextField";

function Copyright() {
  return (
    <React.Fragment>
      {"© "}
      <Link color="inherit" href="https://material-ui.com/">
        Fit Avenue
      </Link>{" "}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.primary.main,
  },
  container: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(4),
    display: "flex",
  },
  iconsWrapper: {
    height: 80,
  },
  icons: {
    display: "flex",
  },
  // icon: {
  //   width: 48,
  //   height: 48,
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: theme.palette.warning.main,
  //   marginRight: theme.spacing(1),
  //   "&:hover": {
  //     backgroundColor: theme.palette.warning.dark,
  //   },
  // },
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
