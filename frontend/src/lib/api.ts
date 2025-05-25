import { queryOptions } from "@tanstack/react-query";

export const URL =
  "https://expensetracker-hono-postgresql-react-production.up.railway.app/";
const getUserProfile = async () => {
  // TODO - Put all API calls in a seperate place
  try {
    const res = await fetch(URL + "/api/me");
    if (!res.ok) throw new Error("Error while getting the /me");
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("Error while getting the /me ", e);
  }
};

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getUserProfile,
  staleTime: Infinity,
});

export const getAllExpenses = async () => {
  // TODO - Put all API calls in a seperate place
  const res = await fetch(URL + "/api/expenses");
  if (!res.ok) throw new Error("Error while getting the /total-spent");
  const data = await res.json();
  console.log("expensess...", data);
  return data;
};

export const getAllExpensesQueryOption = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
});
