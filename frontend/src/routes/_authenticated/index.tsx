import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import BarChart from "@/components/user_components/Bar_Chart";
import { URL } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

const getTotalExpenses = async () => {
  // TODO - Put all API calls in a seperate place
  const res = await fetch(URL + "/api/expenses/total-spent", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error while getting the /total-spent");
  const data = await res.json();
  return data;
};

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalExpenses,
  });

  if (error) return <div>Error has occurred !!! {error.message}</div>;

  return (
    <section>
      <Card className="m-auto w-full ">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you have spent</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{isPending ? "Loading..." : data.total}</p>
          <BarChart />
        </CardContent>
      </Card>
    </section>
  );
}
