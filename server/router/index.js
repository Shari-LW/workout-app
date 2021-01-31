import authRoutes from "./auth.routes";
import workoutRoutes from "./workouts.routes";
import exerciseRoutes from "./exercises.routes";

function Router(app) {
  app.use(`/api/auth`, authRoutes);
  app.use(`/api/workouts`, workoutRoutes);
  app.use(`/api/exercises`, exerciseRoutes);
}

export default Router;
