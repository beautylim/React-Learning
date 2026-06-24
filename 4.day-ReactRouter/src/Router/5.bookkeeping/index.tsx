import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../../Page/bookkeeping/Layout";
import { New } from "../../Page/bookkeeping/New";
import { Month } from "../../Page/bookkeeping/Month";
import { Year } from "../../Page/bookkeeping/Year";

export const BookkeepingRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Month />
      },
      {
        path: "/year",
        element: <Year />
      }
    ]
  },
  {
    path: "/new",
    element: <New />
  }
])