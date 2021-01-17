import authRoutes from "./auth.routes";
import workoutRoutes from "./workouts.routes";

function Router(app) {
  app.use(`/api/auth`, authRoutes)
  app.use(`/api/workouts`, workoutRoutes)
}

export default Router;
