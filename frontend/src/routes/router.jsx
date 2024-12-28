import { createBrowserRouter } from "react-router";
import Default from "../layouts/Default";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      { path: "", element: <Home /> },
      { path: "register", element: <SignUp /> },
      { path: "login", element: <SignIn /> },
    ],
  },
]);

export default router;
