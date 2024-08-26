import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";
import { db } from "../db";
import {
  expenses as expensesTable,
  insertExpenseSchema,
} from "../db/schema/expensesSchema";
import { and, desc, eq, sum } from "drizzle-orm";

const createExpenseSchema = insertExpenseSchema.omit({
  userId: true,
  // createdAt: true,
});

// type Expense = z.infer<typeof createExpenseSchema>;

export const expensesRoutes = new Hono()
  .get("/total-spent", getUser, async (c) => {
    const user = c.var.user;
    const total = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .limit(1)
      .then((res) => res[0]);
    return c.json(total);
  })
  .get("/:id", getUser, async (c) => {
    const user = c.var.user;
    const expense = await db
      .select()
      .from(expensesTable)
      .where(
        and(
          eq(expensesTable.userId, user.id),
          eq(expensesTable.id, Number.parseInt(c.req.param("id")))
        )
      )
      .then((res) => res[0]);
    if (!expense) return c.notFound();
    return c.json({ expense });
  })
  .get("/", getUser, async (c) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      // .orderBy(desc(expensesTable.createdAt))
      .limit(10);
    return c.json({ expenses });
  })
  .post("/", getUser, zValidator("json", createExpenseSchema), async (c) => {
    const expense = await c.req.valid("json");
    const user = c.var.user;
    console.log("poosttinggg .. ", c.req.valid("json"));
    const validatedExpense = insertExpenseSchema.parse({
      ...expense,
      date: expense.date.toString(),
      userId: user.id,
    });

    const result = await db
      .insert(expensesTable)
      .values(validatedExpense)
      .returning()
      .then((res) => res[0]);
    c.status(201);
    return c.json(result);
  })
  .delete("/:id", getUser, async (c) => {
    const user = c.var.user;
    const expense = await db
      .delete(expensesTable)
      .where(
        and(
          eq(expensesTable.userId, user.id),
          eq(expensesTable.id, Number.parseInt(c.req.param("id")))
        )
      )
      .returning()
      .then((res) => res[0]);
    if (!expense) return c.notFound();
    return c.json({ expense });
  });
