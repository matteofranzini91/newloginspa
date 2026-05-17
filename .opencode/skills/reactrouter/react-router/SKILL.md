# React Router Skill

## Overview

React Router is a multi-strategy router for React bridging the gap from React 18 to React 19. It can be used as a full React framework or minimally as needed.

There are three primary modes to use React Router:
- **Framework Mode**: Full framework with data loading, actions, and SSR support
- **Data Mode**: Data loading without full framework
- **Declarative Mode**: Traditional component-based routing (like v6)

**Official documentation**: https://reactrouter.com/

## Installation

```bash
npx create-react-router@latest my-app
```

Or add to existing project:

```bash
npm install react-router
```

## Routing Configuration

### Basic Route Configuration (Framework Mode)

Routes are configured in `app/routes.ts`:

```typescript
import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./home.tsx"),
  route("about", "./about.tsx"),

  layout("./auth/layout.tsx", [
    route("login", "./auth/login.tsx"),
    route("register", "./auth/register.tsx"),
  ]),

  ...prefix("products", [
    index("./products/home.tsx"),
    route(":id", "./products/product.tsx"),
  ]),
] satisfies RouteConfig;
```

### Nested Routes

Routes can be nested inside parent routes:

```typescript
export default [
  route("dashboard", "./dashboard.tsx", [
    index("./dashboard-home.tsx"),
    route("settings", "./dashboard-settings.tsx"),
  ]),
] satisfies RouteConfig;
```

Child routes render through `<Outlet />` in the parent.

### Dynamic Segments

```typescript
route("teams/:teamId", "./team.tsx"),
```

Access in component:
```typescript
const { teamId } = useParams();
```

### Optional Segments

```typescript
route(":lang?/categories", "./categories.tsx"),
route("users/:userId/edit?", "./user.tsx")
```

### Splats (Catch-all)

```typescript
route("files/*", "./files.tsx"),
```

Access: `params["*"]` or destructure `{ "*": splat }`

## Route Modules

Each route file defines behavior:

```typescript
import type { Route } from "./+types/team";

export async function loader({ params }: Route.LoaderArgs) {
  const team = await fetchTeam(params.teamId);
  return { name: team.name };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  // handle form submission
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return <h1>{loaderData.name}</h1>;
}
```

## Core Components

### Link

Navigation component with client-side routing:

```typescript
import { Link } from "react-router";

<Link to="/dashboard">Dashboard</Link>;

<Link
  to={{
    pathname: "/some/path",
    search: "?query=string",
    hash: "#hash",
  }}
/>

<Link to="/details" state={{ from: "list" }} />

<Link to="/modal" preventScrollReset />
```

**Props**:
- `to`: string or Path object
- `replace`: Replace history entry
- `state`: Persistent state
- `preventScrollReset`: Don't reset scroll
- `prefetch`: "none" | "intent" | "render" | "viewport"
- `viewTransition`: Enable view transitions

### NavLink

Like Link but adds `active` class when matched:

```typescript
import { NavLink } from "react-router";

<NavLink
  to="/messages"
  className={({ isActive }) => isActive ? "active" : ""}
>
  Messages
</NavLink>
```

### Outlet

Renders child routes:

```typescript
import { Outlet } from "react-router";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}
```

### Navigate

Programmatic navigation component:

```typescript
import { Navigate } from "react-router";

function ProtectedRoute({ isLoggedIn }) {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
```

### Routes

Declarative route definitions (Declarative Mode):

```typescript
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/users/:id" element={<User />} />
    </Routes>
  );
}
```

### Form

Progressive enhancement form:

```typescript
import { Form } from "react-router";

<Form method="post" action="/login">
  <input name="email" type="email" />
  <input name="password" type="password" />
  <button type="submit">Login</button>
</Form>
```

## Core Hooks

### useNavigate

Programmatic navigation:

```typescript
import { useNavigate } from "react-router";

function MyComponent() {
  const navigate = useNavigate();

  navigate("/dashboard");
  navigate("/details?id=1");
  navigate(-1); // back
  navigate(1);  // forward
  navigate("/new-location", { replace: true });
}
```

