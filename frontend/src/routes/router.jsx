import { createBrowserRouter } from "react-router";
import Default from "../layouts/Default";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Create from "../pages/Create";
import PostPage from "../pages/PostPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      { path: "", element: <Home /> },
      { path: "register", element: <SignUp /> },
      { path: "login", element: <SignIn /> },
      { path: "create", element: <Create /> },
      { path: "post/:id", element: <PostPage /> },
    ],
  },
]);

export default router;
