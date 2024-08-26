import {
  date,
  index,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id"),
    title: text("title"),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    date: date("date", { mode: "string" }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (expenses) => {
    return {
      userIdIndex: index("name_idx").on(expenses.userId),
    };
  }
);

export const insertExpenseSchema = createInsertSchema(expenses);
// Schema for selecting a user - can be used to validate API responses
export const selectExpenseSchema = createSelectSchema(expenses);
