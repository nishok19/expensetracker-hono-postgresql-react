import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Expense } from "@/lib/expenseType";
import { getAllExpensesQueryOption } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

function Expenses() {
  const { isPending, error, data } = useQuery(getAllExpensesQueryOption);

  if (isPending) return <div>Loading...</div>;
  if (error) return <>Error {error.message}</>;

  return (
    <section className="w-screen flex justify-center">
      <Table className="w-[60%] mx-auto">
        <TableCaption>A list of your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="">Amount</TableHead>
            <TableHead className="">Date Spent</TableHead>
          </TableRow>
        </TableHeader>
        {/* {isPending ? (
          <TableBody>"Loading..."</TableBody>
        ) : ( */}
        <TableBody>
          {data?.expenses?.map((exp: Expense) => (
            <TableRow key={exp?.id}>
              <TableCell className="font-medium">{exp?.id}</TableCell>
              <TableCell>{exp?.title}</TableCell>
              <TableCell>{exp?.type?.toUpperCase()}</TableCell>
              <TableCell className="">{exp?.amount}</TableCell>
              <TableCell className="">
                {new Date(exp?.date).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* // )} */}
      </Table>
    </section>
  );
}
