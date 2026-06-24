import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../../Page/404";
import { Layout } from "../../Page/Layout";
import { Board } from "../../Page/Board";
import { About } from "../../Page/About";

export const NotFoundRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      //默认二级路由 一级路由访问的时候，默认访问某个二级路由
      {
        index: true,
        element: <Board />
      },
      {
        path: "about",
        element: <About />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
])