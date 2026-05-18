import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layout/index.tsx", [
    index("./routes/home.tsx"),
    route("dashboard", "./routes/dashboard.tsx"),
    route("exercises", "./routes/exercises.tsx"),
    route("exercise", "./routes/exercise.tsx"),
    route("login", "./routes/login.tsx"),
  ]),
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;
