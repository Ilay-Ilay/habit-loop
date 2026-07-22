import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorRoute from "../components/pages/ErrorRoute";
import Public from "../components/pages/Public";
import Landing from "../components/pages/Landing";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Protected from "../components/pages/Protected";
import Habits from "../features/habits/pages/Habits";
import Insights from "../features/insights/pages/Insights";
import Account from "../features/account/pages/Account";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";

const router = createBrowserRouter([
  {
    errorElement: <ErrorRoute />,
    element: <Public />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/login", element: <Login /> },
      { path: "/sign_up", element: <Register /> },
      { path: "/forgot_password", element: <ForgotPassword /> },
    ],
  },
  {
    errorElement: <ErrorRoute />,
    element: <Protected />,
    children: [
      { index: true, element: <Navigate to="/habits" /> },
      {
        path: "/habits",
        element: <Habits />,
      },
      {
        path: "/insights",
        element: <Insights />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      { path: "/reset_password", element: <ResetPassword /> },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
