import { type QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <NavBar />
    </>
  ),
});

const NavBar = () => {
  return (
    <section className="mx-20">
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold flex-1">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold px-4">
          About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold px-4">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold px-4">
          Create
        </Link>
        <Link to="/profile" className="[&.active]:font-bold px-4">
          Profile
        </Link>
      </div>
      <div className="mt-10">
        <Outlet />
      </div>
    </section>
  );
};
