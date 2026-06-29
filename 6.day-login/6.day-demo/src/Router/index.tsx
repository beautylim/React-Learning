import { createBrowserRouter } from "react-router-dom";
import Login from "../Page/Login";
import AuthRoute from "../components/AuthRoute";
import GeekLayout from "../Page/Layout";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../Page/Home"))
const ArticlePage = lazy(() => import("../Page/Article"))
const Publish = lazy(() => import("../Page/Publish"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute><GeekLayout /></AuthRoute>, //隐式传递，Layout会自动赋值给children props
    children: [
      {
        index: true,
        element: <Suspense fallback={"加载中"}><Home /></Suspense>
      },
      {
        path: "article",
        element: <Suspense fallback={"加载中"}><ArticlePage /></Suspense>
      },
      {
        path: "publish",
        element: <Suspense fallback={"加载中"}><Publish /></Suspense>
      },

    ]
  },
  {
    path: "/login",
    element: <Login />
  }
])

export default router