import authRoutes from "./auth.routes";
import workoutRoutes from "./workouts.routes";

function Router(app) {
  app.use(`${process.env.BASE_API_URL}/auth`, authRoutes);
  app.use(`${process.env.BASE_API_URL}/workouts`, workoutRoutes);
}

export default Router;
