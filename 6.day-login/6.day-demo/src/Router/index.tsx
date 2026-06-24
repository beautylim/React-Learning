import { createBrowserRouter } from "react-router-dom";
import Login from "../Page/Login";
import AuthRoute from "../components/AuthRoute";
import GeekLayout from "../Page/Layout";
import Home from "../Page/Home";
import Article from "../Page/Article";
import Publish from "../Page/Publish";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute><GeekLayout /></AuthRoute>, //隐式传递，Layout会自动赋值给children props
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "article",
        element: <Article />
      },
      {
        path: "publish",
        element: <Publish />
      },

    ]
  },
  {
    path: "/login",
    element: <Login />
  }
])

export default router