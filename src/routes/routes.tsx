import {
  createBrowserRouter,
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { Suspense, lazy } from "react";
import Loading from "../component/shared/Loading";
import Home from "../layout/Home";
const Login = lazy(() => import("../component/login/Login"))
const Register = lazy(() => import("../component/register/register"))
const ForgotPassword = lazy(() => import("../component/forgotPassword/ForgotPassword"))




const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Home></Home></PrivateRoute>,
    children:[{
      path:"/:id",
     element:<PrivateRoute><Home></Home></PrivateRoute>
    }]
  },
  {
    path: "/login",
    element: <PublicRoute>
      <Suspense fallback={<Loading/>}>
        <Login />
      </Suspense></PublicRoute>
  },
  {
    path: "/register",
    element:  <PublicRoute>
    <Suspense fallback={<Loading/>}>
      <Register />
    </Suspense></PublicRoute>
  },
  {
    path: "/forgot-password",
    element:  <PublicRoute>
    <Suspense fallback={<Loading/>}>
      <ForgotPassword />
    </Suspense></PublicRoute>
  },
]);

export default router