### useParams

Access URL parameters:

```typescript
const { id, slug } = useParams();
```

### useSearchParams

Read and modify URL search params:

```typescript
const [searchParams, setSearchParams] = useSearchParams();

const query = searchParams.get("query");
const page = searchParams.get("page") || "1";

function updateFilter(value: string) {
  setSearchParams({ filter: value });
}
```

### useLocation

Access current location:

```typescript
const location = useLocation();

location.pathname
location.search
location.state // from Link
location.hash
```

### useLoaderData

Access data from loader:

```typescript
const { user, items } = useLoaderData();
```

### useActionData

Access data from action:

```typescript
const errors = useActionData();
```

### useNavigation

Access navigation state:

```typescript
const navigation = useNavigation();

navigation.state // "idle" | "loading" | "submitting"
navigation.location
navigation.formMethod
navigation.formData
```

### useFetcher

Background data fetching without navigation:

```typescript
const fetcher = useFetcher();

fetcher.load("/api/data");
fetcher.submit(formData, { method: "post" });

fetcher.data
fetcher.state // "idle" | "loading" | "submitting"
```

### useRevalidator

Re-run loaders:

```typescript
import { useRevalidator } from "react-router";

function RefreshButton() {
  const revalidator = useRevalidator();

  return (
    <button onClick={() => revalidator.revalidate()}>
      Refresh Data
    </button>
  );
}
```

### useRouteError

Access error boundary errors:

```typescript
import { useRouteError } from "react-router";

function ErrorBoundary() {
  const error = useRouteError();
  // error is Error | Response | unknown
}
```

## Data Routers

### createBrowserRouter

```typescript
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
]);

// Then render:
<RouterProvider router={router} />
```

### createHashRouter

For environments without server configuration:

```typescript
import { createHashRouter } from "react-router";

const router = createHashRouter([...]);
```

## Utilities

### redirect

```typescript
import { redirect } from "react-router";

export async function loader({ request }) {
  const user = await getUser(request);
  if (!user) return redirect("/login");
  return { user };
}
```

### generatePath

Pattern-based URL generation:

```typescript
import { generatePath } from "react-router";

generatePath("/users/:id", { id: "123" }); // "/users/123"
generatePath("/posts/:slug/edit", { slug: "my-post" }); // "/posts/my-post/edit"
```

### matchPath / matchRoutes

```typescript
import { matchPath, matchRoutes } from "react-router";

const match = matchPath("/users/:id", "/users/123");
// match.params.id === "123"

const routes = matchRoutes(routes, "/users/123");
```

### createCookie / createCookieSessionStorage

```typescript
import { createCookie } from "react-router";

const cookie = createCookie("session", {
  secrets: ["s3cr3t"],
  maxAge: 604800,
  httpOnly: true,
});
```

## Error Handling

### Error Boundary

```typescript
export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  );
}
```

### route functions

- `loader`: Server-side data loading
- `action`: Server-side form handling
- `headers`: HTTP headers
- `shouldRevalidate`: Cache control
- `ErrorBoundary`: Error handling

## Best Practices

### File Structure

```
app/
  routes.ts
  root.tsx
  routes/
    home.tsx
    about.tsx
    dashboard.tsx
    products.$id.tsx
```

### TypeScript

Route modules provide type inference:

```typescript
import type { Route } from "./+types/product";

export async function loader({ params }: Route.LoaderArgs) {
  // params is typed
}
```

### Prefetching

```typescript
<Link to="/details" prefetch="intent" />
```

### Pending UI

```typescript
function App() {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== "idle";

  return (
    <div>
      {isNavigating && <LoadingBar />}
      <Outlet />
    </div>
  );
}
```

## Common Errors

1. **Forgetting Outlet**: Child routes need `<Outlet />` in parent
2. **Missing RouterProvider**: Need to wrap app with router provider
3. **Wrong param names**: Ensure params match route segments (`/:id` → `params.id`)
4. **Async without await**: Loaders and actions must be async or return promises
5. **Form without action**: Forms need action defined or action attribute