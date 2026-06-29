import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from "react-router-dom";
import Login from "../Page/Login";
import AuthRoute from "../components/AuthRoute";
import GeekLayout from "../Page/Layout";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("../Page/Home"));
const ArticlePage = lazy(() => import("../Page/Article"));
const Publish = lazy(() => import("../Page/Publish"));
const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(AuthRoute, { children: _jsx(GeekLayout, {}) }), //隐式传递，Layout会自动赋值给children props
        children: [
            {
                index: true,
                element: _jsx(Suspense, { fallback: "加载中", children: _jsx(Home, {}) })
            },
            {
                path: "article",
                element: _jsx(Suspense, { fallback: "加载中", children: _jsx(ArticlePage, {}) })
            },
            {
                path: "publish",
                element: _jsx(Suspense, { fallback: "加载中", children: _jsx(Publish, {}) })
            },
        ]
    },
    {
        path: "/login",
        element: _jsx(Login, {})
    }
]);
export default router;
