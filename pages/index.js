import Link from 'next/link'
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

export default function Home() {
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
    }
  }));

  const classes = useStyles({});

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper} elevation={2}>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <Link href="/workouts/new">
            <a>Create Workout</a>
          </Link>
        </Box>
      </Paper>
    </main>
  )
}
