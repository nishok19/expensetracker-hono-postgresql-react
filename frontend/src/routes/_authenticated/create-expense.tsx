import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { getAllExpensesQueryOption } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date().toLocaleString(),
    },
    onSubmit: async ({ value }) => {
      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOption
      );

      // TODO - Put all API calls in a seperate place
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      if (!res.ok) throw new Error("Error while posting the /");
      const newExpense = await res.json();
      queryClient.setQueryData(getAllExpensesQueryOption.queryKey, {
        ...existingExpenses,
        expenses: [newExpense, ...existingExpenses.expenses],
      });
      navigate({ to: "/expenses" });
    },
  });

  return (
    <section className="p-2">
      <h2 className="text-center">Create Expense</h2>
      <form
        className="max-w-xl m-auto mt-10"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          validators={{
            onChange: z
              .string()
              .min(2, { message: "Title must be atleast 2 characters long" })
              .max(50, { message: "Title cannot exceed 50 characters" }),
          }}
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="amount"
          validators={{
            onChange: ({ value }) => {
              return Number.parseInt(value) < 0
                ? "Amount cannot be negative"
                : null;
            },
          }}
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="number"
              />
            </>
          )}
        />
        <form.Field
          name="date"
          validators={{
            onChange: z.string(),
          }}
          children={(field) => (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      new Date(new Date(field.state.value).toLocaleString())
                    }
                    onSelect={(date) => {
                      console.log("dataee", date);
                      setDate(date ?? new Date());
                      return field.handleChange(
                        (date ?? new Date()).toLocaleString()
                      );
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="mt-4">
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        />
      </form>
    </section>
  );
}
