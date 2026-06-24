

import { createBrowserRouter } from "react-router-dom";
import { Login } from "../Page/Login";
import { Article } from "../Page/Article";
import { DashBoard } from "../Page/DashBoard";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoard />
  },
  {
    path: '/login/:username',
    element: <Login />
  },
  {
    path: '/article',
    element: <Article />
  },

])