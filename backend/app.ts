import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { expensesRoutes } from "./routes/expensesRoute";
import { serveStatic } from "hono/bun";
import { authRoute } from "./routes/authRoute";

const app = new Hono();

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: (origin) => {
      const allowedOrigins = [
        "https://expensetracker.nishok.my",
        "http://localhost:5173",
      ];
      return allowedOrigins.includes(origin) ? origin : "";
    }, // allow this frontend domain
    credentials: true, // if you're using cookies/auth headers
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.basePath("/api").route("/expenses", expensesRoutes).route("/", authRoute);

// app.get("*", serveStatic({ root: "./frontend/dist" }));
// app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
