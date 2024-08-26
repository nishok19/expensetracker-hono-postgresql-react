import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoutes } from "./routes/expensesRoute";
import { serveStatic } from "hono/bun";
import { authRoute } from "./routes/authRoute";

const app = new Hono();

app.use("*", logger());

app.basePath("/api").route("/expenses", expensesRoutes).route("/", authRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
