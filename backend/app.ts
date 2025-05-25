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
  "*",
  cors({
    origin: ["https://expensetracker.nishok.my/", "http://localhost:5173/"], // allow this frontend domain
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // if you're using cookies/auth headers
  })
);

app.basePath("/api").route("/expenses", expensesRoutes).route("/", authRoute);

// app.get("*", serveStatic({ root: "./frontend/dist" }));
// app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
