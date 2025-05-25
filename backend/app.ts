import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { expensesRoutes } from "./routes/expensesRoute";
import { serveStatic } from "hono/bun";
import { authRoute } from "./routes/authRoute";

const app = new Hono();

app.use("*", logger());
app.use("/api/*", cors());

app.use(
  "/api/*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://expensetracker-hono-postgresql-react-production.up.railway.app/",
    ],
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);

app.basePath("/api").route("/expenses", expensesRoutes).route("/", authRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
