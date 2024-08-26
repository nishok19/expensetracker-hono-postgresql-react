import Login from "@/components/user_components/Login";
import { userQueryOptions } from "@/lib/api";
import { Outlet, createFileRoute } from "@tanstack/react-router";

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }

  return <Outlet />;
};

// src/routes/_authenticated.tsx
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { queryClient } = context;
    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch (e) {
      console.log("Error in _authenticated ", e);
      return { user: null };
    }
  },
  component: Component,
});
