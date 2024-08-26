import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return <>Loading...</>;
  if (error) return <>Error - {error?.message}</>;

  return (
    <section>
      <div>ee {data?.user?.name}</div>
      <div>
        <a href="/api/logout"> Click here to Logout</a>
      </div>
    </section>
  );
}
