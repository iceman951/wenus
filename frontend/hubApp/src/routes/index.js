import React from "react";
import Home from "../views/Home/index";
import Login from "../views/LoginPage";
import Register from "../views/RegisterPage";
import Post from "../views/PostPage";
import MainLayout from '../views/Layout/MainLayout'
import { Navigate, Outlet } from "react-router-dom";

const routes = (isLoggedIn) => ([
  {
    path: "/",
    element: !isLoggedIn? <Outlet /> : <Navigate to='/app'/>,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: '/', element: <Navigate to="/login"/>}
    ],
  },
  {
    path: "/app",
    element: isLoggedIn? <MainLayout /> : <Navigate to='/login' />,
    children: [
      { path: "/", element: <Home /> },
      { path: "post/:id", element: <Post /> },
    ]
  },
]);

export default routes;
