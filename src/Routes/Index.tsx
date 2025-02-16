import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";

const allRoutes = [
  {
    path: "/",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/register",
    name: "Register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
  },
];

export { allRoutes };
