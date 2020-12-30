import React from "react";
import { server } from "../utils";

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
          Workouts
        </Typography>
      </Box>
    </Paper>
  </main>
);

// const Workouts = () => {};

/*
<form
method="post"
className={classes.form}
noValidate
onSubmit={handleSubmit}
>
*/

/*let [err, workout] = await to(
  createWorkout({
    type,
    duration,
  })
); */

/*router.post("/workouts", async (req, res) => {
    const { type, duration} = req.body; } */

export default Workouts;

// Box then update to slider later
//Validation ideas?
